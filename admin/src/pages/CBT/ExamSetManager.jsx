import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const ExamSetManager = () => {
  const [examSets, setExamSets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    examination_id: "",
    examination_name: "",
    details: "",
    duration_minutes: "",
    question_count: "",
    total_score: "",
    start_datetime: "",
    result_date: "",
  });

  const navigate = useNavigate();
  const AdminID = sessionStorage.getItem("AdminID");

  const fetchExamSets = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/examsets");
      setExamSets(res.data);
    } catch (error) {
      console.error("Error fetching exam sets:", error);
    }
  };

  useEffect(() => {
    fetchExamSets();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formatDateTimeForInput = (dateTime, isDateOnly = false) => {
    if (!dateTime) return "";
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    if (isDateOnly) return `${year}-${month}-${day}`;
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${day}-${month}T${hours}:${minutes}`;
  };

  const formatDateTimeForMySQL = (dateTime, isDateOnly = false) => {
    if (isDateOnly) return dateTime;
    return dateTime.replace("T", " ") + ":00";
  };

  const handleAdd = () => {
    setFormData({
      examination_id: "",
      examination_name: "",
      details: "",
      duration_minutes: "",
      question_count: "",
      total_score: "",
      start_datetime: "",
      result_date: "",
    });
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleEdit = (exam) => {
    setFormData({
      examination_id: exam.examination_id,
      examination_name: exam.examination_name,
      details: exam.details,
      duration_minutes: formatToMinutes(exam.duration_minutes),
      question_count: exam.question_count,
      total_score: exam.total_score,
      start_datetime: formatDateTimeForInput(formatDateNoShift(exam.start_datetime)),
      result_date: formatDateTimeForInput(formatDateNoShift(exam.result_date)),
    });
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async (examID, AdminID) => {
    if (!window.confirm(`ยืนยันการลบชุดข้อสอบ รหัส ${examID} หรือไม่?`)) return;
    try {
      const res = await axios.delete(`http://localhost:5000/api/examsets/${examID}/${AdminID}`);
      if (res.status === 200) {
        alert("✅ ลบชุดข้อสอบสำเร็จ");
        fetchExamSets();
      } else {
        alert("❌ ลบชุดข้อสอบไม่สำเร็จ");
      }
    } catch (error) {
      console.error("❌ เกิดข้อผิดพลาดในการลบ:", error);
      alert("❌ ไม่สามารถลบชุดข้อสอบได้");
    }
  };

  const handleSave = async () => {
    const {
      examination_id,
      examination_name,
      details,
      duration_minutes,
      question_count,
      total_score,
      start_datetime,
      result_date,
    } = formData;

    if (
      !examination_id ||
      !examination_name ||
      !details ||
      !duration_minutes ||
      !question_count ||
      !total_score ||
      !start_datetime ||
      !result_date
    ) {
      alert("❌ กรุณากรอกข้อมูลให้ครบทุกช่อง!");
      return;
    }

    const hour = Math.floor(duration_minutes / 60);
    const minute = duration_minutes % 60;
    const Time_minutes = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00`;

    const dataToSend = {
      ExaminationID: examination_id,
      ExaminationName: examination_name,
      Details: details,
      DurationMinutes: Time_minutes,
      QuestionCount: Number(question_count),
      TotalScore: Number(total_score),
      StartDateTime: formatDateTimeForMySQL(start_datetime),
      ResultDate: formatDateTimeForMySQL(result_date, true),
    };

    try {
      if (isEditMode) {
        const res = await axios.put(`http://localhost:5000/api/examsets/${examination_id}`, dataToSend);
        if (res.status === 200) alert("✅ แก้ไขชุดข้อสอบสำเร็จ");
      } else {
        const res = await axios.post("http://localhost:5000/api/examsets", dataToSend);
        if (res.status === 201) {
          alert("✅ เพิ่มชุดข้อสอบสำเร็จ");
          handleManageQuestions(formData.examination_id);
        }
      }

      setShowModal(false);
      setIsEditMode(false);
      setFormData({
        examination_id: "",
        examination_name: "",
        details: "",
        duration_minutes: "",
        question_count: "",
        total_score: "",
        start_datetime: "",
        result_date: "",
      });
      fetchExamSets();
    } catch (error) {
      console.error("❌ เกิดข้อผิดพลาด:", error.response?.data || error);
      alert("❌ ไม่สามารถบันทึกได้");
    }
  };

  const handleManageQuestions = async (examID) => {
    try {
      await axios.post(`http://localhost:5000/api/questions/init/${examID}`);
      navigate(`/manage-questions/${examID}`);
    } catch (error) {
      console.error("❌ ไม่สามารถสร้างตารางคำถามได้:", error);
      alert("❌ สร้างตารางคำถามล้มเหลว");
    }
  };

  const formatDateNoShift = (isoString, offsetDays = 0) => {
    if (!isoString) return "";
    const [datePart, ...rest] = isoString.split("T");
    const time = rest.join("T");
    const [year, month, day] = datePart.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    date.setDate(date.getDate() + offsetDays);
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    const t = time.split("+07:00")[0];
    return `${d}/${m}/${y} ${t}`;
  };

  const formatToMinutes = (Time) => {
    if (!Time) return "";
    const [hour, ...minute] = Time.split(":");
    const hours = Number(hour) * 60;
    const minutes = hours + Number(minute[0]);
    return `${minutes}`;
  };

  return (
    <div className="font-[Kanit]">
      {/* Navbar */}
      <div className="bg-[#0a2441] text-white p-5 mb-4 flex justify-between items-center">
        <div className="flex gap-2">
          <button onClick={() => navigate(-1)} className="bg-white text-black px-3 py-2 rounded-md">
            <FaArrowLeft />
          </button>
          <button onClick={() => navigate("/main")} className="bg-white text-black px-2 py-2 rounded-md flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="25" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
              <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5"/>
            </svg>
            หน้าหลัก
          </button>
        </div>
        <button onClick={handleAdd} className="bg-blue-800 text-white px-2 py-2 rounded-md flex items-center gap-1 hover:bg-white hover:text-blue-800">
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="25" fill="currentColor" viewBox="0 0 448 512">
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
          </svg>
          เพิ่มชุดข้อสอบ
        </button>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-semibold mb-4 ml-2 text-gray-800">แก้ไขข้อสอบ</h1>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md mx-2 p-4">
        <table className="w-full table-auto text-sm border-collapse">
          <thead>
            <tr className="bg-[#23466d] text-white">
              <th className="p-2 border">รหัสข้อสอบ</th>
              <th className="p-2 border">ชื่อข้อสอบ</th>
              <th className="p-2 border">รายละเอียด</th>
              <th className="p-2 border">เวลาในการทำ (นาที)</th>
              <th className="p-2 border">จำนวนข้อ</th>
              <th className="p-2 border">คะแนนรวม</th>
              <th className="p-2 border">เริ่มสอบ</th>
              <th className="p-2 border">ประกาศผล</th>
              <th className="p-2 border">ตัวเลือก</th>
            </tr>
          </thead>
          <tbody>
            {examSets.map((exam) => (
              <tr key={exam.examination_id} className="odd:bg-white even:bg-gray-100 hover:bg-gray-200">
                <td className="p-2 border text-center">{exam.examination_id}</td>
                <td className="p-2 border text-center">{exam.examination_name}</td>
                <td className="p-2 border text-center">{exam.details}</td>
                <td className="p-2 border text-center">{formatToMinutes(exam.duration_minutes)}</td>
                <td className="p-2 border text-center">{exam.question_count}</td>
                <td className="p-2 border text-center">{exam.total_score}</td>
                <td className="p-2 border text-center">{formatDateNoShift(exam.start_datetime)}</td>
                <td className="p-2 border text-center">{formatDateNoShift(exam.result_date)}</td>
                <td className="p-2 border">
                  <div className="flex gap-2 justify-center">
                    <button onClick={() => handleEdit(exam)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">แก้ไข</button>
                    <button onClick={() => handleDelete(exam.examination_id, AdminID)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">ลบ</button>
                    <button onClick={() => handleManageQuestions(exam.examination_id)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700">ข้อสอบ</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 flex flex-col gap-3">
            <h3 className="text-xl font-semibold">{isEditMode ? "แก้ไขชุดข้อสอบ" : "เพิ่มชุดข้อสอบ"}</h3>
            <input name="examination_id" placeholder="รหัสข้อสอบ" onChange={handleChange} value={formData.examination_id} readOnly={isEditMode} className={`p-2 border rounded ${isEditMode ? "bg-gray-200 text-gray-600 cursor-not-allowed" : ""}`} />
            <input name="examination_name" placeholder="ชื่อข้อสอบ" onChange={handleChange} value={formData.examination_name} className="p-2 border rounded" />
            <input name="details" placeholder="รายละเอียด" onChange={handleChange} value={formData.details} className="p-2 border rounded" />
            <input name="duration_minutes" type="number" min={1} placeholder="เวลาในการทำข้อสอบ (นาที)" onChange={handleChange} value={formData.duration_minutes} className="p-2 border rounded" />
            <input name="question_count" type="number" min={1} placeholder="จำนวนข้อ" onChange={handleChange} value={formData.question_count} className="p-2 border rounded" />
            <input name="total_score" type="number" min={1} placeholder="คะแนนรวม" onChange={handleChange} value={formData.total_score} className="p-2 border rounded" />
            <input name="start_datetime" type="datetime-local" onChange={handleChange} value={formData.start_datetime} className="p-2 border rounded" />
            <input name="result_date" type="datetime-local" onChange={handleChange} value={formData.result_date} className="p-2 border rounded" />
            <div className="flex justify-between mt-2">
              <button onClick={handleSave} className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600">บันทึก</button>
              <button onClick={() => setShowModal(false)} className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">ยกเลิก</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamSetManager;
