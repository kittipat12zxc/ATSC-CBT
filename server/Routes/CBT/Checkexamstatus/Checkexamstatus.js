const express = require('express');
const router = express.Router();
const getDB = require('../../../models/DataBase');

router.post('/', async (req, res) => {
  const { citizenId } = req.body;

  try {
    const db = await getDB();

    // 1. ตรวจสอบ examinee จาก thai_id
    const [examineeRows] = await db.execute(
      `SELECT * FROM examinee WHERE thai_id = ?`,
      [citizenId]
    );

    if (examineeRows.length === 0) {
      return res.json({ success: false, message: 'เลขบัตรประจำตัวประชาชนไม่ถูกต้อง' });
    }

    const examinee = examineeRows[0];

    // 2. ดึงข้อมูลชุดข้อสอบจาก examination_id
    const [examRows] = await db.execute(
      `SELECT * FROM examination WHERE examination_id = ?`,
      [examinee.examination_id]
    );

    if (examRows.length === 0) {
      return res.json({ success: false, message: 'ไม่พบข้อมูลชุดข้อสอบ' });
    }

    const exam = examRows[0];

    // 3. แปลงสถานะ
    const statusMap = {
      pending: 'รอสอบ',
      done: 'สอบแล้ว',
    };

    return res.json({
      success: true,
      data: {
        examination_id: exam.examination_id,
        subject: exam.exam_set_name,
        total: exam.question_count,
        duration: exam.duration_minutes,
        status: statusMap[examinee.status] || 'ไม่ทราบสถานะ'
      }
    });

  } catch (err) {
    console.error('❌ Database error:', err);
    return res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
