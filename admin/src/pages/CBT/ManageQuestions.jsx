// ด้านบนสุดของ React Component ยังใช้ได้เหมือนเดิม
import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaEdit, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';

const ManageQuestions = () => {
  const { examID } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // ✅ สร้าง state สำหรับคำถามปัจจุบัน
  const [currentQuestion, setCurrentQuestion] = useState({
    id: null,
    Question: '',
    Choice1: '',
    Choice2: '',
    Choice3: '',
    Choice4: '',
    Choice5: '',
    Answer: ''
  });

  // ✅ โหลดคำถามจาก API
  const fetchQuestions = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/questions/${examID}`);
      setQuestions(res.data);
    } catch (error) {
      console.error('❌ ไม่สามารถโหลดคำถามได้:', error);
      alert('❌ โหลดคำถามล้มเหลว');
    }
  }, [examID]);
  
  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  // ✅ จัดการการเปลี่ยนแปลงข้อมูลใน input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentQuestion(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // ✅ เพิ่มคำถามใหม่
  const handleAddClick = () => {
    setCurrentQuestion({
      id: null,
      Question: '',
      Choice1: '',
      Choice2: '',
      Choice3: '',
      Choice4: '',
      Choice5: '',
      Answer: ''
    });
    setIsEditMode(false);
    setShowModal(true);
  };

  // ✅ แก้ไขคำถาม
  const handleEditClick = (question) => {
    setCurrentQuestion({
      id: question.questions_id,
      Question: question.questions_text,
      Choice1: question.choices_one,
      Choice2: question.choices_two,
      Choice3: question.choices_three,
      Choice4: question.choices_four,
      Choice5: question.choices_five,
      Answer: question.is_correct
    });
    setIsEditMode(true);
    setShowModal(true);
  };

  // ✅ ลบคำถาม
  const handleDeleteClick = async (question) => {
    const questionId = question.questions_id;
    if (!questionId) {
      alert('❌ ไม่พบรหัสคำถามสำหรับลบ');
      return;
    }
    if (!window.confirm('ยืนยันการลบคำถามนี้หรือไม่?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/questions/${examID}/${questionId}`);
      alert('✅ ลบคำถามสำเร็จ');
      fetchQuestions();
    } catch (error) {
      console.error('❌ ลบคำถามล้มเหลว:', error);
      alert('❌ ไม่สามารถลบคำถามได้');
    }
  };

  // ✅ บันทึกคำถาม (เพิ่ม/แก้ไข)
  const handleSave = async () => {
    const { id, Question, Choice1, Choice2, Choice3, Choice4, Choice5, Answer } = currentQuestion;

    if (!Question || !Choice1 || !Choice2 || !Choice3 || !Choice4 || !Answer) {
      alert('❌ กรุณากรอกข้อมูลให้ครบทุกช่อง');
      return;
    }

    try {
      if (isEditMode) {
        await axios.put(`http://localhost:5000/api/questions/${examID}/${id}`, {
          Question,
          Choice1,
          Choice2,
          Choice3,
          Choice4,
          Choice5,
          Answer
        });
        alert('✅ แก้ไขคำถามสำเร็จ');
      } else {
        await axios.post(`http://localhost:5000/api/questions/${examID}`, {
          Question,
          Choice1,
          Choice2,
          Choice3,
          Choice4,
          Choice5,
          Answer
        });
        alert('✅ เพิ่มคำถามสำเร็จ');
      }

      setShowModal(false);
      setCurrentQuestion({
        id: null,
        Question: '',
        Choice1: '',
        Choice2: '',
        Choice3: '',
        Choice4: '',
        Choice5: '',
        Answer: ''
      });
      setIsEditMode(false);
      fetchQuestions();
    } catch (error) {
      console.error('❌ บันทึกคำถามล้มเหลว:', error);
      alert('❌ ไม่สามารถบันทึกคำถามได้');
    }
  };

  // ✅ นำเข้า Excel เป็นไฟล์จริง (ใช้ FormData)
  const handleImportExcel = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post(`http://localhost:5000/api/questions/import/${examID}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert('✅ นำเข้าคำถามสำเร็จ');
      fetchQuestions();
    } catch (error) {
      console.error("❌ เกิดข้อผิดพลาดในการนำเข้า:", error);
      alert("❌ ไม่สามารถนำเข้าคำถามได้");
    }
  };

  // ✅ ตรวจสอบว่ามีคำถามอัตนัยในชุดข้อสอบนี้หรือไม่
  const [essayQuestionsExist, setEssayQuestionsExist] = useState(false);

  useEffect(() => {
  const checkEssayQuestions = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/question_essay/${examID}`);
      setEssayQuestionsExist(res.data.length > 0);
    } catch (error) {
      console.error("❌ ตรวจสอบคำถามอัตนัยล้มเหลว", error);
      setEssayQuestionsExist(false);
    }
  };

    checkEssayQuestions();
  }, [examID]);

  return (
    <div className=" font-kanit">
      {/* Navbar */}
      <div className="bg-[#0a2441] text-white p-5  mb-4 flex flex-col gap-4">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex gap-2">
            <button onClick={() => navigate(-1)} className="bg-white text-black px-3 py-2 rounded-md"><FaArrowLeft /></button>
            <button onClick={() => navigate('/main')} className="bg-white text-black px-2 py-2 rounded-md flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="25" fill="currentColor" viewBox="0 0 16 16">
                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5"/>
              </svg>
              <span>หน้าหลัก</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            <button onClick={() => { setEditMode(!editMode); setDeleteMode(false); }} className={`px-3 py-2 rounded text-white bg-[#2c4e75] hover:bg-white hover:text-[#2c4e75] ${editMode ? 'ring-2 ring-blue-400' : ''}`}>แก้ไข</button>
            <button onClick={() => { setDeleteMode(!deleteMode); setEditMode(false); }} className={`px-3 py-2 rounded text-white bg-[#2c4e75] hover:bg-white hover:text-[#2c4e75] ${deleteMode ? 'ring-2 ring-red-400' : ''}`}>ลบ</button>
            <button onClick={handleAddClick} className="flex items-center gap-1 px-3 py-2 rounded text-white bg-[#2c4e75] hover:bg-white hover:text-[#2c4e75]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32v144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h144v144c0 17.7 14.3 32 32 32s32-14.3 32-32V288h144c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
              เพิ่มคำถาม
            </button>
            <label className="flex items-center gap-1 px-3 py-2 rounded text-white bg-[#2c4e75] hover:bg-white hover:text-[#2c4e75] cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 512 512"><path d="M128 64c0-35.3 28.7-64 64-64L352 0l0 128c0 17.7 14.3 32 32 32h128v288c0 35.3-28.7 64-64 64H192c-35.3 0-64-28.7-64-64V160c0-17.7 14.3-32 32-32h96v64h-96c-17.7 0-32 14.3-32 32v224c0 17.7 14.3 32 32 32h256c17.7 0 32-14.3 32-32V128H384V0H192c-35.3 0-64 28.7-64 64z"/></svg>
              นำเข้า Excel
              <input type="file" accept=".xlsx,.xls" hidden onChange={handleImportExcel} />
            </label>
          </div>
        </div>
      </div>

      {/* Header */}
      <h1 className="text-2xl font-bold text-[#2c3e50] mb-4 px-2">จัดการคำถามปรนัย : ชุดข้อสอบ {examID}</h1>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
        <table className="min-w-full text-sm border border-gray-200">
          <thead className="bg-[#23466d] text-white">
            <tr>
              <th className="p-2 border">ลำดับ</th>
              <th className="p-2 border">คำถาม</th>
              <th className="p-2 border">ตัวเลือกที่ 1</th>
              <th className="p-2 border">ตัวเลือกที่ 2</th>
              <th className="p-2 border">ตัวเลือกที่ 3</th>
              <th className="p-2 border">ตัวเลือกที่ 4</th>
              <th className="p-2 border">ตัวเลือกที่ 5</th>
              <th className="p-2 border">คำตอบ</th>
              {editMode && <th className="p-2 border">แก้ไข</th>}
              {deleteMode && <th className="p-2 border">ลบ</th>}
            </tr>
          </thead>
          <tbody>
            {questions.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-4">ไม่มีคำถามในชุดข้อสอบนี้</td>
              </tr>
            ) : (
              questions.map((question, index) => (
                <tr key={question.questions_id} className="even:bg-gray-50 hover:bg-gray-100">
                  <td className="p-2 border text-center">{index + 1}</td>
                  <td className="p-2 border">{question.questions_text}</td>
                  <td className="p-2 border">{question.choices_one}</td>
                  <td className="p-2 border">{question.choices_two}</td>
                  <td className="p-2 border">{question.choices_three}</td>
                  <td className="p-2 border">{question.choices_four}</td>
                  <td className="p-2 border">{question.choices_five}</td>
                  <td className="p-2 border text-center">{question.is_correct}</td>
                  {editMode && (
                    <td className="p-2 border text-center">
                      <button className="text-blue-600 hover:text-blue-800" onClick={() => handleEditClick(question)}><FaEdit /></button>
                    </td>
                  )}
                  {deleteMode && (
                    <td className="p-2 border text-center">
                      <button className="text-red-600 hover:text-red-800" onClick={() => handleDeleteClick(question)}><FaTrashAlt /></button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>

        {essayQuestionsExist && (
          <button onClick={() => navigate(`/manage-questions2/${examID}`)} className="mt-4 px-4 py-2 bg-[#2c4e75] text-white rounded hover:bg-[#1e3a59]">
            ถัดไป
          </button>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4 text-[#1e4472]">{isEditMode ? 'แก้ไขคำถาม' : 'เพิ่มคำถามใหม่'}</h3>
            {['Question', 'Choice1', 'Choice2', 'Choice3', 'Choice4', 'Choice5', 'Answer'].map(field => (
              <div key={field} className="mb-4">
                <label className="block font-bold mb-1 text-gray-700">{field === 'Answer' ? 'คำตอบ (ตรงกับตัวเลือก)' : field}</label>
                <input name={field} value={currentQuestion[field]} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>
            ))}
            <div className="flex justify-between gap-2">
              <button onClick={handleSave} className="w-full py-2 bg-[#1e4472] text-white rounded hover:bg-[#2c4e75]">✅ บันทึก</button>
              <button onClick={() => setShowModal(false)} className="w-full py-2 bg-gray-400 text-white rounded hover:bg-gray-500">❌ ยกเลิก</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageQuestions;
