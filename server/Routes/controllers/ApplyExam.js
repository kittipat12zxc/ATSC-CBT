import express from 'express';
import db from '../../models/db.js';

const router = express.Router();

router.post('/', (req, res) => {
  const {
    prefix, firstName, lastName, birthday, thai_id,
    phone_number, email, province, district, Subdistrict,
    zipcode, Additional
  } = req.body;

  const sql = `
    INSERT INTO exam_enrollments 
    (prefix, firstName, lastName, birthday, thai_id, phone_number, email, province, district, Subdistrict, zipcode, Additional) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [
    prefix, firstName, lastName, birthday, thai_id,
    phone_number, email, province, district, Subdistrict,
    zipcode, Additional
  ], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'เกิดข้อผิดพลาด' });
    }
    return res.json({ message: 'บันทึกข้อมูลสำเร็จ!' });
  });
});

export default router;