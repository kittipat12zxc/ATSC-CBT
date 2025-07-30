import React from 'react';
import { useLocation } from 'react-router-dom';

const SideBarRegistration = () => {
  // ดึง query parameter id จาก URL ปัจจุบัน
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');

  // ฟังก์ชันช่วยต่อ query id เข้าไปใน URL
  const withId = (path) => id ? `${path}?id=${id}` : path;

  return (
    <div className='flex flex-col font-light rounded-lg shadow-md'>
      <a href={withId("/DetailRegistration")} className="bg-[#E0E0E0] border-b border-white rounded-t-md py-3 px-4 hover:bg-gray-300 transition-colors duration-200">
        หน้าเเรก
      </a>
      <a href={withId("/Examinationpage")} className="bg-[#E0E0E0] border-b-2 border-white py-3 px-4 hover:bg-gray-300 transition-colors duration-200">
        สมัครสอบ
      </a>
      <a href={withId("/")} className="bg-[#E0E0E0] border-b-2 border-white py-3 px-4 hover:bg-gray-300 transition-colors duration-200">
        ตรวจสอบสถานะการสมัครสอบ
      </a>
      <a href={withId("/RegisterPrint")} className="bg-[#E0E0E0] border-b-2 border-white py-3 px-4 hover:bg-gray-300 transition-colors duration-200">
        พิมพ์ใบสมัคร
      </a>
      <a href={withId("/")} className="bg-[#E0E0E0] border-b-2 border-white py-3 px-4 hover:bg-gray-300 transition-colors duration-200">
        พิมพ์บัตรประจำตัวผู้เข้าสอบ
      </a>
      <a href={withId("/")} className="bg-[#E0E0E0] border-b-2 border-white py-3 px-4 hover:bg-gray-300 transition-colors duration-200">
        ดาวน์โหลดไฟล์ผู้สมัครสอบ
      </a>
      <a href={withId("/")} className="bg-[#E0E0E0] border-b-2 border-white py-3 px-4 hover:bg-gray-300 transition-colors duration-200">
        สารพันปัญหา
      </a>
      <a href={withId("/")} className="bg-[#E0E0E0] border-white rounded-b-md py-3 px-4 hover:bg-gray-300 transition-colors duration-200">
        ตรวจสอบคุณวุฒิตามที่ ก.พ. รับรอง
      </a>
    </div>
  );
};

export default SideBarRegistration;
