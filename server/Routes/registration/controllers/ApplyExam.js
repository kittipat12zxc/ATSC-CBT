const express = require('express');
const getDB = require('../../../models/DataBase');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    // รับข้อมูลจาก body
    const {
      prefix,
      firstname,
      lastname,
      birthday,
      thai_id,
      phone_number,
      email,
      province,
      district,
      Subdistrict,
      zipcode,
      Additional,
      enrollment_status = 'pending',
      payment_status = 'pending',
      exam_status,
      seat,
      examination_id
    } = req.body || {};

    console.log("📥 Received body:", req.body);

    // ตรวจสอบข้อมูลที่จำเป็น (ไม่ว่าง ไม่ undefined ไม่ null)
    const requiredFields = [
      'prefix', 'firstname', 'lastname', 'birthday', 'thai_id',
      'phone_number', 'email', 'province', 'district', 'Subdistrict',
      'zipcode', 'examination_id'
    ];

    for (const field of requiredFields) {
      if (!req.body[field] && req.body[field] !== 0) {
        return res.status(400).json({ message: `กรุณาระบุข้อมูล '${field}' ให้ครบถ้วน` });
      }
    }

    // ตรวจสอบรหัสสอบ (686001 - 686004)
    if (!/^68600[1-4]$/.test(examination_id)) {
      return res.status(400).json({ message: 'รหัสสอบไม่ถูกต้อง' });
    }
    const examIdNumber = Number(examination_id);

    // ตรวจสอบรูปแบบวันเกิด yyyy-mm-dd
    const birthdayRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!birthdayRegex.test(birthday)) {
      return res.status(400).json({ message: 'รูปแบบวันเกิดไม่ถูกต้อง (ควรเป็น yyyy-mm-dd)' });
    }

    // กำหนดค่า default ให้ seat และ exam_status เป็น null หากไม่มีค่า (รองรับ DB)
    const seatValue = seat === undefined || seat === '' ? null : seat;
    const examStatusValue = exam_status === undefined || exam_status === '' ? null : exam_status;

    // สร้างชื่อตาราง dynamic ตาม examination_id
    const tableName = `examinee_${examination_id}`;

    // แสดง log ข้อมูลที่จะ insert
    console.log("📝 ข้อมูลที่จะบันทึก:", {
      prefix,
      firstname,
      lastname,
      birthday,
      thai_id,
      phone_number,
      email,
      province,
      district,
      Subdistrict,
      zipcode,
      Additional,
      enrollment_status,
      payment_status,
      exam_status: examStatusValue,
      seat: seatValue,
      examination_id: examIdNumber
    });

    // เตรียมคำสั่ง SQL insert
    const sql = `
      INSERT INTO \`${tableName}\`
      (prefix, firstname, lastname, birthday, thai_id, phone_number, email,
       province, district, Subdistrict, zipcode, Additional,
       enrollment_status, payment_status, exam_status, seat, examination_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // เชื่อมต่อฐานข้อมูล
    const db = await getDB();

    // รันคำสั่ง INSERT
    const [result] = await db.query(sql, [
      prefix,
      firstname,
      lastname,
      birthday,
      thai_id,
      phone_number,
      email,
      province,
      district,
      Subdistrict,
      zipcode,
      Additional,
      enrollment_status,
      payment_status,
      examStatusValue,
      seatValue,
      examIdNumber
    ]);

    console.log(`✅ บันทึกข้อมูลสำเร็จในตาราง ${tableName}:`, result);

    // ตอบกลับ success
    return res.status(200).json({
      message: `บันทึกข้อมูลในตาราง ${tableName} สำเร็จ!`,
      insertId: result.insertId
    });

  } catch (error) {
    // แสดง error ใน console และตอบกลับ พร้อมส่งรายละเอียด error เพื่อช่วย debug
    console.error('❌ เกิดข้อผิดพลาดใน router POST /:', error);

    return res.status(500).json({
      message: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล',
      error: error.message,
      stack: error.stack
    });
  }
});

module.exports = router;
