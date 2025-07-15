import React from 'react';

// ไอคอนสำหรับใช้ในส่วนข้อควรระวัง (เป็นทางเลือก)
const AlertTriangle = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-2 text-yellow-500">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);


const ApplicationPage = () => {
  // รายการเมนูด้านซ้าย
  const menuItems = [
    { name: 'สมัครสอบ', active: true },
    { name: 'ตรวจสอบสถานะการสมัครสอบ', active: false },
    { name: 'พิมพ์ใบสมัคร', active: false },
    { name: 'พิมพ์บัตรประจำตัวผู้เข้าสอบ', active: false },
    { name: 'ดาวน์โหลดไฟล์ผู้สมัครสอบ', active: false },
    { name: 'สารพันปัญหา', active: false },
    { name: 'ตรวจสอบคุณวุฒิตามที่ ก.พ.รับรอง', active: false },
  ];

  // ขั้นตอนการสมัคร
  const steps = [
    { number: 1, text: 'กรอกข้อมูลส่วนตัว', imageSrc: 'https://la-orutis.dusit.ac.th/wp-content/uploads/2025/07/1-1.png' },
    { number: 2, text: 'อัปโหลดเอกสาร', imageSrc: 'https://la-orutis.dusit.ac.th/wp-content/uploads/2025/07/2-1.png' },
    { number: 3, text: 'ตรวจสอบข้อมูล', imageSrc: 'https://la-orutis.dusit.ac.th/wp-content/uploads/2025/07/3-1.png' },
    { number: 4, text: 'ชำระเงิน', imageSrc: 'https://la-orutis.dusit.ac.th/wp-content/uploads/2025/07/4-1.png' },
  ];

  return (
    <div className="min-h-screen w-full bg-slate-50 p-4 sm:p-6 md:p-8 font-sans">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ========== Left Sidebar ========== */}
        {/*ส่วนของbarที่อยู่กับฟลุ๊ค */}
     
        {/* ========== Right Content ========== */}
        <main className="lg:col-span-9 flex flex-col gap-8">
          
          {/* ----- Steps Section ----- */}
          <section className="bg-white rounded-lg shadow">
            <h2 className="bg-custom-blue text-white p-3 rounded-t-lg font-semibold text-lg"> {/* <--- เปลี่ยนแล้ว */}
              ขั้นตอนการสมัครสอบ
            </h2>
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap justify-around items-start gap-8 text-center">
                {steps.map((step) => (
                  <div key={step.number} className="flex flex-col items-center gap-3">
                    <div className="relative w-32 h-32">
                      <div className="absolute top-0 left-0 bg-custom-blue text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg z-10"> {/* <--- เปลี่ยนแล้ว */}
                        {step.number}
                      </div>
                      <div className="w-full h-full rounded-full border-4 border-custom-blue flex items-center justify-center bg-slate-100 overflow-hidden"> {/* <--- เปลี่ยนแล้ว */}
                        {step.imageSrc ? (
                          <img src={step.imageSrc} alt={step.text} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-4xl font-bold text-slate-500">1:1</span>
                        )}
                      </div>
                    </div>
                    <p className="font-medium text-slate-600">{step.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ----- Precautions Section ----- */}
          <section className="bg-white rounded-lg shadow">
            <h2 className="bg-custom-blue text-white p-3 rounded-t-lg font-semibold text-lg flex items-center"> {/* <--- เปลี่ยนแล้ว */}
              <AlertTriangle />
              ข้อควรระวัง!
            </h2>
            <div className="p-6 md:p-8">
              <ol className="list-decimal list-inside space-y-2 text-slate-700">
                <li>กรุณาตรวจสอบข้อมูลให้ถูกต้องก่อนกด "สมัครสอบ"</li>
                <li>ชื่อและนามสกุลต้องตรงกับบัตรประชาชน</li>
                <li>ไฟล์รูปถ่ายต้องเป็นไปตามข้อกำหนด</li>
                <li>อ่านระเบียบการสมัครสอบอย่างละเอียด</li>
                <li>ระบบจะปิดรับสมัครตามวันและเวลาที่กำหนด</li>
                <li>บันทึกใบสมัครและบัตรประจำตัวผู้เข้าสอบไว้เป็นหลักฐาน</li>
              </ol>
            </div>
          </section>

          {/* ----- Action Button ----- */}
          <div className="flex justify-end mt-4">
            <button className="bg-custom-blue text-white font-semibold px-10 py-3 rounded-lg hover:bg-custom-blue-dark transition-colors duration-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-custom-blue-light"> {/* <--- เปลี่ยนแล้ว */}
              สมัครสอบ
            </button>
          </div>

        </main>
      </div>
    </div>
  );
};

export default ApplicationPage;