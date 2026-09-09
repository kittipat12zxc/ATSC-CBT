import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Main() {
    const [NumberExamination, setNumberExamination] = useState([]);
    const [NumberExaminee, setNumberExaminee] = useState([]);
    const [NumberContact, setNumberContact] = useState(null);
    const [NumberAdmin, setNumberAdmin] = useState(null);

    const AdminID = sessionStorage.getItem("AdminID");
    sessionStorage.setItem('AdminID', AdminID);

    useEffect(() => {
        async function fetchDataBaes() {
            try {
                const res = await fetch("/MainAdmin", { method: "POST" });
                const data = await res.json();

                setNumberExamination(data.ExaminationCount);
                setNumberExaminee(data.ExamineeCount);
                setNumberContact(data.ContactsCount);
                setNumberAdmin(data.AdminCount);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchDataBaes();
    }, []);

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <main className="w-full h-screen flex bg-[#d0e9ff]">
            <aside className={`h-screen ${isSidebarOpen ? 'w-[220px]' : 'w-0'} bg-[#0a2441] cursor-pointer flex items-center justify-center transition-all duration-300 overflow-hidden relative`}>
                <div className="flex flex-col justify-between h-full w-full px-2 pb-2 box-border">
                    <div className="text-white border-b border-white/40 text-center text-3xl font-bold py-4">Menu</div>

                    <ul className="list-none flex-grow flex flex-col gap-2 py-2 m-0">
                        <li className="flex items-center rounded-xl text-white transition-all cursor-pointer hover:bg-[#0f3156] hover:shadow-md">
                            <Link to="/main" state={AdminID} className="py-2 px-3 text-white w-full flex items-center">
                            <svg className="mr-2" width="16" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M8.354..." /></svg>
                            <span>หน้าหลัก</span>
                            </Link>
                        </li>

                        <li className="flex items-center rounded-xl text-white transition-all cursor-pointer hover:bg-[#0f3156] hover:shadow-md">
                            <Link to="/ExamsetManager" state={AdminID} className="py-2 px-3 text-white w-full flex items-center">
                            <svg className="mr-2" width="16" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M8.354..." /></svg>
                            <span>ข้อสอบ</span>
                            </Link>
                        </li>

                        <li className="flex items-center rounded-xl text-white transition-all cursor-pointer hover:bg-[#0f3156] hover:shadow-md">
                            <Link to="/UserListManager" state={AdminID} className="py-2 px-3 text-white w-full flex items-center">
                            <svg className="mr-2" width="16" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M8.354..." /></svg>
                            <span>ผู้เข้าสอบ</span>
                            </Link>
                        </li>
                    </ul>

                    <ul className="list-none mt-2 p-0 m-0">
                        <li className="flex items-center rounded-xl text-white transition-all cursor-pointer hover:bg-[#0f3156] hover:shadow-md">
                            <Link to="/" className="py-2 px-3 text-white w-full flex items-center">
                            <svg className="mr-2" width="16" height="16" fill="currentColor"><path d="..." /></svg>
                            <span>ออกจากระบบ</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>


            <section className="flex-1 overflow-y-auto">
                <header className="flex items-center justify-between px-8 py-4 bg-white shadow relative z-10">
                    <div className="flex items-center gap-5 text-[#214E7F]">
                        <button className="text-xl bg-none border-none cursor-pointer transition-transform hover:scale-110" onClick={toggleSidebar}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 448 512">
                                <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/>
                            </svg>
                        </button>
                        <h1 className="font-kanit text-xl">หน้าหลัก</h1>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-xl w-[250px] bg-white transition hover:bg-[#214E7F] hover:text-white cursor-pointer">
                        <svg width="25" height="25" fill="currentColor" viewBox="0 0 16 16"><path d="M11 6a3..."/></svg>
                        <h5 className="m-0 text-lg font-kanit">{AdminID}</h5>
                    </div>
                </header>

                <div className="p-4 md:px-32 space-y-4">
                    <div className="bg-white rounded-xl p-4 shadow text-lg font-kanit">
                        <p className="text-[#214E7F] font-bold text-xl">ข้อมูลการสอบ</p>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <button className="bg-[#eaffea] hover:bg-[#d0f0d0] p-10 rounded text-base">คลังข้อสอบ <span className="text-red-500">{NumberExamination}</span> ชุด</button>
                            <button className="bg-[#e8f7ff] hover:bg-[#d0e9ff] p-10 rounded text-base">ผู้เข้าสอบทั้งหมด <span className="text-red-500">{NumberExaminee}</span> คน</button>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow text-lg font-kanit">
                        <p className="text-[#214E7F] font-bold text-xl">ข้อมูลการติดต่อ</p>
                        <div className="flex justify-center mt-4">
                            <button className="w-full bg-[#ffecec] hover:bg-[#ffcccc] p-10 rounded text-base">การติดต่อเข้ามา <span className="text-red-500">{NumberContact}</span> คน</button>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow text-lg font-kanit">
                        <p className="text-[#214E7F] font-bold text-xl">ผู้ดูแลระบบ</p>
                        <div className="flex justify-center mt-4">
                            <button className="w-full bg-[#ffffec] hover:bg-[#feffcc] p-10 rounded text-base">ผู้ดูแลระบบทั้งหมด <span className="text-red-500">{NumberAdmin}</span> คน</button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Main;