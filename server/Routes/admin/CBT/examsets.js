const express = require('express');
const router = express.Router();
const getDB = require('../../../models/DataBase.js');
const { DateTime } = require('luxon');

// ฟังก์ชั่นเช็คเเบบฟอม

function validateExamInput(data, checkID = false) {
   const {
    examination_id,
    exam_set_name,
    details,
    DurationMinutes,
    question_count,
    total_score
  } = data;

  if (checkID && (!examination_id || typeof examination_id !== 'string' || examination_id.trim() === '')) {
    return 'กรุณากรอก ExaminationID ให้ถูกต้อง';
  }
  if (!exam_set_name || typeof exam_set_name !== 'string' || exam_set_name.trim() === '') {
    return 'กรุณากรอกชื่อชุดข้อสอบ';
  }
  if (!details || typeof details !== 'string' || details.trim() === '') {
    return 'กรุณากรอกรายละเอียด';
  }
  if (
  typeof DurationMinutes !== 'string' ||          
  DurationMinutes.trim() === '' ||                
  !/^\d{2}:\d{2}:\d{2}$/.test(DurationMinutes)    
) {
  return "เวลา DurationMinutes ต้องอยู่ในรูปแบบ HH:MM:SS";
}
if (typeof question_count !== 'number' || question_count <= 0) {
  return 'QuestionCount ต้องเป็นตัวเลขบวก';
}
if (typeof total_score !== 'number' || total_score <= 0) {
    return 'TotalScore ต้องเป็นตัวเลขบวก';
  }
  return null;

}


// ดึง data จากฐานข้อมูล examination 
router.get("/", async (req, res) => {
  const examinationQuery = `
    SELECT 
      examination_id, exam_set_name AS exam_set_name,details, duration_minutes,question_count, total_score, start_datetime, end_datetime AS result_date FROM examination;
  `;

  try {
    const db = await getDB();
    const [rows] = await db.query(examinationQuery);



    res.status(200).json(rows); 
  } catch (error) {
    console.error("Database query failed:", error);
    res.status(500).json({ message: "Failed to fetch data from the database examination" });
  }
});


// เพิ่มชุดข้อสอบ
router.post('/', async (req, res) => {
  const validationError = validateExamInput(req.body, true);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const {
    examination_id,
    exam_set_name,
    details,
    DurationMinutes,
    question_count,
    total_score,
    start_datetime,
    result_date
  } = req.body;

  const sql = `
    INSERT INTO examination 
    (examination_id, exam_set_name, details, duration_minutes, question_count, total_score, start_datetime, end_datetime)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    const db = await getDB();
    await db.query(sql, [
      examination_id.trim(),
      exam_set_name.trim(),
      details.trim(),
      DurationMinutes,
      question_count,
      total_score,
      start_datetime,
      result_date
    ]);

    res.status(201).json({ message: "เพิ่มชุดข้อสอบสำเร็จ", id: examination_id });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ error: "รหัสข้อสอบนี้มีอยู่แล้ว" });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
});

// เเก้ไขชุดข้อสอบ
router.put('/:id', async (req, res) => {
  const examID = req.params.id.trim();
  const validationError = validateExamInput(req.body, false);
  if (validationError) return res.status(400).json({ error: validationError });
  const {
    exam_set_name,
    details,
    DurationMinutes,
    question_count,
    total_score,
    start_datetime ,
    end_datetime
  } = req.body;
  const sql = `
    UPDATE examination 
    SET exam_set_name = ?, details = ?, duration_minutes = ?, question_count = ?, total_score = ?, start_datetime = ?, end_datetime = ?
    WHERE examination_id = ?
  `;
  try {
    const db = await getDB();
    const [result] = await db.query(sql, [
      exam_set_name.trim(),
      details.trim(),
      DurationMinutes,
      question_count,
      total_score,
      start_datetime,
      end_datetime,
      examID
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "ไม่พบชุดข้อสอบที่ต้องการแก้ไข" });
    }
    res.json({ message: "อัปเดตชุดข้อสอบสำเร็จ" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ลบชุดข้อสอบ
router.delete('/:examID/:adminID', async (req, res) => {
  const { examID, adminID } = req.params;

  
  if (!examID || !adminID) {
    return res.status(400).json({ message: "Missing Exam ID or Admin ID in the request." });
  }

  
  console.log(`Admin with ID [${adminID}] is attempting to delete exam with ID [${examID}]`);

  const sql = `DELETE FROM examination WHERE examination_id = ?`;

  try {
    const db = await getDB();
    const [result] = await db.query(sql, [examID]);

   
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "ไม่พบชุดข้อสอบที่ต้องการลบ (Exam set not found)" });
    }

    
    res.status(200).json({ message: `ลบชุดข้อสอบ ID ${examID} สำเร็จ` });

  } catch (err) {
    
    console.error("Database deletion error:", err);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในฝั่งเซิร์ฟเวอร์ (Server error during deletion)" });
  }
});













module.exports = router;
