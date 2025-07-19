import React from 'react'

function Checkthelist() {
  const students = [
    { id: "001", firstname: "สมชาย", lastname: "ใจดี", address: "มหาวิทยาลัยสวนดุสิต", examroom: "123456" },

  ];
  return (
    <>
      <div className="bg-gradient-to-b from-[#5dc7ef] to-white py-[2rem] min-h-screen">
        <div className="flex flex-col justify-start items-center py-[2rem] bg-white w-[95%] sm:w-[80%] mx-auto rounded-[15px] shadow-xl">
          <h1 className="text-[1.5rem] sm:text-[2rem] text-[#368bc1] font-semibold text-center">ตรวจสอบรายชื่อ</h1>

          <div className="flex flex-col sm:flex-row gap-[1rem] sm:gap-[2rem] mt-[1rem] w-full sm:w-auto items-center sm:items-start justify-center">
            <input
              type="search"
              placeholder="กรุณากรอกชื่อ/เลขบัตรประจำชน"
              className="border-2 text-[1rem] sm:text-[1.2rem] px-[0.6rem] py-[0.4rem] w-[90%] sm:w-[25rem] rounded-full outline-none"
            />
            <div className="flex gap-[1rem]">
              <button className="bg-green-500 hover:bg-green-600 text-white px-[1rem] py-[0.4rem] rounded-full">
                ตรวจสอบ
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white px-[1rem] py-[0.4rem] rounded-full">
                ย้อนกลับ
              </button>
            </div>
          </div>

          <div className="w-full px-[1rem] sm:w-[90%] mt-[2rem] overflow-x-auto">
            <table className="min-w-[600px] w-full border border-gray-300 rounded-lg overflow-hidden text-sm sm:text-base">
              <thead className="bg-[#368bc1] text-white text-left whitespace-nowrap">
                <tr>
                  <th className="px-4 py-2 border-b font-semibold">รหัสประจำตัวผู้เข้าสอบ</th>
                  <th className="px-4 py-2 border-b font-semibold">ชื่อ</th>
                  <th className="px-4 py-2 border-b font-semibold">นามสกุล</th>
                  <th className="px-4 py-2 border-b font-semibold">สถานที่สอบ</th>
                  <th className="px-4 py-2 border-b font-semibold">ห้องสอบ</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50 odd:bg-gray-100 even:bg-white">
                    <td className="px-4 py-2 border-b">{student.id}</td>
                    <td className="px-4 py-2 border-b">{student.firstname}</td>
                    <td className="px-4 py-2 border-b">{student.lastname}</td>
                    <td className="px-4 py-2 border-b">{student.address}</td>
                    <td className="px-4 py-2 border-b">{student.examroom}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>


    </>

  )
}

export default Checkthelist