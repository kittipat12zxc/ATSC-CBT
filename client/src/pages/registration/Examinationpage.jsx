import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom'; // เพิ่ม useSearchParams
import SideBarRegistration from './components/SideBarRegistration/SideBarRegistration';
import Header from '../../components/Header/PCHeader';
import Footer from '../../components/Footer/Footer';

const AlertTriangle = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-2 text-yellow-500">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const ApplicationPage = () => {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);

  // อ่าน query param id
  const [searchParams] = useSearchParams();
  const idParam = searchParams.get('id'); // string หรือ null

  useEffect(() => {
    fetch('http://localhost:5000/api/examinations')
      .then(res => res.json())
      .then(data => setExams(data))
      .catch(err => console.error('Error fetching exams:', err));
  }, []);

  // หาข้อมูลสอบที่ตรงกับ idParam
  const selectedExam = exams.find(exam => exam.examination_id.toString() === idParam);

  // ขั้นตอนสมัครเหมือนเดิม
  const steps = [
    { number: 1, text: 'กรอกข้อมูลส่วนตัว', imageSrc: 'https://la-orutis.dusit.ac.th/wp-content/uploads/2025/07/1-1.png' },
    { number: 2, text: 'อัปโหลดเอกสาร', imageSrc: 'https://la-orutis.dusit.ac.th/wp-content/uploads/2025/07/2-1.png' },
    { number: 3, text: 'ตรวจสอบข้อมูล', imageSrc: 'https://la-orutis.dusit.ac.th/wp-content/uploads/2025/07/3-1.png' },
    { number: 4, text: 'ชำระเงิน', imageSrc: 'https://la-orutis.dusit.ac.th/wp-content/uploads/2025/07/4-1.png' },
  ];

  return (
    <>
      <Header />
      <div className="w-full min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="flex flex-col md:flex-row md:gap-x-8">
            <div className="w-full md:w-[30%] mb-8 md:mb-0">
              <SideBarRegistration />
            </div>
            <main className="w-full md:w-[70%]">
              <section className="bg-white rounded-lg shadow">
                <h2 className="bg-custom-blue text-white p-3 rounded-t-lg font-semibold text-lg">
                  ขั้นตอนการสมัครสอบ
                </h2>
                <div className="p-6 md:p-8">
                  <div className="flex flex-wrap justify-around items-start gap-8 text-center">
                    {steps.map(step => (
                      <div key={step.number} className="flex flex-col items-center gap-3">
                        <div className="relative w-32 h-32">
                          <div className="absolute top-0 left-0 bg-custom-blue text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg z-10">
                            {step.number}
                          </div>
                          <div className="w-full h-full rounded-full border-4 border-custom-blue flex items-center justify-center bg-slate-100 overflow-hidden">
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

              <section className="bg-white rounded-lg shadow mt-6">
                <h2 className="bg-custom-blue text-white p-3 rounded-t-lg font-semibold text-lg flex items-center">
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

              <div className="flex justify-end mt-6">
                {selectedExam ? (
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={() => navigate(`/applyexam?id=${selectedExam.examination_id}`)}
                  >
                    สมัครสอบ
                  </button>
                ) : (
                  <p className="text-red-600">ไม่พบข้อมูลการสอบที่ระบุ</p>
                )}
              </div>
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ApplicationPage;
