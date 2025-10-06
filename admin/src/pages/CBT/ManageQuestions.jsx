

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHome, FaCheckCircle, FaPlus, FaPen, FaTrash } from "react-icons/fa";

const ManageQuestions = () => {
    const { ID } = useParams(); // รับไอดีจาก user http://localhost:5000/api/questions/${ID}
    const navigate = useNavigate(); 

    const [questions, setQuestions] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ส่วน UI
    const [mode, setMode] = useState("normal"); // เซ็ต normal เป็นค่าเริ่มต้น
    const [showModal, setShowModal] = useState(false); // ยังไม่ให้โชว์ Modal
    const [isEditMode, setIsEditMode] = useState(false); // ยังไม่ให้อยู่ในโหมด edit
    const [currentQuestionId, setCurrentQuestionId] = useState(null);
    const [formData, setFormData] = useState({ // ค่าเเบบฟอม
        questions_text: "",
        choices_one: "",
        choices_two: "",
        choices_three: "",
        choices_four: "",
        choices_five: "",
        is_correct: "",
    });


    const fetchQuestions = useCallback(async () => { // ดึงคำถามมาจาก backend
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(`http://localhost:5000/api/questions/${ID}`); 
            setQuestions(res.data); // เก็บคำถามไว้ใน questions ที่ดึงมา
        } catch (err) {
            console.error("Error fetching questions:", err);
            setError(`❌ Could not fetch questions for exam set ${ID}. Is the server running and is the exam ID correct?`);
        } finally {
            setLoading(false);
        }
    }, [ID]);

    useEffect(() => {
        fetchQuestions();
    }, [fetchQuestions]);


    const handleAdd = () => { // กดเพิ่มคำถามเเล้ว เด้ง Modal ค่าว่างขึ้นมาเพื่อให้เพิ่ม
        setIsEditMode(false);
        setCurrentQuestionId(null);
        setFormData({
            questions_text: "", choices_one: "", choices_two: "", choices_three: "",
            choices_four: "", choices_five: "", is_correct: "",
        });
        setShowModal(true);
    };

    const handleEdit = (question) => { // กด เเก้ไข เเล้วเด้ง Modal ที่มีค่าก่อนหน้าขึ้นมา
        setIsEditMode(true);
        setCurrentQuestionId(question.questions_mcq_id);
        setFormData({
            questions_text: question.questions_text,
            choices_one: question.choices_one,
            choices_two: question.choices_two,
            choices_three: question.choices_three,
            choices_four: question.choices_four,
            choices_five: question.choices_five || "",
            is_correct: question.is_correct,
        });
        setShowModal(true);
    };

    
    const handleDelete = async (questionId) => { // กดเเล้วเด้ง Popup ยืนยันการลบ
        if (window.confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบคำถาม ID ${questionId}?`)) {
            try {
                await axios.delete(`http://localhost:5000/api/questions/${ID}/${questionId}`);
                alert(`✅ ลบคำถาม ID ${questionId} สำเร็จ`);
                fetchQuestions(); // Refresh the list of questions
            } catch (err) {
                console.error("Error deleting question:", err);
                const errorMessage = err.response?.data?.error || "เกิดข้อผิดพลาดในการลบข้อมูล";
                alert(`❌ ${errorMessage}`);
            }
        }
    };

    const handleImportExcel = async (event) => { // กดเเล้ว Import Excel เข้ามาเเล้วให้โชว์ในหน้าเว็บ + เพิ่มในฐานข้อมูล
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            await axios.post(`http://localhost:5000/api/questions/import/${ID}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            alert('✅ นำเข้าคำถามสำเร็จ');
            fetchQuestions();
        } catch (error) {
            console.error("❌ เกิดข้อผิดพลาดในการนำเข้า:", error);
            const errorMessage = error.response?.data?.error || "ไม่สามารถนำเข้าคำถามได้";
            alert(`❌ ${errorMessage}`);
        } finally {
            event.target.value = null; 
        }
    };

  
    const handleSave = async () => { // ตรวจสอบการส่งฟอม โดยต้องกรอกข้อมูลให้ครบ
    
        const { questions_text, choices_one, choices_two, choices_three, choices_four, is_correct } = formData;
        if (!questions_text || !choices_one || !choices_two || !choices_three || !choices_four || !is_correct) {
            alert("❌ กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน (คำถาม, ตัวเลือก 1-4, และคำตอบ)");
            return;
        }
        
        try {
            if (isEditMode) {
          
                await axios.put(`http://localhost:5000/api/questions/${ID}/${currentQuestionId}`, formData);
                alert(`✅ อัปเดตคำถาม ID ${currentQuestionId} สำเร็จ`);
            } else {
              
                await axios.post(`http://localhost:5000/api/questions/${ID}`, formData);
                alert("✅ เพิ่มคำถามใหม่สำเร็จ");
            }
            setShowModal(false);
            fetchQuestions(); 
        } catch (err) {
            console.error("Error saving question:", err);
            const errorMessage = err.response?.data?.error || "เกิดข้อผิดพลาดในการบันทึกข้อมูล";
            alert(`❌ ${errorMessage}`);
        }
    };

    const handleChange = (e) => { 
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="font-[Kanit] bg-gray-50 min-h-screen">
            {/* Navbar */}
            <header className="bg-[#0a2441] text-white p-4 shadow-md flex justify-between items-center sticky top-0 z-20">
                <div className="flex items-center gap-2">
                    <button onClick={() => navigate(-1)} className="bg-white text-black p-2 rounded-md hover:bg-gray-200 transition-colors">
                        <FaArrowLeft />
                    </button>
                    <button onClick={() => navigate("/main")} className="bg-white text-black px-3 py-1 rounded-md flex items-center gap-2 hover:bg-gray-200 transition-colors">
                        <FaHome /> หน้าหลัก
                    </button>
                </div>
                <h1 className="text-lg md:text-xl font-semibold absolute left-1/2 -translate-x-1/2 whitespace-nowrap">
                    จัดการข้อสอบ: {ID}
                </h1>
                <div className="flex gap-2">
                    <button onClick={() => setMode('edit')} className="bg-yellow-400 text-black px-3 py-1 rounded-md flex items-center gap-2 hover:bg-yellow-500 transition-colors">
                        <FaPen /> แก้ไข
                    </button>
                    <button onClick={() => setMode('delete')} className="bg-red-500 text-white px-3 py-1 rounded-md flex items-center gap-2 hover:bg-red-600 transition-colors">
                        <FaTrash /> ลบ
                    </button>
                    <button onClick={handleAdd} className="bg-white text-blue-600 px-3 py-1 rounded-md flex items-center gap-2 hover:bg-blue-50 transition-colors">
                        <FaPlus /> เพิ่มคำถาม
                    </button>
                    <label className="flex items-center gap-1 px-3 py-2 rounded text-white bg-[#2c4e75] hover:bg-white hover:text-[#2c4e75] cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 512 512"><path d="M128 64c0-35.3 28.7-64 64-64L352 0l0 128c0 17.7 14.3 32 32 32h128v288c0 35.3-28.7 64-64 64H192c-35.3 0-64-28.7-64-64V160c0-17.7 14.3-32 32-32h96v64h-96c-17.7 0-32 14.3-32 32v224c0 17.7 14.3 32 32 32h256c17.7 0 32-14.3 32-32V128H384V0H192c-35.3 0-64 28.7-64 64z" /></svg>
                        นำเข้า Excel
                        <input type="file" accept=".xlsx,.xls" hidden onChange={handleImportExcel} />
                    </label>
                </div>
            </header>

        
            <main className="p-4 md:p-6">
                {loading && <p className="text-center text-lg">Loading questions...</p>}
                {error && <p className="text-center text-red-500 bg-red-100 p-4 rounded-md">{error}</p>}

                {!loading && !error && questions.length > 0 && (
                    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                        <table className="w-full table-auto text-sm border-collapse">
                            <thead className="bg-[#23466d] text-white">
                                <tr>
                                    {['ลำดับ', 'คำถาม', 'ตัวเลือกที่ 1', 'ตัวเลือกที่ 2', 'ตัวเลือกที่ 3', 'ตัวเลือกที่ 4', 'ตัวเลือกที่ 5', 'คำตอบ', 'จัดการ'].map(h =>
                                        <th key={h} className="p-3 border-r border-gray-500 text-left whitespace-nowrap">{h}</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {questions.map((q, index) => (
                                    <tr key={q.questions_mcq_id} className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 border-b">
                                        <td className="p-3 border-r text-center">{index + 1}</td>
                                        <td className="p-3 border-r">{q.questions_text}</td>
                                        <td className="p-3 border-r">{q.choices_one}</td>
                                        <td className="p-3 border-r">{q.choices_two}</td>
                                        <td className="p-3 border-r">{q.choices_three}</td>
                                        <td className="p-3 border-r">{q.choices_four}</td>
                                        <td className="p-3 border-r">{q.choices_five || '-'}</td>
                                        <td className="p-3 border-r text-green-600 font-semibold">{q.is_correct}</td>
                                        <td className="p-3 text-center">
                                            <div className="flex gap-2 justify-center">
                                                {mode === "edit" && (
                                                    <button onClick={() => handleEdit(q)} className="bg-yellow-500 text-white px-3 py-1 text-xs rounded hover:bg-yellow-600">แก้ไข</button>
                                                )}
                                                {mode === "delete" && (
                                                    <button onClick={() => handleDelete(q.questions_mcq_id)} className="bg-red-600 text-white px-3 py-1 text-xs rounded hover:bg-red-700">ลบ</button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {!loading && !error && questions.length === 0 && (
                    <div className="text-center py-10">
                        <p className="text-gray-500 text-xl">ไม่พบข้อสอบสำหรับชุดข้อสอบนี้</p>
                        <p className="text-gray-400 mt-2">โปรดเพิ่มข้อสอบสำหรับชุดข้อสอบ ID: {ID}</p>
                    </div>
                )}

                {(mode === "edit" || mode === "delete") && (
                    <div className="mt-6 flex justify-center">
                        <button onClick={() => setMode('normal')} className="bg-gray-700 text-white px-6 py-2 rounded-md flex items-center gap-2 hover:bg-gray-800">
                            <FaCheckCircle /> เสร็จสิ้น
                        </button>
                    </div>
                )}
            </main>

            
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg flex flex-col gap-4">
                        <h3 className="text-xl font-semibold">{isEditMode ? "แก้ไขข้อสอบ" : "เพิ่มข้อสอบใหม่"}</h3>
                        <textarea name="questions_text" placeholder="เนื้อหาคำถาม" onChange={handleChange} value={formData.questions_text} className="p-2 border rounded" rows="3"></textarea>
                        <input name="choices_one" placeholder="ตัวเลือกที่ 1" onChange={handleChange} value={formData.choices_one} className="p-2 border rounded" />
                        <input name="choices_two" placeholder="ตัวเลือกที่ 2" onChange={handleChange} value={formData.choices_two} className="p-2 border rounded" />
                        <input name="choices_three" placeholder="ตัวเลือกที่ 3" onChange={handleChange} value={formData.choices_three} className="p-2 border rounded" />
                        <input name="choices_four" placeholder="ตัวเลือกที่ 4" onChange={handleChange} value={formData.choices_four} className="p-2 border rounded" />
                        <input name="choices_five" placeholder="ตัวเลือกที่ 5 (ถ้ามี)" onChange={handleChange} value={formData.choices_five} className="p-2 border rounded" />
                        <input name="is_correct" placeholder="คำตอบที่ถูกต้อง (ต้องตรงกับตัวเลือกข้อใดข้อหนึ่ง)" onChange={handleChange} value={formData.is_correct} className="p-2 border rounded bg-green-50" />
                        
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

export default ManageQuestions;