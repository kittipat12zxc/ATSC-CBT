import React from 'react';

function CustomAlert({ title, message, onClose }) {
  return (
    // Overlay: เทียบเท่ากับ .custom-alert-overlay
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      
      {/* Alert Box: เทียบเท่ากับ .custom-alert */}
      <div className="relative w-[300px] bg-white rounded-xl shadow-lg text-center py-5 px-8">
        
        {/* Title: เพิ่มสไตล์เพื่อให้โดดเด่นขึ้น */}
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        
        {/* Message */}
        <p className="text-gray-700">{message}</p>
        
        {/* Confirm Button: เทียบเท่ากับ .confirm-btn */}
        <button 
          className="mt-4 py-2 px-4 bg-[#409eff] hover:bg-[#3a8ee6] text-white rounded-md cursor-pointer transition-colors"
          onClick={onClose}
        >
          ตกลง
        </button>
        
      </div>
    </div>
  );
}

export default CustomAlert;