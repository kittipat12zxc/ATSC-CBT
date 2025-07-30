const express = require('express');
const getDB = require('../../models/DataBase');
const router = express.Router();

// ✅ GET /api/PrintExam/search/:thai_id?id=686002
router.get('/:thai_id', async (req, res) => {
  const thai_id = req.params.thai_id.trim();
  const exam_id = req.query.id?.trim(); // รับ ?id=686002 จาก query string

  console.log('เลขบัตร:', thai_id);
  console.log('รหัสวิชา:', exam_id);

  // ตรวจสอบว่า exam_id ถูกต้อง (เช่น เป็นตัวเลข 6 หลัก และขึ้นต้นด้วย 686)
  if (!/^\d{6}$/.test(exam_id) || !exam_id.startsWith("686")) {
    return res.status(400).json({ message: 'รหัสวิชาผิดพลาด' });
  }

  const tableName = `examinee_${exam_id}`;

  try {
    const connection = await getDB();

    const [rows] = await connection.execute(
      `SELECT 
          e.enrollments_id, e.thai_id, e.firstname, e.lastname, e.province, e.examination_id,
          ex.exam_set_name, ex.details, ex.question_count, ex.duration_minutes, ex.total_score,
          ex.exam_place, ex.exam_building, ex.exam_room, ex.start_datetime, ex.end_datetime
       FROM ${tableName} e
       LEFT JOIN examination ex ON e.examination_id = ex.examination_id
       WHERE e.thai_id = ?`,
      [thai_id]
    );

    console.log('ผลลัพธ์จากฐานข้อมูล:', rows);
    await connection.end();

    if (rows.length === 0) {
      return res.status(404).json({ message: 'ไม่พบข้อมูลผู้เข้าสอบ' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล' });
  }
});

module.exports = router;
