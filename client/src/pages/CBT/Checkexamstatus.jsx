import React, { useState } from 'react';
import axios from 'axios';
import Layout from "../../Components/layout/layout";

function Checkexamstatus() {
  const [citizenId, setCitizenId] = useState('');
  const [examData, setExamData] = useState([]);
  const [message, setMessage] = useState('');

  const handleSearch = async () => {
    if (!citizenId) return;

    try {
      const response = await axios.post('http://localhost:5000/api/check-exam-status', {
        citizenId,
      });

      if (response.data.success) {
        setExamData([response.data.data]); // เก็บข้อมูลไว้ใน array เดียว
        setMessage('');
      } else {
        setExamData([]);
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage('เกิดข้อผิดพลาด');
      setExamData([]);
    }
  };

  return (
    <Layout>
    <div className='bg-gradient-to-b from-[#5dc7ef] to-white py-[2rem] sm:py-[5rem] min-h-screen'>
      <div className='w-[90%] xl:w-[70%] rounded-lg overflow-hidden mx-auto bg-white'>
        <h1 className='bg-[#368bc1] text-white text-center text-[1.4rem] sm:text-[2rem] py-[0.5rem]'>ตรวจสอบสถานะการสอบ</h1>
        <div className='flex flex-col justify-start items-center pt-[1rem] sm:pt-[3rem] pb-[1rem] shadow-xl'>
          <span className='flex flex-col sm:flex-row gap-[0.3rem] sm:gap-[1rem] justify-center w-full items-center'>
            <label className='text-[1.1rem] sm:text-[1.3rem]'>เลขบัตรประจำตัวประชาชน:</label>
            <input
              type="text"
              value={citizenId}
              onChange={(e) => setCitizenId(e.target.value)}
              placeholder='กรอกหมายเลขบัตรประจำตัวประชาชน'
              className='border-2 rounded-full outline-none px-[1rem] text-[1.1rem] sm:text-[1.3rem] w-[90%] sm:w-[25rem]'
            />
          </span>
          <button onClick={handleSearch} className='bg-[#368bc1] hover:bg-[#00187c] text-[1.1rem] sm:text-[1.3rem] text-white px-[2rem] rounded-full mt-[2rem]'>
            ค้นหา
          </button>
          {message && <p className="text-red-600 mt-4">{message}</p>}
        </div>
      </div>

      {examData.length > 0 && (
        <div className='w-[90%] xl:w-[70%] mx-auto mt-[2rem] sm:mt-[5rem] overflow-x-auto'>
          <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-[#368bc1] text-white text-left">
              <tr>
                <th className="px-4 py-2 border-b">รหัส</th>
                <th className="px-4 py-2 border-b">รายวิชา</th>
                <th className="px-4 py-2 border-b">จำนวน</th>
                <th className="px-4 py-2 border-b">เวลา</th>
                <th className="px-4 py-2 border-b">สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {examData.map((student, index) => (
                <tr key={index} className="hover:bg-gray-50 odd:bg-gray-100 even:bg-white">
                  <td className="px-4 py-2 border-b">{student.examination_id}</td>
                  <td className="px-4 py-2 border-b">{student.subject}</td>
                  <td className="px-4 py-2 border-b">{student.total} ข้อ</td>
                  <td className="px-4 py-2 border-b">{student.duration} นาที</td>
                  <td className={`px-4 py-2 border-b 
                    ${student.status === "สอบแล้ว" ? "text-green-600" :
                      student.status === "รอสอบ" ? "text-yellow-500" : "text-red-600"}`}>
                    {student.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </Layout>
  );
}

export default Checkexamstatus;
