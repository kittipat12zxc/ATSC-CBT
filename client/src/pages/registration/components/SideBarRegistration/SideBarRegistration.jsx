import React from 'react'
import { NavLink } from 'react-router-dom';

const SideBarRegistration = () => {
  return (
    <div className='flex flex-col font-light rounded-lg shadow-md'>
      <NavLink
        to="/DetailRegistration"
        className={({ isActive }) =>
          `py-3 px-4 border-b border-white transition-colors duration-200 ${isActive ? 'bg-[#082290] text-white' : 'bg-[#E0E0E0] hover:bg-gray-300'
          } rounded-t-md`
        }
      >
        หน้าแรก
      </NavLink>

      <NavLink
        to="/Examinationpage"
        className={({ isActive }) =>
          `py-3 px-4 border-b border-white transition-colors duration-200 ${isActive ? 'bg-[#082290] text-white' : 'bg-[#E0E0E0] hover:bg-gray-300'
          } `
        }
      >
        สมัครสอบ
      </NavLink>

      <NavLink
        to="/"
        className={({ isActive }) =>
          `py-3 px-4 border-b border-white transition-colors duration-200 ${isActive ? 'bg-[#082290] text-white' : 'bg-[#E0E0E0] hover:bg-gray-300'
          } `
        }
      >
        ตรวจสอบสถานะการสมัครสอบ
      </NavLink>

      <NavLink
        to="/RegisterPrint"
        className={({ isActive }) =>
          `py-3 px-4 border-b border-white transition-colors duration-200 ${isActive ? 'bg-[#082290] text-white' : 'bg-[#E0E0E0] hover:bg-gray-300'
          } `
        }
      >
        พิมพ์ใบสมัคร
      </NavLink>

      <NavLink
        to="/"
        className={({ isActive }) =>
          `py-3 px-4 border-b border-white transition-colors duration-200 ${isActive ? 'bg-[#082290] text-white' : 'bg-[#E0E0E0] hover:bg-gray-300'
          } `
        }
      >
        พิมพ์บัตรประจำตัวผู้เข้าสอบ
      </NavLink>

      <NavLink
        to="/"
        className={({ isActive }) =>
          `py-3 px-4 border-b border-white transition-colors duration-200 ${isActive ? 'bg-[#082290] text-white' : 'bg-[#E0E0E0] hover:bg-gray-300'
          } `
        }
      >
        ดาวน์โหลดไฟล์ผู้สมัครสอบ
      </NavLink>

      <NavLink
        to="/"
        className={({ isActive }) =>
          `py-3 px-4 border-b border-white transition-colors duration-200 ${isActive ? 'bg-[#082290] text-white' : 'bg-[#E0E0E0] hover:bg-gray-300'
          } `
        }
      >
        สารพันปัญหา
      </NavLink>

      <NavLink
        to="/"
        className={({ isActive }) =>
          `py-3 px-4 transition-colors duration-200 ${isActive ? 'bg-[#082290] text-white' : 'bg-[#E0E0E0] hover:bg-gray-300'
          } rounded-b-md`
        }
      >
        ตรวจสอบคุณวุฒิตามที่ ก.พ. รับรอง
      </NavLink>
    </div>
  )
}

export default SideBarRegistration