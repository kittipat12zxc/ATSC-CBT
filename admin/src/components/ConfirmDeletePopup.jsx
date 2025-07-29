import React from 'react';

// รับ props 4 ตัวเพื่อควบคุมการทำงาน
// - show: เพื่อบอกว่าจะให้แสดง Popup หรือไม่ (boolean)
// - image: ข้อมูลรูปภาพที่จะแสดง (object)
// - onConfirm: ฟังก์ชันที่จะทำงานเมื่อกดยืนยัน (function)
// - onCancel: ฟังก์ชันที่จะทำงานเมื่อกดยกเลิก (function)
function ConfirmDeletePopup({ show, image, onConfirm, onCancel }) {
  // ถ้า show เป็น false ก็ไม่ต้อง render อะไรเลย
  if (!show) {
    return null;
  }

  return (
    // โค้ด JSX ของ Popup เดิมทั้งหมด แค่เปลี่ยนการเรียกใช้ state/function มาเป็น props
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-md text-center">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">คุณแน่ใจหรือไม่ว่าต้องการลบรูปนี้?</h3>
        {/* ใช้ image จาก props ที่ส่งเข้ามา */}
        <img src={image?.url} alt={image?.name} className="mx-auto mb-4 max-w-[200px] rounded" />
        <div className="flex justify-center gap-4">
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:opacity-90 font-medium"
            onClick={onConfirm} // เรียกใช้ฟังก์ชัน onConfirm ที่ได้รับจาก props
          >
            ยืนยัน
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 font-medium"
            onClick={onCancel} // เรียกใช้ฟังก์ชัน onCancel ที่ได้รับจาก props
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeletePopup;