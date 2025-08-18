import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHome, FaPlus, FaPen, FaTrash, FaCheck } from "react-icons/fa";

function ListOfAdmins() {
    const [mode, setMode] = useState("normal");
    const navigate = useNavigate();

    return (
        <div className="font-[Kanit] bg-gray-50 min-h-screen">
            {/* Navbar */}
            <header className="bg-[#0a2441] text-white p-4 shadow-md flex justify-between items-center">
                <div className="flex gap-2">
                    <button onClick={() => navigate(-1)} className="bg-white text-black p-2 rounded-md hover:bg-gray-200 transition-colors">
                        <FaArrowLeft />
                    </button>
                    <button onClick={() => navigate("/main")} className="bg-white text-black px-3 py-1 rounded-md flex items-center gap-2 hover:bg-gray-200 transition-colors">
                        <FaHome /> หน้าหลัก
                    </button>
                </div>
                <div className="flex gap-3">
                    <button onClick={() => setMode('edit')} className="bg-yellow-400 text-black px-3 py-1 rounded-md flex items-center gap-2 hover:bg-yellow-500 transition-colors">
                        <FaPen /> แก้ไข
                    </button>
                    <button onClick={() => setMode('delete')} className="bg-red-500 text-white px-3 py-1 rounded-md flex items-center gap-2 hover:bg-red-600 transition-colors">
                        <FaTrash /> ลบ
                    </button>
                </div>
            </header>

            <main className="p-4">
                <h1 className="text-2xl font-semibold mb-4 text-gray-800">รายชื่อแอดมิน</h1>
                <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                    <table className="w-full table-auto text-sm border-collapse">
                        <thead className="bg-[#23466d] text-white">
                            <tr>
                                {['รหัสแอดมิน', 'ชื่อผู้ใช้', 'ชื่อ', 'นามสกุล', 'อีเมล์', 'ตำแหน่ง', 'ตัวเลือก']
                                    .filter(h => !(mode === "normal" && h === 'ตัวเลือก'))
                                    .map(h => <th key={h} className="p-3 border text-left">{h}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 border-b">
                                <td className="p-3 border">12345</td>
                                <td className="p-3 border">Hunsen</td>
                                <td className="p-3 border">Hun</td>
                                <td className="p-3 border">Manet</td>
                                <td className="p-3 border">khmer@mail.com</td>
                                <td className="p-3 border text-center">Administrator</td>
                                {/* แสดงช่อง action เฉพาะตอน mode ไม่ใช่ normal */}
                                {mode !== "normal" && (
                                    <td className="p-3 border">
                                        <div className="flex gap-2 justify-center">
                                            {mode === "edit" && (
                                                <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">แก้ไข</button>
                                            )}
                                            {mode === "delete" && (
                                                <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">ลบ</button>
                                            )}
                                        </div>
                                    </td>
                                )}
                            </tr>
                        </tbody>
                    </table>
                    {(mode === "edit" || mode === "delete") && (
                        <div className="p-3 text-right bg-gray-100">
                            <button onClick={() => setMode('normal')} className="bg-gray-500 text-white px-4 py-2 rounded-md flex items-center gap-2 ml-auto hover:bg-gray-600">
                                <FaCheck /> เสร็จสิ้น
                            </button>
                        </div>
                    )}
                </div>
            </main>

            {/* POPUP HERE! NA FLUKE */}
                        
        </div>
    )
}

export default ListOfAdmins