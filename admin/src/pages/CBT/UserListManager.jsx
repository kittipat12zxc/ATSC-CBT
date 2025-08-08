import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";

const UserListManager = () => {
  const navigate = useNavigate();
  const [examList, setExamList] = useState([]);

  useEffect(() => {
    fetchExamList();
  }, []);

  const fetchExamList = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/examsets");
      setExamList(res.data);
    } catch (error) {
      console.error("❌ โหลดชุดข้อสอบล้มเหลว:", error);
      alert("❌ ไม่สามารถโหลดชุดข้อสอบได้");
    }
  };

  const handleViewUsers = async (examID) => {
    try {
      await axios.post(
        `http://localhost:5000/api/create-examinee-table/${examID}`
      );
      navigate(`/exam-users/${examID}`);
    } catch (err) {
      console.error("❌ สร้างตารางผู้เข้าสอบล้มเหลว:", err);
      alert("❌ ไม่สามารถสร้างตารางผู้เข้าสอบได้");
    }
  };

  const formatDateTime = (datetimeStr) => {
    if (!datetimeStr) return "";
    const dt = new Date(datetimeStr);
    return dt.toLocaleString("th-TH", {
      dateStyle: "short",
      timeStyle: "short",
    });
  };

  const formatToMinutes = (Time) => {
    if (!Time) return "";
    const [hour, ...minute] = Time.split(":");
    const hours = Number(hour) * 60;
    const minutes = hours + Number(minute[0]);
    return `${minutes}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 font-[Kanit]">
      {/* Navbar */}
      <div className="bg-[#0a2441] text-white p-5 mb-4 flex justify-between items-center">
        <div className="flex gap-2">
          <button
            onClick={() => navigate(-1)}
            className="bg-white text-black px-3 py-2 rounded-md"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={() => navigate("/main")}
            className="bg-white text-black px-2 py-2 rounded-md flex items-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="25"
              fill="currentColor"
              class="bi bi-house-door-fill"
              viewBox="0 0 16 16"
            >
              <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" />
            </svg>
            หน้าหลัก
          </button>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-semibold text-[#2c3e50] mb-4 px-2">
        ชุดข้อสอบ
      </h1>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md p-4">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead>
            <tr className="bg-[#23466d] text-white">
              <th className="px-4 py-2 border">รหัส</th>
              <th className="px-4 py-2 border">ชื่อชุดข้อสอบ</th>
              <th className="px-4 py-2 border">รายละเอียด</th>
              <th className="px-4 py-2 border">จำนวนข้อ</th>
              <th className="px-4 py-2 border">คะแนนรวม</th>
              <th className="px-4 py-2 border">วันเวลาเริ่มสอบ</th>
              <th className="px-4 py-2 border">ระยะเวลา</th>
              <th className="px-4 py-2 border">การจัดการ</th>
            </tr>
          </thead>
          <tbody>
            {examList.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  ไม่มีข้อมูลชุดข้อสอบ
                </td>
              </tr>
            ) : (
              examList.map((exam) => (
                <tr
                  key={exam.examination_id}
                  className="odd:bg-white even:bg-gray-50 hover:bg-blue-50"
                >
                  <td className="px-4 py-2 border text-center">
                    {exam.examination_id}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {exam.examination_name}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {exam.details}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {exam.question_count}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {exam.total_score}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {formatDateTime(exam.start_datetime)}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {formatToMinutes(exam.duration_minutes)} นาที
                  </td>
                  <td className="px-4 py-2 border text-center">
                    <button
                      onClick={() => handleViewUsers(exam.examination_id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded"
                    >
                      📋 รายชื่อผู้เข้าสอบ
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserListManager;
