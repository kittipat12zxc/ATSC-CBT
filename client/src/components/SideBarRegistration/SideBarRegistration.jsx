import React from 'react'

const SideBarRegistration = () => {
  return (
    <div className='flex flex-col font-light rounded-lg shadow-md'>
        
              <a href="/DetailRegistration" className="bg-[#E0E0E0] border-b border-white rounded-t-md py-3 px-4 hover:bg-gray-300 transition-colors duration-200">
                  หน้าเเรก
                </a>
                <a href="/Examinationpage" className="bg-[#E0E0E0] border-b-2 border-white py-3 px-4 hover:bg-gray-300 transition-colors duration-200">
                  สมัครสอบ
                </a>

                <a href="/" className="bg-[#E0E0E0] border-b-2 border-white py-3 px-4 hover:bg-gray-300 transition-colors duration-200">
                  ตรวจสอบสถานะการสมัครสอบ
                </a>

                <a href="/" className="bg-[#E0E0E0] border-b-2 border-white py-3 px-4 hover:bg-gray-300 transition-colors duration-200">
                  พิมพ์ใบสมัคร
                </a>

                <a href="/" className="bg-[#E0E0E0] border-b-2 border-white py-3 px-4 hover:bg-gray-300 transition-colors duration-200">
                  พิมพ์บัตรประจำตัวผู้เข้าสอบ
                </a>

                <a href="/" className="bg-[#E0E0E0] border-b-2 border-white py-3 px-4 hover:bg-gray-300 transition-colors duration-200">
                  ดาวน์โหลดไฟล์ผู้สมัครสอบ
                </a>

                <a href="/" className="bg-[#E0E0E0] border-b-2 border-white py-3 px-4 hover:bg-gray-300 transition-colors duration-200">
                  สารพันปัญหา
                </a>

                <a href="/" className="bg-[#E0E0E0] border-white rounded-b-md py-3 px-4 hover:bg-gray-300 transition-colors duration-200">
                  ตรวจสอบคุณวุฒิตามที่ ก.พ. รับรอง
                </a>
            </div>
  )
}

export default SideBarRegistration