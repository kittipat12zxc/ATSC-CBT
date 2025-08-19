
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHome, FaPlus, FaPen, FaTrash, FaCheck } from "react-icons/fa";

function ListOfAdmins() {
  const [mode, setMode] = useState("normal");
  const [admin, setAdmin] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    admin_id: "",
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    role: "",
    password: "",
  });

  const [popup, setPopup] = useState({ show: false, message: "", type: "" }); // success/error/confirm
  const [deleteId, setDeleteId] = useState(null);

  const navigate = useNavigate();

  const fetchAdmins = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/adminlist");
      setAdmin(res.data);
    } catch (err) {
      console.error("Error fetching admins:", err);
    }
  }, []);

  useEffect(() => {
    fetchAdmins();
  }, [fetchAdmins]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = () => {
    setIsEditMode(false);
    setFormData({
      admin_id: "",
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      role: "",
      password: "",
    });
    setShowModal(true);
  };

  const handleEdit = (admin) => {
    setIsEditMode(true);
    setFormData(admin);
    setShowModal(true);
  };

  const handleSave = async () => {
  
    const requiredFields = ["admin_id", "username", "firstname", "lastname", "email", "role","password"];
    for (let field of requiredFields) {
      if (!formData[field]) {
        setPopup({ show: true, message: "โปรดกรอกข้อมูลให้ครบ", type: "error" });
        return;
      }
    }

    try {
      if (isEditMode) {
        await axios.put(
          `http://localhost:5000/api/adminlist/${formData.admin_id}`,
          formData
        );
        setPopup({ show: true, message: "แก้ไขสำเร็จ", type: "success" });
      } else {
        await axios.post("http://localhost:5000/api/adminlist", formData);
        setPopup({ show: true, message: "เพิ่ม Admin สำเร็จ", type: "success" });
      }
      setShowModal(false);
      fetchAdmins();
    } catch (err) {
      console.error("Save failed:", err);
      setPopup({ show: true, message: "บันทึกไม่สำเร็จ", type: "error" });
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setPopup({ show: true, message: "คุณแน่ใจหรือไม่ว่าต้องการลบ?", type: "confirm" });
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/adminlist/${deleteId}`);
      setPopup({ show: true, message: "ลบสำเร็จ", type: "success" });
      setDeleteId(null);
      fetchAdmins();
    } catch (err) {
      console.error("Delete failed:", err);
      setPopup({ show: true, message: "ลบไม่สำเร็จ", type: "error" });
    }
  };

  return (
    <div className="font-[Kanit] bg-gray-50 min-h-screen">
      {/* Navbar */}
      <header className="bg-[#0a2441] text-white p-4 shadow-md flex justify-between items-center">
        <div className="flex gap-2">
          <button
            onClick={() => navigate(-1)}
            className="bg-white text-black p-2 rounded-md hover:bg-gray-200 transition-colors"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={() => navigate("/main")}
            className="bg-white text-black px-3 py-1 rounded-md flex items-center gap-2 hover:bg-gray-200 transition-colors"
          >
            <FaHome /> หน้าหลัก
          </button>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setMode("edit")}
            className="bg-yellow-400 text-black px-3 py-1 rounded-md flex items-center gap-2 hover:bg-yellow-500 transition-colors"
          >
            <FaPen /> แก้ไข
          </button>
          <button
            onClick={() => setMode("delete")}
            className="bg-red-500 text-white px-3 py-1 rounded-md flex items-center gap-2 hover:bg-red-600 transition-colors"
          >
            <FaTrash /> ลบ
          </button>
          <button
            onClick={handleAdd}
            className="bg-white text-blue-600 px-3 py-1 rounded-md flex items-center gap-2 hover:bg-blue-50 transition-colors"
          >
            <FaPlus /> เพิ่ม Admin
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="p-4">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">รายชื่อแอดมิน</h1>
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="w-full table-auto text-sm border-collapse">
            <thead className="bg-[#23466d] text-white">
              <tr>
                {["รหัสแอดมิน", "ชื่อผู้ใช้", "ชื่อ", "นามสกุล", "อีเมล์", "ตำแหน่ง", "ตัวเลือก"]
                  .filter((h) => !(mode === "normal" && h === "ตัวเลือก"))
                  .map((h) => (
                    <th key={h} className="p-3 border text-left">
                      {h}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {admin.map((admin) => (
                <tr
                  key={admin.admin_id}
                  className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 border-b"
                >
                  <td className="p-3 border">{admin.admin_id}</td>
                  <td className="p-3 border">{admin.username}</td>
                  <td className="p-3 border">{admin.firstname}</td>
                  <td className="p-3 border">{admin.lastname}</td>
                  <td className="p-3 border">{admin.email}</td>
                  <td className="p-3 border text-center">{admin.role}</td>
                  {mode !== "normal" && (
                    <td className="p-3 border">
                      <div className="flex gap-2 justify-center">
                        {mode === "edit" && (
                          <button
                            onClick={() => handleEdit(admin)}
                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                          >
                            แก้ไข
                          </button>
                        )}
                        {mode === "delete" && (
                          <button
                            onClick={() => handleDeleteClick(admin.admin_id)}
                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                          >
                            ลบ
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          {(mode === "edit" || mode === "delete") && (
            <div className="p-3 text-right bg-gray-100">
              <button
                onClick={() => setMode("normal")}
                className="bg-gray-500 text-white px-4 py-2 rounded-md flex items-center gap-2 ml-auto hover:bg-gray-600"
              >
                <FaCheck /> เสร็จสิ้น
              </button>
            </div>
          )}
        </div>
      </main>

     
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md flex flex-col gap-4">
            <h3 className="text-xl font-semibold">
              {isEditMode ? "แก้ไข Admin" : "เพิ่ม Admin"}
            </h3>
            <input name="admin_id" placeholder="รหัสแอดมิน" onChange={handleChange} value={formData.admin_id} className="p-2 border rounded" />
            <input name="username" placeholder="ชื่อผู้ใช้" onChange={handleChange} value={formData.username} className="p-2 border rounded" />
            <input name="firstname" placeholder="ชื่อจริง" onChange={handleChange} value={formData.firstname} className="p-2 border rounded" />
            <input name="lastname" placeholder="นามสกุล" onChange={handleChange} value={formData.lastname} className="p-2 border rounded" />
            <input name="email" placeholder="อีเมล์" onChange={handleChange} value={formData.email} className="p-2 border rounded" />
            <input name="role" placeholder="ตำแหน่ง" onChange={handleChange} value={formData.role} className="p-2 border rounded" />
            <input name="password" placeholder="รหัสผ่าน" onChange={handleChange} value={formData.password} className="p-2 border rounded" />
            <div className="flex justify-end gap-3 mt-2">
              <button onClick={() => setShowModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">ยกเลิก</button>
              <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">บันทึก</button>
            </div>
          </div>
        </div>
      )}

     
      {popup.show && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm flex flex-col gap-4 text-center">
            <p className="text-lg font-medium">{popup.message}</p>
            <div className="flex justify-center gap-3 mt-2">
              {popup.type === "confirm" ? (
                <>
                  <button
                    onClick={() => {
                      confirmDelete();
                      setPopup({ ...popup, show: false });
                    }}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    ยืนยัน
                  </button>
                  <button
                    onClick={() => setPopup({ ...popup, show: false })}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    ยกเลิก
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setPopup({ ...popup, show: false })}
                  className={`px-4 py-2 rounded ${
                    popup.type === "success"
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-gray-500 hover:bg-gray-600"
                  } text-white`}
                >
                  ตกลง
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListOfAdmins;
