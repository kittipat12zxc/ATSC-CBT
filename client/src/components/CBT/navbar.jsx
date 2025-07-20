import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full">
      {/* Top Section */}
      <div className="flex items-center p-4 bg-white">
        <section className="mr-6">
          <img src='/images/LogoSDU.png' alt="Logo SDU" className="h-20 w-auto" />
        </section>
        <section className="text-[#a08a3a] font-bold">
          <h1 className="text-xl m-0">SDU-Computer Base Testing</h1>
          <p className="text-lg m-0">มหาวิทยาลัยสวนดุสิต</p>
        </section>
      </div>

      {/* Bottom Section */}
      <div className="bg-[#368bc1]">
        <ul className="flex justify-center list-none py-4">
          <li>
            <Link
              to="/"
              className="font-bold text-white px-8 py-4 rounded hover:bg-white hover:text-[#368bc1] hover:shadow transition-colors duration-300 ease-in-out"
            >
              หน้าหลัก
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="font-bold text-white px-8 py-4 rounded hover:bg-white hover:text-[#368bc1] hover:shadow transition-colors duration-300 ease-in-out"
            >
              ตรวจสอบสถานะ
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="font-bold text-white px-8 py-4 rounded hover:bg-white hover:text-[#368bc1] hover:shadow transition-colors duration-300 ease-in-out"
            >
              ตรวจสอบผลการสอบ
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="font-bold text-white px-8 py-4 rounded hover:bg-white hover:text-[#368bc1] hover:shadow transition-colors duration-300 ease-in-out"
            >
              ติดต่อหน่วยงาน
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="font-bold text-white px-8 py-4 rounded hover:bg-white hover:text-[#368bc1] hover:shadow transition-colors duration-300 ease-in-out"
            >
              บริการ
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
