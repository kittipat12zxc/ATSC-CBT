import React, { useState, useEffect } from 'react';
import Rsalogo from './RegistrationSystemAdminImg/RSAlogo.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

function RegistrationSystemAdmin() {

  // เอาโลโก้มาใช้
  const RsaLogoIcon = ({ className }) => (
    <img src={Rsalogo} alt="RSA Logo" className={className} />
  );

  // ไอคอนรูปคน
  const UserIcon = ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );
  // รับข้อมูลจาก backend เอามาใส่ใน data
  const [data, setData] = useState([]);


  // ดึง data มาจาก backend 
  useEffect(() => {  
    axios
      .get('http://localhost:5000/api/admin/registrationsystemadmin')
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data from RegistrationSystem backend", error);
      });
  }, []);

  return (
    <div className='max-w-[97%] mx-auto mt-[30px] w-full font-sans text-gray-800'>
      {/* Header ของ ระบบสมัครสอบ */}
      <div className='flex items-center border-b-4 border-black pb-4'>
        <RsaLogoIcon className="h-12 w-12" />
        <h1 className='text-[25px] ml-[10px]'>ระบบสมัครสอบ</h1>
      </div>

      {/* เอาไว้โชว์ รหัสการสอบ เเละ ชื่อชุดข้อสอบ */}
      <main className='max-w-[95%] mx-auto mt-[80px] w-full'>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data.map((exam) => (
            <Link to={`/TestRegis/${exam.examination_id}`} key={exam.examination_id}>
            <div className="bg-gradient-to-r from-[#0a183d] to-[#1e3a8a] text-white rounded-xl shadow-lg p-5 flex items-center space-x-4">
              <div className="flex-shrink-0">
                <UserIcon className="h-12 w-12 text-white/90" />
              </div>
              <div>
                 <p className="text-xl font-bold">
                  รหัสการสอบ : {exam.examination_id}
                </p>
                <p className="text-sm text-white/80">
                  ชื่อชุดข้อสอบ : {exam.exam_set_name}
                </p>
              </div>
            </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

export default RegistrationSystemAdmin;
