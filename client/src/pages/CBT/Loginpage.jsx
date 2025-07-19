import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Form } from 'antd';
import axios from 'axios';

import CustomAlert from './components/Customalert';

// สร้าง component ชื่อ LoginPage
export default function LoginPage() {
    const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const [form] = Form.useForm(); // Use Ant Design's Form hook
  const navigate = useNavigate(); // ✅ Hooks อยู่ใน Component หลัก
  const [alertData, setAlertData] = useState(null);

  const onFinish = async (values) => {
    try {
        const res = await axios.post('http://localhost:5000/api/cbt/validatePassword', values);
        console.log("ข้อมูลที่ได้รับจากเซิร์ฟเวอร์:", res.data.data);

        const [user] = res.data.data;
        console.log("ExaminationID: ",user?.ExaminationID)
        const ExaminationID = user?.ExaminationID;
        const ExamineeID = user?.ExamineeID
        const Status = user?.Status;

        if (user?.Validation) {
          if(Status === "pending") {
            sessionStorage.setItem("ExaminationID", ExaminationID);
            sessionStorage.setItem("ExamineeID", ExamineeID);
            
            navigate("/startingtest", { 
              state: { 
                ExaminationID ,
                ExamineeID
              }
            })
          } else {
            setAlertData({
              title: "คุณได้ทำข้อสอบไปแล้ว",
              message: "ระบบได้ทำการบันทึกคำตอบเรียบร้อยแล้ว",
            });
            return;
          }
        } else {
          // กรณีรหัสผ่านไม่ถูกต้อง
          setErrorMessage("รหัสผ่าน หรือ รหัสผู้เข้าสอบไม่ถูกต้อง โปรดกรุณาลองใหม่อีกครั้ง"); // ตั้งค่าข้อความ error
          form.resetFields();
          form.setFieldsValue({ ExamineeID: '', Password: '' });
        }
    } catch (error) {
      console.error('Error:', error.message);
      setErrorMessage('An error occurred, please try again later');
      form.resetFields(); // รีเซ็ตฟอร์ม Ant Design ในกรณี error
      form.setFieldsValue({ ExamineeID: '', Password: '' });
    }   
  };

  return (
    // ครอบทั้งหมดด้วย div ที่มีความกว้าง 100% และความสูงเต็มหน้าจอ (100vh)
    // ใช้ flex จัดตำแหน่งให้กล่อง login อยู่กลางหน้าจอ
    // พื้นหลังเป็นไล่เฉดจากฟ้าไปน้ำเงินอ่อน
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-sky-400 to-blue-100">
      <Form form={form} onFinish={onFinish}>
        {/* กล่อง login สีขาว มีเงา ขอบมน และมี padding */}
        <div className="bg-white shadow-xl rounded-md px-10 py-8 w-96">

          {/* หัวข้อ "เข้าสู่ระบบ" มีพื้นหลังน้ำเงิน ตัวอักษรสีขาว อยู่ตรงกลาง */}
          <h2 className="text-center text-xl font-bold text-black bg-white py-2 mb-6 rounded">
            เข้าสู่ระบบ
          </h2>

          {/* ส่วนกรอกชื่อผู้ใช้ */}
          <Form.Item name="ExamineeID" rules={[{required: true,message: 'กรุณากรอกรหัสผู้เข้าสอบ !',},]}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">รหัสผู้เข้าสอบ</label>

              {/* ช่อง input พร้อมไอคอนด้านซ้าย */}
              <div className="flex items-center border rounded bg-gray-100">
                <span className="px-1 text-gray-600">
                  <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clip-rule="evenodd"/>
                  </svg>
                  {/* ไอคอนผู้ใช้ */}
                </span>
                <input
                  type="text"
                  id="username"
                  placeholder="ป้อนรหัสผู้เข้าสอบ"
                  className="flex-1 py-2 px-2 bg-transparent focus:outline-none"
                  required
                  onChange={() => setErrorMessage('')}
                />
              </div>
            </div>
          </Form.Item>
          {/* ส่วนกรอกรหัสผ่าน */}
          <Form.Item name="Password" rules={[{required: true,message: 'กรุณากรอกรหัสผ่าน !',},]}>
            <div className="mb-0">
              <label className="block text-gray-700 mb-1">รหัสผ่าน</label>

              {/* ช่อง input พร้อมไอคอนแม่กุญแจ */}
              <div className="flex items-center border rounded bg-gray-100">
                <span className="px-1 text-gray-600">
                  <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z" clip-rule="evenodd"/>
                  </svg>
                </span>
                <input
                  type="password"
                  id="password"
                  placeholder="ป้อนรหัสผ่าน"
                  className="flex-1 py-2 px-2 bg-transparent focus:outline-none"
                  required
                  onChange={() => setErrorMessage('')}
                />
              </div>
            </div>
          </Form.Item>

          {errorMessage && ( // Conditional rendering for error message
            <div className="text-red-600 mt-2 mb-2 text-center">
              ⚠️ {errorMessage}
            </div>
          )}

          {/* ปุ่มเข้าสู่ระบบ */}
          <Form.Item>
            <button className="mt-2 w-full bg-white text-blue-700 border border-blue-700 font-semibold py-2 rounded hover:bg-blue-100 transition">
              เข้าสู่ระบบ
            </button>

            {alertData && (
              <CustomAlert
                title={alertData.title}
                message={alertData.message}
                onClose={() => setAlertData(null)}
              />
            )}
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}
