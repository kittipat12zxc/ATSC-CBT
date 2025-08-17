import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHome, FaPlus, FaPen, FaTrash, FaCheck } from "react-icons/fa";

const ExamSetManager = () => {
    
    const [examSets, setExamSets] = useState([]);
    const [mode, setMode] = useState("normal"); 
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [formData, setFormData] = useState({
        examination_id: "",
        exam_set_name: "",
        details: "",
        duration_minutes: "",
        question_count: "",
        total_score: "",
        start_datetime: "",
        result_date: "",
    });

    const navigate = useNavigate();
    const AdminID = sessionStorage.getItem("AdminID");

  
    const fetchExamSets = useCallback(async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/examsets");
            setExamSets(res.data);
        } catch (error) {
            console.error("Error fetching exam sets:", error);
            alert("❌ Could not fetch exam sets. Is the server running?");
        }
    }, []);

    useEffect(() => {
        fetchExamSets();
    }, [fetchExamSets]);

   
    const toLocalISOString = (dateString) => { // เเปลง Format วันที่ 
        if (!dateString) return "";
        const date = new Date(dateString);
        
        const tzoffset = (new Date()).getTimezoneOffset() * 60000; 
        const localISOTime = (new Date(date - tzoffset)).toISOString().slice(0, 16);
        return localISOTime;
    };
    
    const formatDurationToMinutes = (timeStr) => { // เเปลง Format เวลาให้ดี 
        if (!timeStr) return "";
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours * 60 + minutes;
    };

    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAdd = () => { // กดเพิ่มคำถามเเล้ว เด้ง Modal ค่าว่างขึ้นมาเพื่อให้เพิ่ม
        setIsEditMode(false);
        setFormData({
            examination_id: "",
            exam_set_name: "",
            details: "",
            duration_minutes: "",
            question_count: "",
            total_score: "",
            start_datetime: "",
            result_date: "",
        });
        setShowModal(true);
    };

    const handleEdit = (exam) => { // กด เเก้ไข เเล้วเด้ง Modal ที่มีค่าก่อนหน้าขึ้นมา เพื่อให้เเก้ไขข้อมูลที่มีอยู่เป็นอย่างอื่น
        setIsEditMode(true);
        setFormData({
            examination_id: exam.examination_id,
            exam_set_name: exam.exam_set_name,
            details: exam.details,
            duration_minutes: formatDurationToMinutes(exam.duration_minutes),
            question_count: exam.question_count,
            total_score: exam.total_score,
            start_datetime: toLocalISOString(exam.start_datetime),
            result_date: toLocalISOString(exam.result_date),
        });
        setShowModal(true);
    };
    
    const handleDelete = async (examID) => { // กด ลบ เเล้วเด้ง Popup ขั้นมาเพื่อยืนยันการลบ
        if (!window.confirm(`Are you sure you want to delete exam set ID ${examID}?`)) return;
        try {
            const res = await axios.delete(`http://localhost:5000/api/examsets/${examID}/${AdminID}`);
            if (res.status === 200) {
                alert("✅ Exam set deleted successfully!");
                fetchExamSets(); 
            }
        } catch (error) {
            console.error("Error deleting exam set:", error);
            alert(`❌ Failed to delete exam set. ${error.response?.data?.message || ''}`);
        }
    };

    const handleSave = async () => { // ยืนยันการส่งฟอม เช็คว่าถ้าผู้ใช้กรอกเเบบฟอมครบหรือไม่
 
    for (const key in formData) {
        if (formData[key] === "") {
            alert("❌ Please fill in all fields.");
            return;
        }
    }

    
    const questionCount = parseInt(formData.question_count, 10); 
    const totalScore = parseInt(formData.total_score, 10);
    const durationMinutes = parseInt(formData.duration_minutes, 10);

    
    if (isNaN(questionCount) || isNaN(totalScore) || isNaN(durationMinutes)) { // 
        alert("❌ Please ensure Question Count, Total Score, and Duration are valid numbers.");
        return;
    }
    

    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    
    
    const dataToSend = {
        examination_id: formData.examination_id,
        exam_set_name: formData.exam_set_name,
        details: formData.details,
        start_datetime: formData.start_datetime,
        result_date: formData.result_date,
        
        question_count: questionCount,
        total_score: totalScore,
       
        DurationMinutes: `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`,
    };

    try {
        let res;
        if (isEditMode) { // ถ้าอยู่ในโหมด edit เป็น true = เปิดให้เเก้ไขได้้
            
            res = await axios.put(`http://localhost:5000/api/examsets/${formData.examination_id}`, dataToSend);
            if (res.status === 200) alert("✅ Exam set updated successfully!");
        } else { // ถ้าไม่อยู่ในโหมด edit เป็น false = ไม่ให้เเก้ไข เเต่เป็นการเพิ่ม
            res = await axios.post("http://localhost:5000/api/examsets", dataToSend);
            if (res.status === 201) alert("✅ Exam set added successfully!");
        }
        setShowModal(false);
        fetchExamSets(); 
    } catch (error) {
        console.error("Save error:", error.response?.data || error);
        alert(`❌ Could not save the exam set. ${error.response?.data?.error || 'Check the console for details.'}`);
    }
};
    
    const handleManageQuestions = (examID) => { 
      navigate(`/ManageQuestions/${examID}`);
    };

    
    return (
        <div className="font-[Kanit] bg-gray-50 min-h-screen">
            {/* Navbar */}
            <header className="bg-[#0a2441] text-white p-4 shadow-md flex justify-between items-center">
                <div className="flex gap-2">
                    <button onClick={() => navigate(-1)} className="bg-white text-black p-2 rounded-md hover:bg-gray-200 transition-colors">
                        <FaArrowLeft />
                    </button>
                    <button onClick={() => navigate("/main")} className="bg-white text-black px-3 py-1 rounded-md flex items-center gap-2 hover:bg-gray-200 transition-colors">
                        <FaHome /> หน้าหลัก
                    </button>
                </div>
                <div className="flex gap-3">
                     <button onClick={handleAdd} className="bg-white text-blue-600 px-3 py-1 rounded-md flex items-center gap-2 hover:bg-blue-50 transition-colors">
                        <FaPlus /> เพิ่มชุดข้อสอบ
                    </button>
                    <button onClick={() => setMode('edit')} className="bg-yellow-400 text-black px-3 py-1 rounded-md flex items-center gap-2 hover:bg-yellow-500 transition-colors">
                        <FaPen /> แก้ไข
                    </button>
                    <button onClick={() => setMode('delete')} className="bg-red-500 text-white px-3 py-1 rounded-md flex items-center gap-2 hover:bg-red-600 transition-colors">
                        <FaTrash /> ลบ
                    </button>
                </div>
            </header>

         
            <main className="p-4">
                <h1 className="text-2xl font-semibold mb-4 text-gray-800">จัดการชุดข้อสอบ</h1>
                <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                    <table className="w-full table-auto text-sm border-collapse">
                        <thead className="bg-[#23466d] text-white">
                            <tr>
                                {['รหัส', 'ชื่อข้อสอบ', 'รายละเอียด', 'เวลา (นาที)', 'จำนวนข้อ', 'คะแนน', 'เริ่มสอบ', 'ประกาศผล', 'ตัวเลือก'].map(h => <th key={h} className="p-3 border text-left">{h}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {examSets.map((exam) => (
                                <tr key={exam.examination_id} className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 border-b">
                                    <td className="p-3 border">{exam.examination_id}</td>
                                    <td className="p-3 border">{exam.exam_set_name}</td>
                                    <td className="p-3 border">{exam.details}</td>
                                    <td className="p-3 border text-center">{exam.duration_minutes}</td>
                                    <td className="p-3 border text-center">{exam.question_count}</td>
                                    <td className="p-3 border text-center">{exam.total_score}</td>
                                    <td className="p-3 border">{new Date(exam.start_datetime).toLocaleString()}</td>
                                    <td className="p-3 border">{new Date(exam.result_date).toLocaleDateString()}</td>
                                    <td className="p-3 border">
                                        <div className="flex gap-2 justify-center">
                                            {mode === "normal" && (
                                                <>
                                                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">รายชื่อ</button>
                                                    <button onClick={() => handleManageQuestions(exam.examination_id)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">ข้อสอบ</button>
                                                </>
                                            )}
                                            {mode === "edit" && (
                                                <button onClick={() => handleEdit(exam)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">แก้ไข</button>
                                            )}
                                            {mode === "delete" && (
                                                <button onClick={() => handleDelete(exam.examination_id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">ลบ</button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                     {(mode === "edit" || mode === "delete") && (
                        <div className="p-3 text-right bg-gray-100">
                            <button onClick={() => setMode('normal')} className="bg-gray-500 text-white px-4 py-2 rounded-md flex items-center gap-2 ml-auto hover:bg-gray-600">
                                <FaCheck /> เสร็จสิ้น
                            </button>
                        </div>
                    )}
                </div>
            </main>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md flex flex-col gap-4">
                        <h3 className="text-xl font-semibold">{isEditMode ? "แก้ไขชุดข้อสอบ" : "เพิ่มชุดข้อสอบ"}</h3>
                        <input name="examination_id" placeholder="รหัสข้อสอบ" onChange={handleChange} value={formData.examination_id} readOnly={isEditMode} className={`p-2 border rounded ${isEditMode ? "bg-gray-200 cursor-not-allowed" : ""}`} />
                        <input name="exam_set_name" placeholder="ชื่อข้อสอบ" onChange={handleChange} value={formData.exam_set_name} className="p-2 border rounded" />
                        <textarea name="details" placeholder="รายละเอียด" onChange={handleChange} value={formData.details} className="p-2 border rounded" rows="3"></textarea>
                        <input name="duration_minutes" type="number" min="1" placeholder="เวลาในการทำ (นาที)" onChange={handleChange} value={formData.duration_minutes} className="p-2 border rounded" />
                        <input name="question_count" type="number" min="1" placeholder="จำนวนข้อ" onChange={handleChange} value={formData.question_count} className="p-2 border rounded" />
                        <input name="total_score" type="number" min="1" placeholder="คะแนนรวม" onChange={handleChange} value={formData.total_score} className="p-2 border rounded" />
                        <label>เวลาเริ่มสอบ: <input name="start_datetime" type="datetime-local" onChange={handleChange} value={formData.start_datetime} className="p-2 border rounded w-full" /></label>
                        <label>เวลาประกาศผล: <input name="result_date" type="datetime-local" onChange={handleChange} value={formData.result_date} className="p-2 border rounded w-full" /></label>
                        <div className="flex justify-end gap-3 mt-2">
                            <button onClick={() => setShowModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">ยกเลิก</button>
                            <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">บันทึก</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExamSetManager;