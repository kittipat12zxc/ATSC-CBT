import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // เพิ่มเข้ามา
import { FaArrowLeft } from 'react-icons/fa';   // เพิ่มเข้ามา

// สมมติว่าสร้างไฟล์ Popup แยกไว้แล้ว
import ConfirmDeletePopup from '../../components/ConfirmDeletePopup';

function AdminApp() {
  const navigate = useNavigate(); // เพิ่มเข้ามา
  // State Management 
  // state สำหรับเก็บไฟล์ที่ผู้ใช้เลือก
  const [file, setFile] = useState(null);
  // state สำหรับเก็บรายการรูปภาพทั้งหมดที่ดึงมาจาก API
  const [images, setImages] = useState([]);
  // state สำหรับควบคุมการแสดงผลของ Popup ยืนยันการลบ
  const [showConfirm, setShowConfirm] = useState(false);
  // state สำหรับเก็บข้อมูลรูปภาพที่ถูกเลือกเพื่อจะลบ
  const [selectedImage, setSelectedImage] = useState(null);
  // Ref สำหรับอ้างอิงถึง input element ชนิด file ที่ซ่อนไว้
  const fileInputRef = useRef(null);

  /**
   * @function fetchImages
   * @description ดึงข้อมูลรูปภาพทั้งหมดจาก Server (API)
   * เมื่อดึงสำเร็จจะทำการเพิ่ม `dateAdded` ที่เป็นวันที่ปัจจุบันในรูปแบบไทยเข้าไปในแต่ละ object ของรูปภาพ
   * แล้วนำไปอัปเดต state `images`
   * หากเกิดข้อผิดพลาด (เช่น API ไม่ทำงาน) จะใช้ข้อมูลตัวอย่าง (mock data) แสดงผลแทน
   */
  const fetchImages = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/images-annouce'); // ✅ fixed
      const imagesWithDate = res.data.map(img => ({
        ...img,
        dateAdded: new Date().toLocaleDateString('th-TH'),
      }));
      setImages(imagesWithDate);
    } catch (error) {
      console.error("Error fetching images:", error);
      setImages([
        { name: 'example1.jpg', url: 'https://i.imgur.com/xQYFV6w.png', dateAdded: '26/02/2025' },
        { name: 'example2.jpg', url: 'https://i.imgur.com/gKwg7xG.png', dateAdded: '26/02/2025' },
      ]);
    }
  };

  /**
   * @function handleUpload
   * @description อัปโหลดไฟล์รูปภาพที่ผู้ใช้เลือกไปยัง Server
   * โดยจะสร้าง FormData เพื่อส่งไฟล์ผ่าน API POST request
   * เมื่ออัปโหลดสำเร็จ จะเรียก `fetchImages()` เพื่อดึงรายการรูปภาพใหม่ล่าสุดมาแสดง
   */
  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    try {
      await axios.post('http://localhost:5000/api/uploads_annnouce', formData);
      fetchImages();
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  /**
   * @effect hook (componentDidMount)
   * @description ทำงานครั้งแรกเพียงครั้งเดียวเมื่อ Component ถูกสร้างขึ้น
   * เพื่อเรียก `fetchImages()` เพื่อดึงข้อมูลรูปภาพมาแสดงผลตอนเริ่มต้น
   */
  useEffect(() => {
    fetchImages();
  }, []); // dependency array เป็นค่าว่าง `[]` หมายถึงให้ทำงานแค่ครั้งเดียว

  /**
   * @effect hook
   * @description จะทำงานทุกครั้งเมื่อ state `file` มีการเปลี่ยนแปลง
   * เมื่อผู้ใช้เลือกไฟล์ใหม่ (state `file` เปลี่ยน) ฟังก์ชัน `handleUpload` จะถูกเรียกเพื่อเริ่มการอัปโหลดอัตโนมัติ
   */
  useEffect(() => {
    if (file) {
      handleUpload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]); // dependency array คือ `[file]`

  /**
   * @function confirmDelete
   * @param {object} img - Object ของรูปภาพที่ผู้ใช้ต้องการลบ
   * @description ถูกเรียกเมื่อผู้ใช้คลิกปุ่ม "ลบ"
   * ทำหน้าที่เก็บข้อมูลรูปภาพที่จะลบไว้ใน state `selectedImage` และตั้งค่า `setShowConfirm` เป็น true เพื่อแสดง Popup ยืนยัน
   */
  const confirmDelete = (img) => {
    setSelectedImage(img);
    setShowConfirm(true);
  };

  /**
   * @function handleConfirmDelete
   * @description ถูกเรียกเมื่อผู้ใช้กดยืนยันการลบใน Popup
   * ส่ง API DELETE request ไปยัง Server เพื่อลบไฟล์รูปภาพ
   * เมื่อลบสำเร็จ จะเรียก `fetchImages()` เพื่ออัปเดตรายการรูปภาพ และซ่อน Popup
   */
  const handleConfirmDelete = async () => {
    if (!selectedImage) return;
    try {
      await axios.delete(`http://localhost:5000/api/images-annouce/${selectedImage.name}`); // ✅ fixed
      fetchImages();
    } catch (error) {
      console.error("Error deleting image:", error);
    } finally {
      setShowConfirm(false);
      setSelectedImage(null);
    }
  };

  /**
   * @function handleFileButtonClick
   * @description ถูกเรียกเมื่อผู้ใช้คลิกปุ่ม "เพิ่มรูปภาพ"
   * ทำหน้าที่สั่งให้ `<input type="file" />` ที่ซ่อนอยู่ทำงาน (เปิดหน้าต่างเลือกไฟล์)
   */
  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };


  // --- ส่วนของการ Render หน้า UI ---
  return (
    <div className="font-[Kanit]">
        {/* Navbar ที่นำมาใส่ใหม่ */}
        <div className="bg-[#0a2441] text-white p-5 mb-4 flex justify-between items-center">
            <div className="flex gap-2">
                <button onClick={() => navigate(-1)} className="bg-white text-black px-3 py-2 rounded-md">
                    <FaArrowLeft />
                </button>
                <button onClick={() => navigate("/main")} className="bg-white text-black px-2 py-2 rounded-md flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="25" fill="currentColor" className="bi bi-house-door-fill" viewBox="0 0 16 16">
                        <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5"/>
                    </svg>
                    หน้าหลัก
                </button>
            </div>
            
            {/* Input สำหรับรับไฟล์ที่ซ่อนไว้ และจะถูกเรียกใช้ผ่าน `fileInputRef` */}
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={e => setFile(e.target.files[0])} // เมื่อเลือกไฟล์ จะอัปเดต state `file`
                accept="image/*"
            />
            
            {/* ปุ่มใหม่ที่นำมาแทนที่ โดยยังคงเรียกใช้ฟังก์ชันเดิม */}
            <button onClick={handleFileButtonClick} className="bg-blue-800 text-white px-2 py-2 rounded-md flex items-center gap-1 hover:bg-white hover:text-blue-800">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="25" fill="currentColor" viewBox="0 0 448 512">
                    <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
                </svg>
                เพิ่มรูปภาพ
            </button>
        </div>

        {/* ===== ส่วนเนื้อหาหลัก ===== */}
        <main className="p-6 font-sans text-gray-800">
            <div className="border-b border-gray-200 pb-4 mb-4">
                <h2 className="text-2xl font-bold mb-1">ข่าวสาร/ประชาสัมพันธ์</h2>
                <p className="text-sm text-gray-500">คำอธิบาย: ใช้รูปภาพขนาด 1800 x 600 px</p>
            </div>
            
            {/* ตารางแสดงผลรายการรูปภาพ */}
            <table className="w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
                <thead className="bg-[#1A237E] text-white">
                    <tr>
                        <th className="p-4 text-left text-base font-bold">รูปภาพ</th>
                        <th className="p-4 text-left text-base font-bold">วันที่เพิ่ม</th>
                        <th className="p-4 text-left text-base font-bold"></th>
                    </tr>
                </thead>
                <tbody>
                    {/* วนลูปแสดงข้อมูลรูปภาพจาก state `images` */}
                    {images.map((img) => (
                        <tr key={img.name} className="border-t border-gray-200">
                            <td className="p-4">
                                <img src={img.url} alt={img.name} className="block h-auto rounded max-w-[250px]" />
                            </td>
                            <td className="p-4">{img.dateAdded}</td>
                            <td className="p-4 text-center w-[100px]">
                                {/* ปุ่มลบรูปภาพ */}
                                <button
                                    className="py-1.5 px-5 border-none rounded-full bg-red-600 hover:opacity-90 text-white text-sm cursor-pointer font-bold"
                                    onClick={() => confirmDelete(img)} // เมื่อคลิก จะเรียกฟังก์ชันเพื่อเปิด Popup ยืนยันการลบ
                                >
                                    ลบ
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>

        {/* เรียกใช้ Component Popup ยืนยันการลบ */}
        <ConfirmDeletePopup
            show={showConfirm} // prop ควบคุมการแสดงผล
            image={selectedImage} // prop ส่งข้อมูลรูปภาพที่ถูกเลือก
            onConfirm={handleConfirmDelete} // prop สำหรับ callback function เมื่อกดยืนยัน
            onCancel={() => setShowConfirm(false)} // prop สำหรับ callback function เมื่อกดยกเลิก
        />
    </div>
  );
}

export default AdminApp;