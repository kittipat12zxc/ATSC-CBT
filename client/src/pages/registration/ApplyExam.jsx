import { useForm } from "react-hook-form";
import { useState } from "react";

function ApplyExam() {
  // ใช้ useForm จาก react-hook-form เพื่อจัดการฟอร์ม
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // เก็บข้อมูลสำหรับใบสมัคร
  const [submittedData, setSubmittedData] = useState(null);

  // ฟังก์ชันที่เรียกใช้เมื่อส่งฟอร์มสำเร็จ
  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/applyexam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);
      alert(result.message);

      // เก็บข้อมูลเพื่อแสดงในใบสมัคร
      setSubmittedData(data);

      // รีเซ็ตฟอร์ม
      reset();

      // เรียกหน้าพิมพ์หลัง delay เล็กน้อย
      setTimeout(() => {
        window.print();
      }, 500);
    } catch (error) {
      console.error(error);
      alert("เกิดข้อผิดพลาดในการส่งข้อมูล");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4 print:hidden">
        <div className="bg-white rounded-md p-6 w-full max-w-6xl shadow-lg">
          {/* Steps */}
          <div className="text-center mb-8">
            <h2 className="text-blue-800 font-bold text-2xl mb-8">
              ขั้นตอนการสมัคร
            </h2>
            <div className="flex justify-between max-w-2xl mx-auto">
              {[
                {
                  step: 1,
                  img: "/images/Read.png",
                  label: "อ่านประกาศรับสมัครสอบ",
                },
                {
                  step: 2,
                  img: "/images/Fill.png",
                  label: "กรอกข้อมูลใบสมัคร",
                },
                {
                  step: 3,
                  img: "/images/Payment.png",
                  label: "พิมพ์ใบแจ้งชำระเงิน",
                },
                {
                  step: 4,
                  img: "/images/Print.png",
                  label: "พิมพ์ใบสมัคร",
                },
              ].map((items) => (
                <div key={items.step} className="flex flex-col items-center">
                  <div className="rounded-full border-4 border-blue-800 w-24 h-24 flex items-center justify-center text-xl font-bold text-gray-700 relative">
                    {/* ตัวเลขเล็กมุมบนซ้าย */}
                    <span className="absolute -top-3 -left-3 bg-blue-800 border-2 border-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm text-white font-semibold">
                      {items.step}
                    </span>
                    {/* รูปภาพตรงกลาง */}
                    <img
                      src={items.img}
                      alt={`Step ${items.step}`}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <span className="mt-2 text-sm text-gray-600">
                    {items.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-t-2 border-blue-900 mb-6" />

          {/* Form Section */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-sm">
            {/* ข้อมูลผู้สมัคร */}
            <div>
              <h3 className="font-semibold mb-2 text-lg">ข้อมูลผู้สมัคร</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <select
                  className={`border p-2 rounded-md focus:outline-none ${
                    errors.prefix
                      ? "border-red-500 option-red-500 focus:ring-red-300"
                      : "border-gray-800 focus:ring-blue-300"
                  }`}
                  {...register("prefix", { required: "กรุณาเลือกคำนำหน้า" })}
                  name="prefix"
                >
                  <option value="">คำนำหน้า</option>
                  <option value="นาย">นาย</option>
                  <option value="นาง">นาง</option>
                  <option value="นางสาว">นางสาว</option>
                </select>
                <input
                  type="text"
                  name="firstName"
                  placeholder={
                    errors.firstName ? errors.firstName.message : "ชื่อ"
                  }
                  {...register("firstName", { required: "กรุณากรอกชื่อ" })}
                  className={`p-2 rounded-md w-full border focus:outline-none ${
                    errors.firstName
                      ? "border-red-500 placeholder-red-500 focus:ring-red-300"
                      : "border-gray-800 focus:ring-blue-300"
                  }`}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder={
                    errors.lastName ? errors.lastName.message : "นามสกุล"
                  }
                  {...register("lastName", { required: "กรุณากรอกนามสกุล" })}
                  className={`p-2 rounded-md w-full col-span-2 border focus:outline-none ${
                    errors.lastName
                      ? "border-red-500 placeholder-red-500 focus:ring-red-300"
                      : "border-gray-800 focus:ring-blue-300"
                  }`}
                />
                <input
                  type="text"
                  name="birthday"
                  placeholder={
                    errors.birthday
                      ? errors.birthday.message
                      : "วัน/เดือน/ปีเกิด"
                  }
                  {...register("birthday", {
                    required: "กรุณากรอกวัน/เดือน/ปีเกิด",
                  })}
                  className={`p-2 rounded-md w-full col-span-2 border focus:outline-none ${
                    errors.birthday
                      ? "border-red-500 placeholder-red-500 focus:ring-red-300"
                      : "border-gray-800 focus:ring-blue-300"
                  }`}
                />
                <input
                  type="text"
                  name="thai_id"
                  placeholder={
                    errors.thai_id
                      ? errors.thai_id.message
                      : "หมายเลขบัตรประจำตัวประชาชน"
                  }
                  {...register("thai_id", {
                    required: "กรุณากรอกหมายเลขบัตรประจำตัวประชาชน",
                  })}
                  className={`p-2 rounded-md w-full col-span-2 border focus:outline-none ${
                    errors.thai_id
                      ? "border-red-500 placeholder-red-500 focus:ring-red-300"
                      : "border-gray-800 focus:ring-blue-300"
                  }`}
                />
              </div>
            </div>

            {/* ช่องทางติดต่อ */}
            <div>
              <h3 className="font-semibold mb-2 text-lg">ช่องทางติดต่อ</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="phone_number"
                  placeholder={
                    errors.phone_number
                      ? errors.phone_number.message
                      : "เบอร์โทร"
                  }
                  {...register("phone_number", {
                    required: "กรุณากรอกเบอร์โทร",
                  })}
                  className={`border p-2 rounded-md focus:outline-none ${
                    errors.phone_number
                      ? "border-red-500 placeholder-red-500 focus:ring-red-300"
                      : "border-gray-800 focus:ring-blue-300"
                  }`}
                />
                <input
                  type="email"
                  name="email"
                  placeholder={errors.email ? errors.email.message : "อีเมล"}
                  {...register("email", { required: "กรุณากรอกอีเมล" })}
                  className={`border p-2 rounded-md focus:outline-none ${
                    errors.email
                      ? "border-red-500 placeholder-red-500 focus:ring-red-300"
                      : "border-gray-800 focus:ring-blue-300"
                  }`}
                />
              </div>
            </div>

            {/* ที่อยู่ */}
            <div>
              <h3 className="font-semibold mb-2 text-lg">ที่อยู่</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                  type="text"
                  name="province"
                  placeholder={
                    errors.province ? errors.province.message : "จังหวัด"
                  }
                  {...register("province", { required: "กรุณากรอกจังหวัด" })}
                  className={`border p-2 rounded-md focus:outline-none ${
                    errors.province
                      ? "border-red-500 placeholder-red-500 focus:ring-red-300"
                      : "border-gray-800 focus:ring-blue-300"
                  }`}
                />
                <input
                  type="text"
                  name="district"
                  placeholder={
                    errors.district ? errors.district.message : "เขต/อำเภอ"
                  }
                  {...register("district", { required: "กรุณากรอกเขต/อำเภอ" })}
                  className={`border p-2 rounded-md focus:outline-none ${
                    errors.district
                      ? "border-red-500 placeholder-red-500 focus:ring-red-300"
                      : "border-gray-800 focus:ring-blue-300"
                  }`}
                />
                <input
                  type="text"
                  name="Subdistrict"
                  placeholder={
                    errors.Subdistrict
                      ? errors.Subdistrict.message
                      : "แขวง/ตำบล"
                  }
                  {...register("Subdistrict", {
                    required: "กรุณากรอกแขวง/ตำบล",
                  })}
                  className={`border p-2 rounded-md focus:outline-none ${
                    errors.Subdistrict
                      ? "border-red-500 placeholder-red-500 focus:ring-red-300"
                      : "border-gray-800 focus:ring-blue-300"
                  }`}
                />
                <input
                  type="text"
                  name="zipcode"
                  placeholder={
                    errors.zipcode ? errors.zipcode.message : "รหัสไปรษณีย์"
                  }
                  {...register("zipcode", {
                    required: "กรุณากรอกรหัสไปรษณีย์",
                  })}
                  className={`border p-2 rounded-md focus:outline-none ${
                    errors.zipcode
                      ? "border-red-500 placeholder-red-500 focus:ring-red-300"
                      : "border-gray-800 focus:ring-blue-300"
                  }`}
                />
                <input
                  type="text"
                  name="Additional"
                  placeholder={
                    errors.Additional
                      ? errors.Additional.message
                      : "รายละเอียดที่อยู่เพิ่มเติม"
                  }
                  {...register("Additional", {
                    required: "กรุณากรอกรายละเอียดที่อยู่เพิ่มเติม",
                  })}
                  className={`border p-2 rounded-md col-span-4 focus:outline-none ${
                    errors.Additional
                      ? "border-red-500 placeholder-red-500 focus:ring-red-300"
                      : "border-gray-800 focus:ring-blue-300"
                  }`}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-800 text-white px-6 py-2 rounded-md font-bold hover:bg-blue-900 transition"
              >
                ยืนยันการสมัคร
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ส่วนใบสมัครที่จะแสดงตอนพิมพ์ */}
      {submittedData && (
        <div className="max-w-4xl mx-auto p-4 bg-white print:block hidden">
          {/* ส่วนหัว */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <img src="/images/atsc.png" alt="ATSC Logo" className="h-20" />
              <h1 className="text-2xl font-bold mb-4">ใบสมัครสอบ SDU-CBT</h1>
            </div>
            <img
              src="/images/profile.jpg"
              alt="Profile"
              className="w-25 h-35 object-cover rounded"
            />
          </div>

          {/* ข้อมูลผู้สมัคร */}
          <div className="flex mb-6">
            <div className="mr-10">
              <p className="mb-2">
                ชื่อ - นามสกุล :{" "}
                <strong>
                  {submittedData.prefix} {submittedData.firstName}{" "}
                  {submittedData.lastName}
                </strong>
              </p>
              <p>
                ยืนยันการสมัคร : <strong>12 กรกฎาคม 2568</strong>
              </p>
            </div>

            <div className="">
              <p className="mb-2">
                จำนวนวิชาสอบที่สมัคร <strong>1 วิชา</strong>
              </p>
              <p>
                สถานะ :{" "}
                <span className="text-green-600 font-bold">
                  ชำระเงินเรียบร้อยแล้ว
                </span>
              </p>
            </div>
          </div>

          {/* ตารางวิชา */}
          <div className="border border-black">
            {/* แถวหัว */}
            <div className="grid grid-cols-5 border-b border-black bg-gray-100">
              <div className="col-span-3 p-3 border-r border-black text-center font-bold text-lg">
                รายการ
              </div>
              <div className="col-span-2 p-3 text-center font-bold text-lg">
                จำนวนเงิน
              </div>
            </div>

            {/* แถวข้อมูล */}
            <div className="grid grid-cols-5">
              {/* ช่องเนื้อหา รายการ */}
              <div className="p-4 border-r border-black col-span-3">
                <p className="font-bold mb-1">วิชาสอบที่ 1</p>
                <p className="mb-1">วันสอบ 20 กรกฎาคม 2568</p>
                <p className="mb-1">
                  รหัสวิชา <strong>100600</strong> ชื่อวิชา{" "}
                  <strong>วิทยาการคอมพิวเตอร์</strong>
                </p>
                <p className="mb-1">
                  เวลา <strong>10:00 - 12:00 น.</strong> ประเภทข้อสอบ{" "}
                  <strong>คอมพิวเตอร์</strong>
                </p>
              </div>

              {/* ช่องเนื้อหา จำนวนเงิน */}
              <div className="p-4 col-span-2">
                <div className="flex justify-between w-full mb-1">
                  <p className="font-bold">วิชาทั้งหมดที่เลือก</p>
                  <p>1 วิชา</p>
                </div>

                <div className="flex justify-between w-full mb-1">
                  <p className="font-bold">ยอดชำระ</p>
                  <p>500 บาท</p>
                </div>

                <p className="text-sm text-right">(ห้าร้อยบาทถ้วน)</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ApplyExam;
