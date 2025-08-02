import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LeftSideBarAdmin from '../../../components/LeftSideBarAdmin';



function ListSubject() {
    // ไอคอนรูปคน
    const UserIcon = ({ className }) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
    );

    // รับข้อมูลจาก backend เอามาใส่ใน data
    const [data, setData] = useState([]);

    // ดึง data มาจาก backend 
    useEffect(() => {
        axios
            .get('http://localhost:5000/api/admin/registrationsystemadmin')
            .then((res) => {
                setData(res.data);
            })
            .catch((error) => {
                console.error("Error fetching data from RegistrationSystem backend", error);
            });
    }, []);
    return (
        <>
            <div className="bg-gray-50 min-h-screen">
                <LeftSideBarAdmin />

                <main className="ml-80 p-6 font-sans text-gray-800">
                    <div className='max-w-[97%] mx-auto mt-[30px] w-full font-sans text-gray-800'>
                        {/* Header ของ ระบบสมัครสอบ */}
                        <div className='flex items-center border-b-4 border-black pb-4'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-person-lines-fill" viewBox="0 0 16 16">
                                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z" />
                            </svg>
                            <a href='/RegistrationSystemAdmin' className='text-[25px] ml-[10px]'>ระบบสมัครสอบ</a>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="mt-1" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                            </svg>
                            <h1 className="text-[25px] ml-[10px]">รายชื่อ</h1>
                        </div>

                        {/* เอาไว้โชว์ รหัสการสอบ เเละ ชื่อชุดข้อสอบ */}
                        <section className='max-w-[95%] mx-auto mt-[80px] w-full'>
                            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                {data.map((exam) => (
                                    <Link to={`/admin/list-of-names/${exam.examination_id}`} key={exam.examination_id}>
                                        <div className="bg-gradient-to-r from-[#0a183d] to-[#1e3a8a] text-white rounded-xl shadow-lg p-5 flex items-center space-x-4">
                                            <div className="flex-shrink-0">
                                                <UserIcon className="h-12 w-12 text-white/90" />
                                            </div>
                                            <div>
                                                <p className="text-xl font-bold">
                                                    รหัสการสอบ : {exam.examination_id}
                                                </p>
                                                <p className="text-sm text-white/80">
                                                    ชื่อชุดข้อสอบ : {exam.exam_set_name}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </>
    )
}

export default ListSubject