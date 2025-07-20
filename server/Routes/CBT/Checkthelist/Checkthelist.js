const express = require('express');
const getDB = require('../../../models/DataBase');
const cors = require('cors');

const router = express.Router();  // เพิ่มบรรทัดนี้

// ไม่ต้องใช้ app.use(cors()) ที่นี่เพราะทำใน server.js แล้ว

// สร้าง route รับเลขบัตรประชาชน ตรวจสอบใน DB
router.get('/:thai_id', async (req, res) => {
  const thai_id = req.params.thai_id;
  try {
    const connection = await getDB();
    const [rows] = await connection.execute(
      'SELECT examinee_id, thai_id, firstname, lastname, exam_place, exam_room FROM examinee WHERE thai_id = ?',
      [thai_id]
    );
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
