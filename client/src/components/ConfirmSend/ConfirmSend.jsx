import React from "react";
import './ConfirmSend.css';

function ConfirmSend({handleSubmit, onClose}) {
    return (
        <div className="custom-box-confirm">
            <div className="custom-box">
                <h2 className="tatol-cf">กรุณายืนยันการส่ง</h2>
                <p className="font-cf">คำเตือน: หากคุณกดยืนยันส่ง ระบบจะบันทึกข้อมูลถาวรและไม่สามารถแก้ไขได้อีก</p>
                <button className="confirm-btn-cf" onClick={onClose}>ยกเลิก</button>
                <button className="confirm-btn-cf" onClick={handleSubmit}>ยืนยัน</button>
            </div>
        </div>
    )
}

export default ConfirmSend;