import React, { useState } from 'react';
import {
  Layers,
  User,
  CalendarDays,
  Settings,
  Printer,
  Signal,
  FileText,
  FileCheck,
  Megaphone,
  List,
  LogOut,
} from 'lucide-react';

const menuItems = [
  { id: 'news', icon: <Layers size={22} />, text: 'ข่าวสาร/ประชาสัมพันธ์', href: "/AdminApp" },
  { id: 'exam-reg', icon: <User size={22} />, text: 'ระบบสมัครสอบ', href: "/RegistrationSystemAdmin" },
  { id: 'scope', icon: <CalendarDays size={22} />, text: 'ระบบการจัดทำขอบเขตงาน', href: "/" },
  { id: 'design', icon: <Settings size={22} />, text: 'ระบบการออกแบบข้อสอบ', href: "/" },
  { id: 'printing', icon: <Printer size={22} />, text: 'ระบบการจัดพิมพ์และเตรียมข้อสอบ', href: "/" },
  { id: 'distribution', icon: <Signal size={22} />, text: 'ระบบการกระจายข้อสอบไปยังสนามสอบ', href: "/" },
  { id: 'exam-ops', icon: <FileText size={22} />, text: 'ระบบการจัดสอบจริง', href: "/" },
  { id: 'grading', icon: <FileCheck size={22} />, text: 'ระบบการตรวจข้อสอบ', href: "/" },
  { id: 'results', icon: <Megaphone size={22} />, text: 'ระบบการประกาศผลสอบ', href: "/" },
  { id: 'evaluation', icon: <List size={22} />, text: 'ระบบการประเมินและสรุปผล', href: "/" },
];

const LeftSideBarAdmin = () => {
  const [activeItem, setActiveItem] = useState('news');

  return (
    <aside className="fixed top-0 left-0 flex h-screen w-80 flex-col bg-[#212529] text-white">
      {/* ===== ส่วนหัวของ Sidebar (ปรับปรุงใหม่) ===== */}
      <div className="p-4 border-b border-gray-700">
        <div className="bg-white py-4 text-center text-xl font-bold tracking-widest text-black rounded-md border border-gray-400">
          ADMIN PAGE
        </div>
      </div>

      {/* ===== ส่วนของลิงก์เมนูหลัก ===== */}
      <nav className="flex-grow space-y-1 p-4">
        {menuItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            onClick={() => setActiveItem(item.id)}
            // เพิ่ม relative เพื่อเป็นคอนเทนเนอร์ให้เส้นขีดใต้
className={`relative flex items-center rounded-md px-4 py-3 text-base font-medium transition-colors hover:bg-[#3d444a] ${activeItem === item.id ? 'bg-[#343a40]' : ''}`}>
            <span className="mr-4">{item.icon}</span>
            <span>{item.text}</span>

            {/* ===== เส้นขีดใต้สำหรับเมนูที่ Active (เพิ่มใหม่) ===== */}
            {activeItem === item.id && (
              <span className="absolute bottom-1.5 left-4 right-4 h-px bg-white"></span>
            )}
          </a>
        ))}
      </nav>

      {/* ===== เส้นคั่นล่าง ===== */}
      <hr className="border-t border-gray-700" />

      {/* ===== ส่วนท้ายของ Sidebar (ปุ่มออกจากระบบ) - เหมือนเดิม ===== */}
      <div className="p-4">
        <a
          href="/"
          className="flex items-center justify-center rounded-md px-4 py-3 text-base font-medium transition-colors hover:bg-[#3d444a]"
        >
          <span className="mr-3">ออกจากระบบ</span>
          <LogOut size={22} />
        </a>
      </div>
    </aside>
  );
};

export default LeftSideBarAdmin;