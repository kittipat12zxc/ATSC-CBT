// Component
import Layout from "../../Components/layout/layout";

export default function Serve() {
  return (
    <div className="font-sarabun">
        <Layout>
        <div className="my-8 mx-auto bg-white w-[90%] max-w-[1200px] shadow-md p-1 flex flex-col">
          {/* Header */}
          <div className="flex flex-col md:flex-row m-2 mt-2 p-6 items-center justify-between bg-[#368bc1] text-white">
            <div className="text-center md:text-left">
              <h1 className="font-extrabold text-5xl pb-4 text-center">SDU-Computer-Base-Testing</h1>
              <h5 className="text-lg text-center  p-4">
                ให้คุณสร้างและจัดการแบบทดสอบออนไลน์ได้อย่างง่ายดาย
                รองรับทุกประเภทของข้อสอบ พร้อมระบบตรวจสอบผลคะแนนอัตโนมัติ
              </h5>
            </div>
            <div className="text-center">
              <img
                src='/images/Icon3D_Flie.png'
                alt="Icon3DFlie"
                className="h-[25rem] w-auto mr-4 animate-bounceCustom"
              />
            </div>
          </div>

          {/* Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
            <div className="p-2 shadow-md rounded-md">
              <i className="fa fa-clipboard text-2xl text-[#368bc1] pb-4"></i>
              <h2 className="text-xl font-extrabold pb-4">สร้างบัญชีผู้ใช้</h2>
              <ul className="list-disc list-inside">
                <li className="pb-2 [text-indent:-1.5em] pl-6 leading-relaxed">สร้างบัญชีผู้ใช้ได้หลายรูปแบบ (Admin, Teacher, Student)</li>
                <li className="pb-2 [text-indent:-1.5em] pl-6 leading-relaxed">รองรับการกำหนดสิทธิ์การเข้าถึง</li>
              </ul>
            </div>

            <div className="p-2 shadow-md rounded-md">
              <i className="fa fa-television text-2xl text-[#368bc1] pb-4"></i>
              <h2 className="text-xl font-extrabold pb-4">ระบบตรวจข้อสอบอัตโนมัติ</h2>
              <ul className="list-disc list-inside">
                <li className="pb-2 [text-indent:-1.5em] pl-6 leading-relaxed">แสดงผลคะแนนทันทีหลังสอบเสร็จ</li>
                <li className="pb-2 [text-indent:-1.5em] pl-6 leading-relaxed">วิเคราะห์ผลสอบรายบุคคลและสรุปผลสอบรายกลุ่มในรูปแบบกราฟ</li>
                <li className="pb-2 [text-indent:-1.5em] pl-6 leading-relaxed">ดาวน์โหลดผลสอบเป็นไฟล์ PDF, Excel, หรือ Google Sheets</li>
              </ul>
            </div>

            <div className="p-2 shadow-md rounded-md">
              <i className="fa fa-tablet text-2xl text-[#368bc1] pb-4"></i>
              <h2 className="text-xl font-extrabold pb-4">รองรับการใช้งานหลายอุปกรณ์</h2>
              <ul className="list-disc list-inside">
                <li className="pb-2 [text-indent:-1.5em] pl-6 leading-relaxed">ใช้งานได้ทั้งบนคอมพิวเตอร์ แท็บเล็ต และมือถือ</li>
                <li className="pb-2 [text-indent:-1.5em] pl-6 leading-relaxed">ระบบเป็น Web-Based รองรับทุกเบราว์เซอร์</li>
                <li className="pb-2 [text-indent:-1.5em] pl-6 leading-relaxed">ใช้งานง่าย รองรับ UI ภาษาไทยและภาษาอังกฤษ</li>
              </ul>
            </div>

            <div className="p-2 shadow-md rounded-md">
              <i className="fa fa-shield text-2xl text-[#368bc1] pb-4"></i>
              <h2 className="text-xl font-extrabold pb-4">ป้องกันการโกง</h2>
              <ul className="list-disc list-inside">
                <li className="pb-2 [text-indent:-1.5em] pl-6 leading-relaxed">ระบบตรวจจับการสลับหน้าจอและบันทึกวิดีโอขณะสอบ</li>
                <li className="pb-2 [text-indent:-1.5em] pl-6 leading-relaxed">สุ่มคำถามและสลับตัวเลือกคำตอบอัตโนมัติ</li>
                <li className="pb-2 [text-indent:-1.5em] pl-6 leading-relaxed">ปิดการคัดลอกและวาง</li>
                <li className="pb-2 [text-indent:-1.5em] pl-6 leading-relaxed">กำหนดสิทธิ์การเข้าถึงข้อสอบ</li>
              </ul>
            </div>

            <div className="p-2 shadow-md rounded-md">
              <i className="fa fa-user text-2xl text-[#368bc1] pb-4"></i>
              <h2 className="text-xl font-extrabold pb-4">รองรับองค์กรและสถานศึกษา</h2>
              <ul className="list-disc list-inside">
                <li className="pb-2 [text-indent:-1.5em] pl-6 leading-relaxed">สถานศึกษา : ใช้จัดสอบออนไลน์และข้อสอบประเมินผล</li>
                <li className="pb-2 [text-indent:-1.5em] pl-6 leading-relaxed">องค์กร : ใช้สำหรับการฝึกอบรมพนักงานและทดสอบความรู้</li>
                <li className="pb-2 [text-indent:-1.5em] pl-6 leading-relaxed">ติวเตอร์ : ใช้สร้างแบบทดสอบเพื่อวัดผลนักเรียน</li>
              </ul>
            </div>

            <div className="p-2 shadow-md rounded-md">
              <i className="fa fa-link text-2xl text-[#368bc1] pb-4"></i>
              <h2 className="text-xl font-extrabold pb-4">เชื่อมต่อกับระบบอื่นๆ</h2>
              <ul className="list-disc list-inside">
                <li className="pb-2 [text-indent:-1.5em] pl-6 leading-relaxed">
                  รองรับ การเชื่อมต่อกับระบบ LMS เช่น Moodle, Google Classroom
                </li>
                <li className="pb-2 [text-indent:-1.5em] pl-6 leading-relaxed">
                  รองรับ API เชื่อมต่อกับแพลตฟอร์มภายนอก สำหรับการจัดเก็บข้อมูล
                </li>
                <li className="pb-2 [text-indent:-1.5em] pl-6 leading-relaxed">
                    ระบบสามารถส่งผลคะแนนไปยังอีเมลหรือฐานข้อมูลภายนอกได้
                </li>
              </ul>
            </div>
          </div>
        </div>
        </Layout>
    </div>
  );
}
