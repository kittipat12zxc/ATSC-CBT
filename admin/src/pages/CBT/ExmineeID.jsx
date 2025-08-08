import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';

const ExmineeID = () => {
  const navigate = useNavigate();
  const { examID } = useParams();
  const [userList, setUserList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    Examinee_ID: '',
    Full_Name: '',
    Thai_ID: '',
    Birthday: '',
    Email: '',
    Password: '',
    Examination_ID: examID,
    Status: 'pending',
    Score: 0,
    Place: '',
    Room: ''
  });
  const [isEdit, setIsEdit] = useState(false);

  const fetchUserList = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/examinees/${examID}`);
      setUserList(res.data);
    } catch (error) {
      console.error('โหลดข้อมูลล้มเหลว:', error);
    }
  }, [examID]);

  useEffect(() => {
    fetchUserList();
  }, [fetchUserList]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const payload = { ...formData };
      if (!isEdit) delete payload.Examinee_ID;
      console.log('day', formData.Birthday);

      if (isEdit) {
        await axios.put(
          `http://localhost:5000/api/examinees/${examID}/${formData.Examinee_ID}`,
          payload
        );
      } else {
        await axios.post(
          `http://localhost:5000/api/examinee/${examID}`,
          payload
        );
      }

      setShowModal(false);
      fetchUserList();
    } catch (err) {
      console.error('❌ บันทึกข้อมูลล้มเหลว:', err.response?.data || err.message);
    }
  };

  const handleDelete = async (examineeId) => {
    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบผู้เข้าสอบนี้?')) {
      try {
        await axios.delete(`http://localhost:5000/api/examinees/${examID}/${examineeId}`);
        fetchUserList();
      } catch (err) {
        console.error('❌ ลบไม่สำเร็จ:', err);
      }
    }
  };

  const formatDateNoShift = (isoString, offsetDays = 0) => {
    if (!isoString) return '';
    const [datePart] = isoString.split('T'); // "2025-07-09"
    const [year, month, day] = datePart.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    date.setDate(date.getDate() + offsetDays); // บวกวัน
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const handleImportExcel = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post(`http://localhost:5000/api/examinees/import/${examID}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert('✅ นำเข้ารายชื่อสำเร็จ');
      fetchUserList();
    } catch (error) {
      console.error("❌ เกิดข้อผิดพลาดในการนำเข้า:", error);
      alert("❌ ไม่สามารถนำเข้ารายชื่อได้");
    }
  };

  return (
    <div className="container mx-auto font-kanit">
      {/* Navbar */}
      <div className="bg-[#0a2441] text-white p-5 mb-4 flex justify-between items-center">
        <div className="flex gap-2">
          <button
            onClick={() => navigate(-1)}
            className="bg-white text-black px-3 py-2 rounded-md"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={() => navigate('/main')}
            className="bg-white text-black px-2 py-2 rounded-md flex items-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="25"
              fill="currentColor"
              className="bi bi-house-door-fill"
              viewBox="0 0 16 16"
            >
              <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" />
            </svg>
            <span>หน้าหลัก</span>
          </button>
        </div>

        <div className="flex gap-4">
          <button
            className="bg-[#2c4e75] hover:bg-white hover:text-[#2c4e75] text-white rounded px-4 py-2 flex items-center gap-2"
            onClick={() => {
              setFormData({
                Examinee_ID: '',
                Full_Name: '',
                Thai_ID: '',
                Birthday: '',
                Email: '',
                Password: '',
                Examination_ID: examID,
                Status: 'pending',
                Score: 0,
                Place: '',
                Room: ''
              });
              setIsEdit(false);
              setShowModal(true);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-5 h-5 fill-current">
              <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
            </svg>
            เพิ่มรายชื่อ
          </button>

          <label className="bg-[#2c4e75] hover:bg-white hover:text-[#2c4e75] text-white rounded px-4 py-2 flex items-center gap-2 cursor-pointer relative overflow-hidden">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current">
              <path d="M128 64c0-35.3 28.7-64 64-64L352 0l0 128c0 17.7 14.3 32 32 32l128 0 0 288c0 35.3-28.7 64-64 64l-256 0c-35.3 0-64-28.7-64-64l0-112 174.1 0-39 39c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l80-80c9.4-9.4 9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l39 39L128 288l0-224zm0 224l0 48L24 336c-13.3 0-24-10.7-24-24s10.7-24 24-24l104 0zM512 128l-128 0L384 0 512 128z" />
            </svg>
            นำเข้า Excel
            <input
              type="file"
              accept=".xlsx,.xls"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleImportExcel}
            />
          </label>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-semibold mb-4 ml-4 text-[#2c3e50]">ผู้เข้าสอบทั้งหมด : {examID}</h1>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md p-4 mx-4">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-[#23466d] text-white font-semibold">
              <th className="border border-gray-300 px-3 py-2 text-center">ลำดับ</th>
              <th className="border border-gray-300 px-3 py-2 text-center">รหัส</th>
              <th className="border border-gray-300 px-3 py-2 text-center">ชื่อ-สกุล</th>
              <th className="border border-gray-300 px-3 py-2 text-center">บัตรประชาชน</th>
              <th className="border border-gray-300 px-3 py-2 text-center">วันเกิด</th>
              <th className="border border-gray-300 px-3 py-2 text-center">Email</th>
              <th className="border border-gray-300 px-3 py-2 text-center">รหัสผ่าน</th>
              <th className="border border-gray-300 px-3 py-2 text-center">ชุดข้อสอบ</th>
              <th className="border border-gray-300 px-3 py-2 text-center">สถานะ</th>
              <th className="border border-gray-300 px-3 py-2 text-center">คะแนน</th>
              <th className="border border-gray-300 px-3 py-2 text-center">สถานที่</th>
              <th className="border border-gray-300 px-3 py-2 text-center">ห้อง</th>
              <th className="border border-gray-300 px-3 py-2 text-center">การจัดการ</th>
            </tr>
          </thead>
          <tbody>
            {userList.length === 0 ? (
              <tr>
                <td colSpan="13" className="text-center py-4">
                  ไม่มีข้อมูลผู้เข้าสอบ
                </td>
              </tr>
            ) : (
              userList.map((user, index) => (
                <tr
                  key={user.examinee_id}
                  className={index % 2 === 1 ? 'bg-gray-50' : ''}
                  // hover effect
                  onMouseEnter={(e) => e.currentTarget.classList.add('bg-[#eef1f5]')}
                  onMouseLeave={(e) =>
                    e.currentTarget.classList.remove('bg-[#eef1f5]')
                  }
                >
                  <td className="border border-gray-300 px-2 py-1 text-center">{index}</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">{user.examinee_id}</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">
                    {user.firstname} {user.lastname}
                  </td>
                  <td className="border border-gray-300 px-2 py-1 text-center">{user.thai_id}</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">{formatDateNoShift(user.birthday, 1)}</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">{user.email}</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">{user.password}</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">{user.examination_id}</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">{user.status}</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">{user.score}</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">{user.exam_place}</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">{user.exam_room}</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                        onClick={() => {
                          setFormData({
                            Examinee_ID: user.examinee_id,
                            Full_Name: `${user.firstname} ${user.lastname}`,
                            Thai_ID: user.thai_id,
                            Birthday: formatDateNoShift(user.birthday, 1),
                            Email: user.email,
                            Password: user.password,
                            Examination_ID: user.examination_id,
                            Status: user.status,
                            Score: user.score,
                            Place: user.exam_place,
                            Room: user.exam_room
                          });
                          setIsEdit(true);
                          setShowModal(true);
                        }}
                      >
                        แก้ไข
                      </button>
                      <button
                        onClick={() => handleDelete(user.examinee_id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                      >
                        ลบ
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-[400px] max-w-full">
            <h3 className="text-xl font-semibold mb-4">{isEdit ? 'แก้ไขผู้เข้าสอบ' : 'เพิ่มผู้เข้าสอบ'}</h3>

            {isEdit && (
              <>
                <label className="block mb-1">รหัสผู้เข้าสอบ</label>
                <input
                  name="Examinee_ID"
                  value={formData.Examinee_ID}
                  readOnly
                  disabled
                  className="w-full mb-3 px-3 py-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
                />
              </>
            )}

            <label className="block mb-1">ชื่อ - สกุล</label>
            <input
              name="Full_Name"
              value={formData.Full_Name}
              onChange={handleInputChange}
              className="w-full mb-3 px-3 py-2 border border-gray-300 rounded"
            />

            <label className="block mb-1">เลขบัตรประชาชน</label>
            <input
              name="Thai_ID"
              value={formData.Thai_ID}
              onChange={handleInputChange}
              className="w-full mb-3 px-3 py-2 border border-gray-300 rounded"
            />

            <label className="block mb-1">วัน/เดือน/ปีเกิด</label>
            <input
              type="date"
              name="Birthday"
              value={formData.Birthday}
              onChange={handleInputChange}
              className="w-full mb-3 px-3 py-2 border border-gray-300 rounded"
            />

            <label className="block mb-1">Email</label>
            <input
              name="Email"
              value={formData.Email}
              onChange={handleInputChange}
              className="w-full mb-3 px-3 py-2 border border-gray-300 rounded"
            />

            <label className="block mb-1">รหัสผ่าน</label>
            <input
              name="Password"
              value={formData.Password}
              onChange={handleInputChange}
              className="w-full mb-3 px-3 py-2 border border-gray-300 rounded"
            />

            <label className="block mb-1">สถานะ</label>
            <input
              name="Status"
              value={formData.Status}
              readOnly
              disabled
              className="w-full mb-3 px-3 py-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
            />

            <label className="block mb-1">คะแนน</label>
            <input
              name="Score"
              value={formData.Score}
              onChange={handleInputChange}
              disabled
              className="w-full mb-3 px-3 py-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
            />

            <label className="block mb-1">สถานที่</label>
            <input
              name="Place"
              value={formData.Place}
              onChange={handleInputChange}
              className="w-full mb-3 px-3 py-2 border border-gray-300 rounded"
            />

            <label className="block mb-1">ห้อง</label>
            <input
              name="Room"
              value={formData.Room}
              onChange={handleInputChange}
              className="w-full mb-4 px-3 py-2 border border-gray-300 rounded"
            />

            <div className="flex justify-end gap-4">
              <button
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                บันทึก
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExmineeID;
