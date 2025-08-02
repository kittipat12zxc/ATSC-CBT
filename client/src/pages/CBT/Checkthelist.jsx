import React, { useState } from 'react';
import Layout from '../../components/layout/layout';

function Checkthelist() {
  const [thaiIdInput, setThaiIdInput] = useState('');
  const [student, setStudent] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setError('');
    setStudent(null);

    if (!thaiIdInput) {
      setError('กรุณากรอกเลขบัตรประจำตัวประชาชน');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/examinee/${thaiIdInput}`);
      if (response.ok) {
        const data = await response.json();
        setStudent(data);
      } else if (response.status === 404) {
        setError('ไม่พบข้อมูลผู้เข้าสอบ');
      } else {
        setError('เกิดข้อผิดพลาดในการดึงข้อมูล');
      }
    } catch (err) {
      setError('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
    }
  };

  return (
    <Layout>
    <div className="bg-gradient-to-b from-[#5dc7ef] to-white py-[2rem] min-h-screen">
      <div className="flex flex-col justify-start items-center py-[2rem] bg-white w-[95%] sm:w-[80%] mx-auto rounded-[15px] shadow-xl">
        <h1 className="text-[1.5rem] sm:text-[2rem] text-[#368bc1] font-semibold text-center">ตรวจสอบรายชื่อ</h1>

        <div className="flex flex-col sm:flex-row gap-[1rem] sm:gap-[2rem] mt-[1rem] w-full sm:w-auto items-center sm:items-start justify-center">
          <input
            type="search"
            placeholder="กรุณากรอกชื่อ/เลขบัตรประจำตัวประชาชน"
            className="border-2 text-[1rem] sm:text-[1.2rem] px-[0.6rem] py-[0.4rem] w-[90%] sm:w-[25rem] rounded-full outline-none"
            value={thaiIdInput}
            onChange={(e) => setThaiIdInput(e.target.value)}
          />
          <div className="flex gap-[1rem]">
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-[1rem] py-[0.4rem] rounded-full"
              onClick={handleSearch}
            >
              ตรวจสอบ
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-[1rem] py-[0.4rem] rounded-full"
              onClick={() => {
                setStudent(null);
                setThaiIdInput('');
                setError('');
              }}
            >
              ย้อนกลับ
            </button>
          </div>
        </div>

        {error && <p className="text-red-600 mt-4">{error}</p>}

        {student && (
          <div className="w-full px-[1rem] sm:w-[90%] mt-[2rem] overflow-x-auto">
            <table className="min-w-[600px] w-full border border-gray-300 rounded-lg overflow-hidden text-sm sm:text-base">
              <thead className="bg-[#368bc1] text-white text-left whitespace-nowrap">
                <tr>
                  <th className="px-4 py-2 border-b font-semibold">รหัสประจำตัวผู้เข้าสอบ</th>
                  <th className="px-4 py-2 border-b font-semibold">เลขบัตรประชาชน</th>
                  <th className="px-4 py-2 border-b font-semibold">ชื่อ</th>
                  <th className="px-4 py-2 border-b font-semibold">นามสกุล</th>
                  <th className="px-4 py-2 border-b font-semibold">สถานที่สอบ</th>
                  <th className="px-4 py-2 border-b font-semibold">ห้องสอบ</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50 odd:bg-gray-100 even:bg-white">
                  <td className="px-4 py-2 border-b">{student.examinee_id}</td>
                  <td className="px-4 py-2 border-b">{student.thai_id}</td>
                  <td className="px-4 py-2 border-b">{student.firstname}</td>
                  <td className="px-4 py-2 border-b">{student.lastname}</td>
                  <td className="px-4 py-2 border-b">{student.exam_place}</td>
                  <td className="px-4 py-2 border-b">{student.exam_room}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
    </Layout>
  );
}

export default Checkthelist;
