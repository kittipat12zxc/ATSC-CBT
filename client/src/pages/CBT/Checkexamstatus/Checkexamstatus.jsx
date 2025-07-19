import React from 'react'

function Checkexamstatus() {
  const students = [
    { idsubject: "290625", subject: "คณิตศาสตร์", total: 25, Duration: 25, status: "สำเร็จ" },
    { idsubject: "523588", subject: "คณิตศาสตร์", total: 25, Duration: 25, status: "ไม่สำเร็จ" },
    { idsubject: "535325", subject: "คณิตศาสตร์", total: 25, Duration: 25, status: "กำลังดำเนินการ" },

  ];
  return (
    <>
      <div className='bg-gradient-to-b from-[#5dc7ef] to-white py-[2rem] sm:py-[5rem] min-h-screen'>

        <div className='w-[90%] xl:w-[70%] rounded-lg overflow-hidden mx-auto bg-white'>
          <h1 className=' bg-[#368bc1] text-white text-center text-[1.4rem] sm:text-[2rem] py-[0.5rem] '>ตรวจสอบสถานะการสอบ</h1>
          <div className=' flex flex-col justify-start items-center pt-[1rem] sm:pt-[3rem] pb-[1rem] shadow-xl'>
            <span className='flex flex-col sm:flex-row gap-[0.3rem] sm:gap-[1rem] justify-center w-full items-center'>
              <label htmlFor="" className='text-[1.1rem] sm:text-[1.3rem] '>เลขบัตรประจำตัวประชาชน:</label>
              <input type="text" placeholder='กรอกหมายเลขบัตรประจำตัประชาชน' className='border-2 rounded-full outline-none px-[1rem] text-[1.1rem] sm:text-[1.3rem] w-[90%] sm:w-[25rem]' />
            </span>
            <button className=' bg-[#368bc1] hover:bg-[#00187c] text-[1.1rem] sm:text-[1.3rem] text-white px-[2rem] rounded-full mt-[2rem]'>ค้นหา</button>
          </div>
        </div>
        <div className='w-[90%] xl:w-[70%] mx-auto mt-[2rem] sm:mt-[5rem] overflow-x-auto'>
          <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
            <thead className=" bg-[#368bc1] text-white text-left ">
              <tr>
                <th className="px-4 py-2 border-b font-normal sm:font-semibold">รหัส</th>
                <th className="px-4 py-2 border-b font-normal sm:font-semibold">รายวิชา</th>
                <th className="px-4 py-2 border-b font-normal sm:font-semibold">จำนวน</th>
                <th className="px-4 py-2 border-b font-normal sm:font-semibold">เวลา</th>
                <th className="px-4 py-2 border-b font-normal sm:font-semibold">สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 odd:bg-gray-100 even:bg-white whitespace-nowrap">
                  <td className="px-4 py-2 border-b">{student.idsubject}</td>
                  <td className="px-4 py-2 border-b">{student.subject}</td>
                  <td className="px-4 py-2 border-b">{student.total} ข้อ</td>
                  <td className="px-4 py-2 border-b">{student.Duration} นาที</td>
                  <td className={`px-4 py-2 border-b font-normal sm:font-semibold 
                  ${student.status === "สำเร็จ" ? "text-green-600" :
                      student.status === "กำลังดำเนินการ" ? "text-yellow-500" :
                        "text-red-600"}`}>
                    {student.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </>
  )
}

export default Checkexamstatus