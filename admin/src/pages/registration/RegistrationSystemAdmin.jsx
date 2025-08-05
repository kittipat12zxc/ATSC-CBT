import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import LeftSideBarAdmin from '../../components/LeftSideBarAdmin';

function RegistrationSystemAdmin() {

  const UserIcon = ({ className }) => ( // ไอค่อนโลโก้
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );

  const [data, setData] = useState([]); // เอาไว้รับค่าจาก backend

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/admin/registrationsystemadmin')
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log("Error fetching data from RegistrationSystem backend", error);
      });
  }, []);

  const colorShade = [ // รับค่าสีทีไปเเสดงใน card 
    "from-teal-400 via-teal-200 to-teal-100",
    "from-pink-400 via-pink-300 to-pink-100",
    "from-green-400 via-green-300 to-green-100",
    "from-rose-400 via-rose-300 to-rose-100"
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      <LeftSideBarAdmin />

      <main className="ml-80 p-6 font-sans text-gray-800">
        <div className='max-w-[97%] mx-auto mt-[30px] w-full font-sans text-gray-800'>
          {/* Header ของ ระบบสมัครสอบ */}
          <div className='flex items-center border-b-4 border-black pb-4'>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-person-lines-fill" viewBox="0 0 16 16">
              <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z" />
            </svg>
            <h1 className='text-[25px] ml-[10px]'>ระบบสมัครสอบ</h1>
          </div>

          {/* แสดงรายการสอบ */}
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8">
            {data.map((exam, index) => (
              <Link to={`/admin/list-of-names/${exam.examination_id}`} key={exam.examination_id}>
                <div className={`bg-gradient-to-r ${colorShade[index]} text-white rounded-xl shadow-lg p-5 flex items-center space-x-4`}>
                  <div className="flex-shrink-0">
                    <UserIcon className="h-12 w-12 text-white/90" />
                  </div>
                  <div>
                     <p className="text-xl font-bold ">
                      ชื่อชุดข้อสอบ : {exam.exam_set_name}
                    </p>
                    <p className="text-sm text-white/80">
                      รหัสการสอบ : {exam.examination_id}
                    </p>
                   
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default RegistrationSystemAdmin;
