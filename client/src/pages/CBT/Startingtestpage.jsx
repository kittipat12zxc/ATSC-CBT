import React from 'react';
import { useNavigate } from 'react-router-dom'; // 👉 import ตัวเปลี่ยนเส้นทาง

export default function ExamIntroPage() {
  const navigate = useNavigate(); // ✅ ใช้งาน useNavigate

  const handleStartExam = () => {
    navigate('/ExamTest'); // 👈 เปลี่ยนหน้าไป /ExamTest
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-400 to-blue-100 px-4 py-10">

      {/* กล่องหลัก */}
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl w-full">

        {/* หัวข้อ */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-6">
          ความรู้คอมพิวเตอร์พื้นฐาน
        </h1>

        {/* รายละเอียดข้อสอบ */}
        <div className="text-gray-700 text-sm md:text-base mb-6 leading-relaxed">
          <p><strong>คำอธิบาย :</strong></p>
          <p>ข้อสอบจำนวน <strong>50</strong> ข้อ <strong>100</strong> คะแนน เวลา <strong>2 ชั่วโมง 30 นาที</strong></p>
          <p>สอบวันพฤหัสบดีที่ <strong>17 กรกฎาคม 2568</strong> เริ่มสอบเวลา <strong>23:23 - 01:56</strong></p>
        </div>

        {/* ข้อมูลผู้เข้าสอบ */}
        <div className="text-gray-700 text-sm md:text-base mb-6">
          <p><strong>ผู้เข้าสอบ :</strong> ธนากร ภาคอีสาน</p>
          <p><strong>รหัสผู้เข้าสอบ :</strong> 6611003</p>
        </div>

        {/* สรุปข้อมูล */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-b py-6 gap-6 text-center text-gray-700">
          <div className="flex flex-col items-center gap-1">
            <img src="https://cdn-icons-png.flaticon.com/512/3448/3448485.png" alt="Time icon" className="w-8 h-8" />
            <div className="text-sm font-semibold">TIME OUT</div>
            <div className="text-xs">2 hour 33 minute</div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <img src="https://static.thenounproject.com/png/1745849-200.png" alt="Questions icon" className="w-8 h-8" />
            <div className="text-sm font-semibold">Number of exams</div>
            <div className="text-xs">50 questions</div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <img src="https://cdn-icons-png.flaticon.com/512/47/47867.png" alt="Trophy icon" className="w-8 h-8" />
            <div className="text-sm font-semibold">Total points</div>
            <div className="text-xs">100 points</div>
          </div>
        </div>

        {/* ปุ่มเริ่มสอบ */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleStartExam} // ⬅ เพิ่ม onClick
            className="bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition font-semibold"
          >
            เริ่มทำข้อสอบ
          </button>
        </div>

      </div>
    </div>
  );
}
