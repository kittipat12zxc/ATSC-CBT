import React from 'react'
import Header from '../../components/Header/PCHeader'
import Footer from '../../components/Footer/Footer'
import SideBarRegistration from './components/SideBarRegistration/SideBarRegistration'

function PrintExam() {
    const students = [
        { id: "001", idcard: 1234567891234, firstname: "สมชาย", lastname: "ใจดี", address: "มหาวิทยาลัยสวนดุสิต", examroom: "123456" },
        { id: "001", idcard: 1234567891234, firstname: "สมชาย", lastname: "ใจดี", address: "มหาวิทยาลัยสวนดุสิต", examroom: "123456" },
        { id: "001", idcard: 1234567891234, firstname: "สมชาย", lastname: "ใจดี", address: "มหาวิทยาลัยสวนดุสิต", examroom: "123456" },
        
    ];

    return (
        <>
            <Header />
            <div className="w-full min-h-screen bg-gray-100">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                    <div className="flex flex-col md:flex-row md:gap-x-8">

                        {/* ========== Left Sidebar ========== */}
                        <div className='w-full md:w-[30%] mb-8 md:mb-0' >
                            <SideBarRegistration />
                        </div>

                        {/* ========== Right Content ========== */}
                        <main className="w-full md:w-[70%]">
                            <h1 className='bg-[#082290] text-white inline-block text-[1.5rem] p-3 font-normal '>พิมพ์บัตรประจำตัวผู้เข้าสอบ</h1>
                            <div className='bg-gray-200 mt-[-2rem] rounded-[5px] shadow-lg pt-[2rem]'>
                                <div className='flex flex-col p-[2rem]'>
                                    <label htmlFor="" className='text-[1.2rem]'>เลขบัตรประจำตัวประชาชน</label>
                                    <input type="text" className='w-[30rem] border-2 border-gray-300 rounded-[5px] text-[1.5rem] outline-none text-gray-500 pl-[1rem]' />
                                    <br />
                                    <label htmlFor="" className='text-[1.2rem]'>รหัสผ่าน</label>
                                    <input type="password" className='w-[30rem] border-2 border-gray-300 rounded-[5px] text-[1.5rem] outline-none text-gray-500 pl-[1rem]' />
                                    <br />
                                    <button
                                        className='self-start  text-[1.2rem] bg-[#082290] text-white rounded-full px-6 py-[2px] hover:bg-[#0a2fa8] transition-colors duration-200'
                                    >
                                        ยืนยัน
                                    </button>
                                </div>
                            </div>


                            <div className="w-full  sm:w-[100%] mt-[2rem] overflow-x-auto">
                                <table className="min-w-[600px] w-full border border-gray-300 rounded-[5px] overflow-hidden text-sm sm:text-base">
                                    <thead className="bg-[#082290] text-white text-left whitespace-nowrap">
                                        <tr>
                                            <th className="px-4 py-2 border-b font-medium">รหัสประจำตัวผู้เข้าสอบ</th>
                                            <th className="px-4 py-2 border-b font-medium">บัตรประจำตัวประชาชน</th>
                                            <th className="px-4 py-2 border-b font-medium">ชื่อ</th>
                                            <th className="px-4 py-2 border-b font-medium">นามสกุล</th>
                                            <th className="px-4 py-2 border-b font-medium">สถานที่สอบ</th>
                                            <th className="px-4 py-2 border-b font-medium">ห้องสอบ</th>
                                            <th className="px-4 py-2 border-b font-medium"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {students.map((student) => (
                                            <tr key={student.id} className="hover:bg-gray-50 odd:bg-gray-100 even:bg-white">
                                                <td className="px-4 py-2 border-b">{student.id}</td>
                                                <td className="px-4 py-2 border-b">{student.idcard}</td>
                                                <td className="px-4 py-2 border-b">{student.firstname}</td>
                                                <td className="px-4 py-2 border-b">{student.lastname}</td>
                                                <td className="px-4 py-2 border-b">{student.address}</td>
                                                <td className="px-4 py-2 border-b">{student.examroom}</td>
                                                <td className="px-4 py-2 border-b"><button className='underline decoration-solid '>พิมพ์ใบสมัครสอบ</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default PrintExam