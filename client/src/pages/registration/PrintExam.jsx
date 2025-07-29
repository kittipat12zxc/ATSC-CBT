import React, { useState } from 'react';
import Header from '../../components/Header/PCHeader'
import Footer from '../../components/Footer/Footer'
import SideBarRegistration from './components/SideBarRegistration/SideBarRegistration'
import axios from 'axios';
import ATSCLogo from '../../assets/atsc.png'
import QRCodeDraft from '../../assets/QRCodeDraft.png'

function PrintExam() {
    const students = [
        { id: "001", idcard: 1234567891234, firstname: "สมชาย", lastname: "ใจดี", address: "มหาวิทยาลัยสวนดุสิต", examroom: "123456" },
        { id: "001", idcard: 1234567891234, firstname: "สมชาย", lastname: "ใจดี", address: "มหาวิทยาลัยสวนดุสิต", examroom: "123456" },
        { id: "001", idcard: 1234567891234, firstname: "สมชาย", lastname: "ใจดี", address: "มหาวิทยาลัยสวนดุสิต", examroom: "123456" },

    ];

    const [thaiId, setThaiId] = useState('');
    const [data, setData] = useState(null);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        console.log('Searching for:', thaiId);
        try {
            const res = await axios.get(`http://localhost:5000/api/PrintExam/search/${thaiId.trim()}`);
            setData(res.data);
            setError('');
        } catch (err) {
            setData(null);
            if (err.response?.status === 404) {
                setError('ไม่พบข้อมูลผู้เข้าสอบ');
            } else {
                setError('เกิดข้อผิดพลาดในการดึงข้อมูล');
            }
        }
    };


    return (
        <>
            <div className='ForPrintHidden'>
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
                                        <input
                                            type="text"
                                            placeholder="กรอกเลขบัตรประชาชน"
                                            value={thaiId}
                                            onChange={(e) => setThaiId(e.target.value)}
                                            className="w-[30rem] border-2 border-gray-300 rounded-[5px] text-[1.5rem] outline-none text-gray-500 pl-[1rem]"
                                        />
                                        <br />

                                        <button
                                            onClick={handleSearch}
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
                                                <th className="px-4 py-2 border-b font-medium">ชื่อ</th>
                                                <th className="px-4 py-2 border-b font-medium">นามสกุล</th>
                                                <th className="px-4 py-2 border-b font-medium">สถานที่สอบ</th>
                                                <th className="px-4 py-2 border-b font-medium">ห้องสอบ</th>
                                                <th className="px-4 py-2 border-b font-medium">วิชา</th>
                                                <th className="px-4 py-2 border-b font-medium"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data && (
                                                <tr className="hover:bg-gray-50 odd:bg-gray-100 even:bg-white">
                                                    <td className="px-4 py-2 border-b">{data.enrollments_id}</td>
                                                    <td className="px-4 py-2 border-b">{data.firstname}</td>
                                                    <td className="px-4 py-2 border-b">{data.lastname}</td>
                                                    <td className="px-4 py-2 border-b">{data.exam_place} <br />{data.exam_building}</td>
                                                    <td className="px-4 py-2 border-b">{data.exam_room}</td>
                                                    <td className="px-4 py-2 border-b">{data.exam_set_name}</td>
                                                    <td className="px-4 py-2 border-b"><button onClick={() => window.print()} className='underline decoration-solid '>พิมพ์ใบสมัครสอบ</button></td>
                                                </tr>
                                            )}
                                        </tbody>



                                    </table>
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>

            <div id="printable-area">
                {data && (
                    <div id="printable-area" className="border-2 p-6 text-[1rem] text-black leading-relaxed">
                        {/* Header: Logo + QR */}
                        <div className="flex justify-between items-start border-b pb-4 mb-4">
                            <img src={ATSCLogo} alt="Logo ATSC" className="h-[5rem]" />
                            <img src={QRCodeDraft} alt="QR Code" className="h-[8rem] object-cover" />
                        </div>

                        {/* Basic Info */}
                        <div className="space-y-4">
                            <div className="flex">
                                <p className="font-semibold w-[180px]">ชื่อ-นามสกุล:</p>
                                <p>{data.firstname} {data.lastname}</p>
                            </div>
                            <div className="flex">
                                <p className="font-semibold w-[180px]">เลขบัตรประชาชน:</p>
                                <p>{data.thai_id}</p>
                            </div>

                           
                        </div>

                        {/* ตารางรายวิชา */}
                        <div className="mt-8">
                            <h2 className="text-lg font-semibold mb-2 underline">รายวิชาที่สอบ</h2>
                            <table className="w-full border border-gray-400 text-sm">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="px-4 py-2 border-b font-medium">รหัสประจำตัวผู้เข้าสอบ</th>
                                        <th className="px-4 py-2 border-b font-medium">สถานที่สอบ</th>
                                        <th className="px-4 py-2 border-b font-medium">ห้องสอบ</th>
                                        <th className="px-4 py-2 border-b font-medium">วิชา</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr >
                                        <td className="px-4 py-2 border-b">{data.enrollments_id}</td>
                                        <td className="px-4 py-2 border-b">{data.exam_place} <br />{data.exam_building}</td>
                                        <td className="px-4 py-2 border-b">{data.exam_room}</td>
                                        <td className="px-4 py-2 border-b">{data.exam_set_name}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* หมายเหตุท้าย */}
                        <div className="mt-6 text-sm italic">
                            * กรุณานำเอกสารนี้มายื่นก่อนเข้าสอบ พร้อมบัตรประจำตัวประชาชน
                        </div>
                    </div>


                )}
            </div>
        </>
    )
}

export default PrintExam