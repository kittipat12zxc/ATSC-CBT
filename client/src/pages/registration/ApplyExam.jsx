import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../Components/Header/PCHeader";
import Footer from "../../Components/Footer/Footer";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ApplyExam() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const query = useQuery();
  const id = query.get("id");

  useEffect(() => {
    if (!id) {
      alert("กรุณาใส่พารามิเตอร์ id ใน URL ด้วย เช่น ?id=686002");
    }
  }, [id]);

  const onSubmit = async (data) => {
    if (!id) {
      alert("ไม่พบข้อมูลรหัสสอบ กรุณาตรวจสอบ URL");
      return;
    }

    // แปลงชื่อฟิลด์ firstName, lastName ให้ตรงกับ backend เป็น firstname, lastname
    const payload = {
      ...data,
      firstname: data.firstName,
      lastname: data.lastName,
      examination_id: id,
    };
    delete payload.firstName;
    delete payload.lastName;

    console.log("📤 กำลังส่ง payload ไป backend:", payload);

    try {
      const response = await fetch("http://localhost:5000/applyexam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log("📥 ผลลัพธ์จาก backend:", result);

      if (!response.ok) {
        console.error("❌ เกิดข้อผิดพลาดจาก backend:", result);
        alert(result.message || "เกิดข้อผิดพลาดในการส่งข้อมูล");
        return;
      }

      alert(result.message);
      reset();
    } catch (error) {
      console.error("❌ ไม่สามารถติดต่อ backend ได้:", error);
      alert("เกิดข้อผิดพลาดในการส่งข้อมูล");
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4 print:hidden">
        <div className="bg-white rounded-md p-6 w-full max-w-6xl shadow-lg">
          {!id ? (
            <div className="text-center text-red-600 font-bold text-xl">
              กรุณาใส่พารามิเตอร์ <code>?id=686002</code> ใน URL ก่อนเข้าหน้านี้
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-sm">
              <h3 className="font-semibold mb-2 text-lg">ข้อมูลผู้สมัคร</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <select
                  {...register("prefix", { required: "กรุณาเลือกคำนำหน้า" })}
                  className={`border p-2 rounded-md ${errors.prefix ? "border-red-500" : "border-gray-800"}`}
                >
                  <option value="">คำนำหน้า</option>
                  <option value="นาย">นาย</option>
                  <option value="นาง">นาง</option>
                  <option value="นางสาว">นางสาว</option>
                </select>
                <input
                  {...register("firstName", { required: "กรุณากรอกชื่อ" })}
                  placeholder="ชื่อ"
                  className={`p-2 rounded-md border ${errors.firstName ? "border-red-500" : "border-gray-800"}`}
                />
                <input
                  {...register("lastName", { required: "กรุณากรอกนามสกุล" })}
                  placeholder="นามสกุล"
                  className={`p-2 rounded-md border ${errors.lastName ? "border-red-500" : "border-gray-800"}`}
                />
                <input
                  {...register("birthday", { required: "กรุณากรอกวันเกิด" })}
                  placeholder="วัน/เดือน/ปีเกิด"
                  className={`p-2 rounded-md border ${errors.birthday ? "border-red-500" : "border-gray-800"}`}
                />
                <input
                  {...register("thai_id", { required: "กรุณากรอกเลขบัตรประชาชน" })}
                  placeholder="เลขบัตรประชาชน"
                  className={`p-2 rounded-md border ${errors.thai_id ? "border-red-500" : "border-gray-800"}`}
                />
              </div>

              <h3 className="font-semibold mt-4 mb-2 text-lg">ช่องทางติดต่อ</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  {...register("phone_number", { required: "กรุณากรอกเบอร์โทร" })}
                  placeholder="เบอร์โทร"
                  className={`p-2 rounded-md border ${errors.phone_number ? "border-red-500" : "border-gray-800"}`}
                />
                <input
                  {...register("email", { required: "กรุณากรอกอีเมล" })}
                  placeholder="อีเมล"
                  className={`p-2 rounded-md border ${errors.email ? "border-red-500" : "border-gray-800"}`}
                />
              </div>

              <h3 className="font-semibold mt-4 mb-2 text-lg">ที่อยู่</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                  {...register("province", { required: "กรุณากรอกจังหวัด" })}
                  placeholder="จังหวัด"
                  className={`border p-2 rounded-md ${errors.province ? "border-red-500" : "border-gray-800"}`}
                />
                <input
                  {...register("district", { required: "กรุณากรอกเขต/อำเภอ" })}
                  placeholder="เขต/อำเภอ"
                  className={`border p-2 rounded-md ${errors.district ? "border-red-500" : "border-gray-800"}`}
                />
                <input
                  {...register("Subdistrict", { required: "กรุณากรอกแขวง/ตำบล" })}
                  placeholder="แขวง/ตำบล"
                  className={`border p-2 rounded-md ${errors.Subdistrict ? "border-red-500" : "border-gray-800"}`}
                />
                <input
                  {...register("zipcode", { required: "กรุณากรอกรหัสไปรษณีย์" })}
                  placeholder="รหัสไปรษณีย์"
                  className={`border p-2 rounded-md ${errors.zipcode ? "border-red-500" : "border-gray-800"}`}
                />
                <input
                  {...register("Additional", { required: "กรุณากรอกรายละเอียดเพิ่มเติม" })}
                  placeholder="รายละเอียดเพิ่มเติม"
                  className={`border p-2 rounded-md col-span-4 ${errors.Additional ? "border-red-500" : "border-gray-800"}`}
                />
              </div>

              <div className="text-center mt-6">
                <button
                  type="submit"
                  className="bg-blue-800 text-white px-6 py-2 rounded-md font-bold hover:bg-blue-900"
                >
                  ยืนยันการสมัคร
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ApplyExam;
