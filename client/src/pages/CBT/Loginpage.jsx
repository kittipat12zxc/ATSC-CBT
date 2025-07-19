import React from 'react';

// สร้าง component ชื่อ LoginPage
export default function LoginPage() {
  return (
    // ครอบทั้งหมดด้วย div ที่มีความกว้าง 100% และความสูงเต็มหน้าจอ (100vh)
    // ใช้ flex จัดตำแหน่งให้กล่อง login อยู่กลางหน้าจอ
    // พื้นหลังเป็นไล่เฉดจากฟ้าไปน้ำเงินอ่อน
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-sky-400 to-blue-100">

      {/* กล่อง login สีขาว มีเงา ขอบมน และมี padding */}
      <div className="bg-white shadow-xl rounded-md px-10 py-8 w-96">

        {/* หัวข้อ "เข้าสู่ระบบ" มีพื้นหลังน้ำเงิน ตัวอักษรสีขาว อยู่ตรงกลาง */}
        <h2 className="text-center text-xl font-bold text-black bg-white py-2 mb-6 rounded">
          เข้าสู่ระบบ
        </h2>

        {/* ส่วนกรอกชื่อผู้ใช้ */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">รหัสผู้เข้าสอบ</label>

          {/* ช่อง input พร้อมไอคอนด้านซ้าย */}
          <div className="flex items-center border rounded bg-gray-100">
            <span className="px-3 text-gray-600">
              <i className="fas fa-user" /> {/* ไอคอนผู้ใช้ */}
            </span>
            <input
              type="text"
              placeholder="ป้อนรหัสผู้เข้าสอบ"
              className="flex-1 py-2 px-2 bg-transparent focus:outline-none"
            />
          </div>
        </div>

        {/* ส่วนกรอกรหัสผ่าน */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-1">รหัสผ่าน</label>

          {/* ช่อง input พร้อมไอคอนแม่กุญแจ */}
          <div className="flex items-center border rounded bg-gray-100">
            <span className="px-3 text-gray-600">
              <i className="fas fa-lock" /> {/* ไอคอนรหัสผ่าน */}
            </span>
            <input
              type="password"
              placeholder="ป้อนรหัสผ่าน"
              className="flex-1 py-2 px-2 bg-transparent focus:outline-none"
            />
          </div>
        </div>

        {/* ปุ่มเข้าสู่ระบบ */}
        <button className="w-full bg-white text-blue-700 border border-blue-700 font-semibold py-2 rounded hover:bg-blue-100 transition">
          เข้าสู่ระบบ
        </button>
      </div>
    </div>
  );
}
