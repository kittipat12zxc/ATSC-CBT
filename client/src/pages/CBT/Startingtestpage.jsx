import React, { useState, useEffect } from 'react'
import { useLocation ,useNavigate } from 'react-router-dom'; // 👉 import ตัวเปลี่ยนเส้นทาง
import axios from 'axios';

import CustomAlert from './components/Customalert';

export default function ExamIntroPage() {
  const [alertData, setAlertData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const ExaminationID = location.state?.ExaminationID || sessionStorage.getItem("ExaminationID");
  const ExamineeID = sessionStorage.getItem("ExamineeID");

  const [examinationData, setExaminationData] = useState({
    DateOfExamination: '',
    ExaminationName: '',
    Details: '',
    TimeOut: '',
    Number_of_exam: '',
    Total: '',
    DayExam: '',
    TimeStart: '',
    TimeEnd: '',
    ExamineeName: ''
  });

  useEffect(() => {
      window.history.pushState(null, "", window.location.href);
  
      const handlePopState = () => {
          window.history.pushState(null, "", window.location.href);
      };
  
      window.addEventListener("popstate", handlePopState);
  
      return () => {
          window.removeEventListener("popstate", handlePopState);
      };
  }, []);

  useEffect(() => {
    if (!ExaminationID) {
      console.warn('No ExaminationID provided');
      return; // ถ้าไม่มี ExaminationID ไม่ต้องดึงข้อมูล
    }

    axios.post('http://localhost:5000/api/cbt/ExplainExam', { ExaminationID, ExamineeID })
      .then(response => {
        console.log('📥 Data from server:', response.data);
        const dateOfExamination = new Date(response.data.start_datetime)
        const formatted = dateOfExamination.toLocaleString("th-TH", {
            weekday: 'long',
            year: "numeric",
            month: "long",
            day: "numeric",
        });
        const datastart = dateOfExamination.toLocaleString("th-TH", {
          hour: '2-digit',
          minute: '2-digit',
        })
        const TimeExam = response.data.duration_minutes;
        const [hours, minutes, seconds] = TimeExam.split(":").map(Number);
        const addedMs = (hours * 60 * 60 + minutes * 60 + seconds) * 1000;// คำนวณเป็น milliseconds
        const EndofExam = new Date(dateOfExamination.getTime() + addedMs).toLocaleString("th-TH", {
          hour: '2-digit',
          minute: '2-digit'
        })
        const Fullname = `${response.data.firstname} ${response.data.lastname}`;
        setExaminationData({
          DateOfExamination: response.data.start_datetime,
          ExaminationName: response.data.examination_name,
          Details: response.data.details,
          TimeOut: response.data.duration_minutes,
          Number_of_exam: response.data.question_count,
          Total: response.data.total_score,
          DayExam: formatted,
          TimeStart: datastart,
          TimeEnd: EndofExam,
          ExamineeName: Fullname
        })
      })
      .catch(error => {
        console.error('❌ Error fetching examination data:', error);
      });
  }, [ExaminationID, ExamineeID]);

  const start = () => {
    if (!ExaminationID) {
      console.error("❌ ExaminationID is missing!");
      return;
    }
    
    const dateOfExamination = new Date(examinationData.DateOfExamination)
    const formatted2 = dateOfExamination.toLocaleString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const TimeExam = examinationData.TimeOut;
    const [hours, minutes, seconds] = TimeExam.split(":").map(Number);
    const addedMs = (hours * 60 * 60 + minutes * 60 + seconds) * 1000;// คำนวณเป็น milliseconds
    const EndofExam = new Date(dateOfExamination.getTime() + addedMs);// วันที่และเวลาหมดสอบ
    const now = new Date(); // วันที่และเวลาปัจจุบัน

    if (now < dateOfExamination) {
      setAlertData({
        title: "ยังไม่ถึงเวลาสอบ",
        message: `กรุณารอเวลา ${formatted2} น.`,
      });
      return;
    }
    else if (now > EndofExam) {
      setAlertData({
        title: "หมดเวลาสอบแล้ว",
        message: "คุณไม่สามารถเข้าสอบได้",
      });
      return;
    }
    else {
      const total = examinationData.Total
      const numberExam = examinationData.Number_of_exam
      const examinationname = examinationData.ExaminationName
      const ExaminationName = sessionStorage.setItem("ExaminationName", examinationname);
      const Total = sessionStorage.setItem("Total", total);
      const NumberExam = sessionStorage.setItem("NumberExam", numberExam);

      console.log("Navigating to Home with ExaminationID:", ExaminationID);
      console.log(ExamineeID);
      console.log("ExaminationName: ",ExaminationName)
      navigate("/Exam", {
        state: {
          ExaminationID,
          ExamineeID,
          ExaminationName,
          Total,
          NumberExam
        }
      });
    }
  }

  if (!examinationData) return <p>Loading...</p>

  const formatTimehourandminute = (time) => {
    const [hour, minute, ...section] = time.split(':');
    console.log(section);
    return `${Number(hour)} hour ${Number(minute)} minute`
  }
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-400 to-blue-100 px-4 py-10">

      {/* กล่องหลัก */}
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl w-full">

        {/* หัวข้อ */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-6">
          {examinationData.ExaminationName}
        </h1>

        {/* รายละเอียดข้อสอบ */}
        <div className="text-gray-700 text-sm md:text-base mb-6 leading-relaxed">
          <p><strong>คำอธิบาย :</strong></p>
          <p>{examinationData.Details}</p>
          <p>สอบ{examinationData.DayExam} เริ่มสอบเวลา {examinationData.TimeStart} - {examinationData.TimeEnd}</p>
        </div>

        {/* ข้อมูลผู้เข้าสอบ */}
        <div className="text-gray-700 text-sm md:text-base mb-6">
          <p><strong>ผู้เข้าสอบ : </strong>{examinationData.ExamineeName}</p>
          <p><strong>รหัสผู้เข้าสอบ :</strong> {ExamineeID}</p>
        </div>

        {/* สรุปข้อมูล */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-b py-6 gap-6 text-center text-gray-700">
          <div className="flex flex-col items-center gap-1">
            <img src="https://cdn-icons-png.flaticon.com/512/3448/3448485.png" alt="Time icon" className="w-8 h-8" />
            <div className="text-sm font-semibold">TIME OUT</div>
            <div className="text-xs">{formatTimehourandminute(examinationData.TimeOut)}</div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <img src="https://static.thenounproject.com/png/1745849-200.png" alt="Questions icon" className="w-8 h-8" />
            <div className="text-sm font-semibold">Number of exams</div>
            <div className="text-xs">{examinationData.Number_of_exam} questions</div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <img src="https://cdn-icons-png.flaticon.com/512/47/47867.png" alt="Trophy icon" className="w-8 h-8" />
            <div className="text-sm font-semibold">Total points</div>
            <div className="text-xs">{examinationData.Total} points</div>
          </div>
        </div>

        {/* ปุ่มเริ่มสอบ */}
        <form onSubmit={(e) => { e.preventDefault(); start(); }}>
          <div className="mt-8 flex justify-end">
            <button type='submit' className="bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition font-semibold">
              เริ่มทำข้อสอบ
            </button>

            {alertData && (
              <CustomAlert
                title={alertData.title}
                message={alertData.message}
                onClose={() => setAlertData(null)}
              />
            )}            
          </div>
        </form>
      </div>
    </div>
  );
}
