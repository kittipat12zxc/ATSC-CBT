import React, { useState } from "react";
import Header from "../../components/Header/PCHeader";
import Footer from "../../components/Footer/Footer";
import SideBarRegistration from "./components/SideBarRegistration/SideBarRegistration";
import axios from "axios";
import ATSCLogo from "../../assets/atsc.png";
import Juthawut from "../../assets/Juthawut.jpg";

function PrintExam() {
  const [thaiId, setThaiId] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    console.log("Searching for:", thaiId);
    try {
      const res = await axios.get(
        `http://localhost:5001/api/PrintExam/search/${thaiId.trim()}`
      );
      setData(res.data);
      setError("");
    } catch (err) {
      setData(null);
      if (err.response?.status === 404) {
        setError("ไม่พบข้อมูลผู้เข้าสอบ");
      } else {
        setError("เกิดข้อผิดพลาดในการดึงข้อมูล");
      }
    }
  };

  return (
    <>
      <div className="ForPrintHidden">
        <Header />
        <div className="w-full min-h-screen bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <div className="flex flex-col md:flex-row md:gap-x-8">
              {/* ========== Left Sidebar ========== */}
              <div className="w-full md:w-[30%] mb-8 md:mb-0">
                <SideBarRegistration />
              </div>

              {/* ========== Right Content ========== */}
              <main className="w-full md:w-[70%]">
                <h1 className="bg-[#082290] text-white inline-block text-[1.5rem] p-3 font-normal ">
                  พิมพ์บัตรประจำตัวผู้เข้าสอบ
                </h1>
                <div className="bg-gray-200 mt-[-2rem] rounded-[5px] shadow-lg pt-[2rem]">
                  <div className="flex flex-col p-[2rem]">
                    <label htmlFor="" className="text-[1.2rem]">
                      เลขบัตรประจำตัวประชาชน
                    </label>
                    <input
                      type="text"
                      placeholder="กรอกเลขบัตรประชาชน"
                      value={thaiId}
                      onChange={(e) => setThaiId(e.target.value)}
                      className="w-[30rem] border-2 border-gray-300 rounded-[5px] text-[1.5rem] outline-none text-gray-500 pl-[1rem]"
                    />
                    <br />

                    <button
                      onClick={handleSearch}
                      className="self-start  text-[1.2rem] bg-[#082290] text-white rounded-full px-6 py-[2px] hover:bg-[#0a2fa8] transition-colors duration-200"
                    >
                      ยืนยัน
                    </button>
                    {/* แสดง error ถ้ามี */}
                    {error && (
                      <p style={{ color: "red", marginTop: "8px" }}>{error}</p>
                    )}
                  </div>
                </div>

                <div className="w-full  sm:w-[100%] mt-[2rem] overflow-x-auto">
                  <table className="min-w-[600px] w-full border border-gray-300 rounded-[5px] overflow-hidden text-sm sm:text-base">
                    <thead className="bg-[#082290] text-white text-left whitespace-nowrap">
                      <tr>
                        <th className="px-4 py-2 border-b font-medium">
                          รหัสประจำตัวผู้เข้าสอบ
                        </th>
                        <th className="px-4 py-2 border-b font-medium">ชื่อ</th>
                        <th className="px-4 py-2 border-b font-medium">
                          นามสกุล
                        </th>
                        <th className="px-4 py-2 border-b font-medium">
                          สถานที่สอบ
                        </th>
                        <th className="px-4 py-2 border-b font-medium">
                          ห้องสอบ
                        </th>
                        <th className="px-4 py-2 border-b font-medium">วิชา</th>
                        <th className="px-4 py-2 border-b font-medium"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {data && (
                        <tr className="hover:bg-gray-50 odd:bg-gray-100 even:bg-white">
                          <td className="px-4 py-2 border-b">
                            {data.enrollments_id}
                          </td>
                          <td className="px-4 py-2 border-b whitespace-nowrap">
                            {data.firstname}
                          </td>
                          <td className="px-4 py-2 border-b whitespace-nowrap">
                            {data.lastname}
                          </td>
                          <td className="px-4 py-2 border-b">
                            {data.exam_place} <br />
                            {data.exam_building}
                          </td>
                          <td className="px-4 py-2 border-b">
                            {data.exam_room}
                          </td>
                          <td className="px-4 py-2 border-b">
                            {data.exam_set_name}
                          </td>
                          <td className="px-4 py-2 border-b">
                            <button
                              onClick={() => window.print()}
                              className="underline decoration-solid "
                            >
                              พิมพ์ใบสมัครสอบ
                            </button>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </main>
            </div>
          </div>
        </div>
        <Footer />
      </div>

      {/* ปริ้น PDF */}
      <div id="printable-area" className="hidden">
        {data && (
          <div className="border-2 border-gray-500 p-6 text-[1rem] text-black leading-relaxed">
            {/* Header: Logo + QR */}
            <div className="flex justify-between items-start border-b border-gray-500 pb-4 mb-4">
              <img src={ATSCLogo} alt="Logo ATSC" className="h-[5rem]" />
              <div className="w-[8rem] h-[10rem] overflow-hidden rounded-[5px]">
                <img
                  src={Juthawut}
                  alt="QR Code"
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </div>

            {/* Basic Info */}
            <div className="space-y-4">
              <div className="flex">
                <p className="font-semibold w-[180px]">ชื่อ-นามสกุล:</p>
                <p>
                  {data.firstname} {data.lastname}
                </p>
              </div>
              <div className="flex">
                <p className="font-semibold w-[180px]">เลขบัตรประชาชน:</p>
                <p>{data.thai_id}</p>
              </div>
              <div className="flex">
                <p className="font-semibold w-[180px]">
                  รหัสประจำตัวผู้เข้าสอบ:
                </p>
                <p>{data.enrollments_id}</p>
              </div>
              <div className="flex">
                <p className="font-semibold w-[180px]">สถานที่สอบ:</p>
                <p>
                  {data.exam_place} <br />
                  {data.exam_building} ห้อง {data.exam_room}
                </p>
              </div>
            </div>

            {/* ตารางรายวิชา */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-2 underline">
                รายวิชาที่สอบ
              </h2>
              <table className="w-full text-sm table-fixed">
                <thead>
                  <tr className="bg-gray-200 border-2 border-gray-500">
                    <th className="px-4 py-2 border-b font-medium w-[70%]">
                      รายการ
                    </th>
                    <th className="px-4 py-2 border-b border-2 border-gray-500 font-medium w-[30%]">
                      จำนวนเงิน
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-2 border-gray-500">
                    <td className="px-4 py-2 border-2 border-gray-500 w-[70%]">
                      <p className="font-semibold">วิชาที่สอบ 1 วิชา</p>
                      <p>
                        วันที่สอบ{" "}
                        {new Date(data.start_datetime).toLocaleDateString(
                          "th-TH",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </p>
                      <p>
                        เวลา{" "}
                        {new Date(data.start_datetime).toLocaleTimeString(
                          "en-GB",
                          { hour: "2-digit", minute: "2-digit" }
                        )}{" "}
                        น.
                      </p>

                      <p>
                        รหัสวิชา : {data.examination_id} รายวิชา :{" "}
                        {data.exam_set_name}
                      </p>
                      <span className="flex">
                        ประเภทข้อสอบ
                        <p className="font-medium ml-[5px]"> คอมพิวเตอร์</p>
                      </span>
                    </td>
                    <td className="px-4 py-2 border-b w-[30%] align-top">
                      <div className="flex flex-col justify-between h-full min-h-[100px]">
                        <p> </p>
                        <div className="border-t-2 border-gray-500 pt-[5px] font-semibold">
                          <p>ยอดชำระ 500 บาท</p>
                          <span className="flex">
                            สถานะ :{" "}
                            <p className="text-red-500 ml-[5px]">ยังไม่ชำระ</p>
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* หมายเหตุท้าย */}
            <div className="mt-6 text-sm italic">
              * กรุณานำเอกสารนี้มายื่นก่อนเข้าสอบ พร้อมบัตรประจำตัวประชาชน
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default PrintExam;
