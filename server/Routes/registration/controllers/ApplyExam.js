const express = require('express');
const getDB = require('../../../models/DataBase'); // Import getDB function

const router = express.Router();

router.post('/', async (req, res) => {
  const {
    prefix ,firstName, lastName, birthday, thai_id,
    phone_number, email, province, district, Subdistrict,
    zipcode, Additional
  } = req.body || '';

  const sql = `
    INSERT INTO exam_enrollments 
    (prefix, firstName, lastName, birthday, thai_id, phone_number, email, province, district, Subdistrict, zipcode, Additional) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  try {
    const db = await getDB()
    const [result] = await db.query(sql, [prefix ,firstName, lastName, birthday, thai_id,
    phone_number, email, province, district, Subdistrict,
    zipcode, Additional]);
    return res.json({ message: 'บันทึกข้อมูลสำเร็จ!' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'เกิดข้อผิดพลาด' });
  }
});

module.exports = router;