import React from "react";

function Confirm({ handleSubmit, onClose, title }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[999]">
      <div className="bg-white px-8 py-6 rounded-xl shadow-lg w-auto text-right">
        <h2 className="text-center text-xl font-semibold">กรุณายืนยัน</h2>
        <p className="text-center text-red-600 mt-2">
          {title}
        </p>
        <div className="mt-4 text-right">
          <button
            onClick={onClose}
            className="mt-4 px-6 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 mr-2"
          >
            ยกเลิก
          </button>
          <button
            onClick={handleSubmit}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            ยืนยัน
          </button>
        </div>
      </div>
    </div>
  );
}

export default Confirm;