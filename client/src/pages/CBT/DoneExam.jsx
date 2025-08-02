import React, { useEffect } from "react";
import SDULogo from './images/SDULOGOS.png'

const DoneExam = () => {
    const ExaminationName = sessionStorage.getItem("ExaminationName");

        // ✅ ป้องกันการย้อนกลับ
    useEffect(() => {
        window.history.pushState(null, "", window.location.href);
    
        const handlePopState = () => {
            window.history.pushState(null, "", window.location.href);
        };
    
        window.addEventListener("popstate", handlePopState);
    
        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, []);
  return (
    // ไว้จัดกึงกลาง container
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-['Sarabun']">
      
      {/* Main การ์ด */}
      <div className="w-[90%] max-w-lg p-10 m-5 text-center bg-white rounded-xl shadow-lg">
        
        {/* โลโก้ สำเร็จ ติ๊กถูก */}
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-5 bg-green-100 rounded-full">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-8 h-8 text-green-600" 
            fill="currentColor" 
            viewBox="0 0 16 16"
          >
            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
          </svg>
        </div>
        
        {/* หัวข้อหลัก */}
        <h1 className="mb-2 text-2xl font-bold text-gray-800">
          บันทึกคำตอบเรียบร้อยแล้ว
        </h1>
        
        {/* หัวข้อรอง */}
        <p className="mb-8 text-base text-gray-600">
          แบบทดสอบ: {ExaminationName}
        </p>
        
        {/* ปุ่มกดกลับไปหน้า... */}
        <a 
          href="/"
          className="inline-block px-7 py-3 font-medium text-white bg-blue-600 rounded-lg shadow-sm transition-all duration-200 hover:bg-blue-700 hover:-translate-y-0.5"
        >
          ย้อนกลับไปหน้าหลัก
        </a>
        
        {/* ฟุตเตอร์ */}
        <p className="mt-8 text-xs leading-relaxed text-gray-400">
          แบบทดสอบนี้ถูกสร้างขึ้นมาโดย มหาวิทยาลัยสวนดุสิต <br/>
          คณะวิทยาศาสตร์และเทคโนโลยี สาขาวิชาวิทยาการคอมพิวเตอร์
        </p>

        <div className='w-[100%] flex items-center justify-center mt-[20px]'>
            <img className='h-auto w-[20%] object-cover' src={SDULogo} alt="" />
        </div>

      </div>
    </div>
  );
};

export default DoneExam;