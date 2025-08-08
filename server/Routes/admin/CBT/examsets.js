const express = require('express');
const router = express.Router();
const getDB = require('../../../models/DataBase.js')
const { DateTime } = require('luxon');
const mysql = require('mysql2');

function isValidDate(dateStr) {
  const date = new Date(dateStr);
  return !isNaN(date.getTime());
}

function validateExamInput(data, checkID = false) {
  const {
    ExaminationID,
    ExaminationName,
    Details,
    DurationMinutes,
    QuestionCount,
    TotalScore,
    StartDateTime,
    ResultDate
  } = data;

  if (checkID && (!ExaminationID || typeof ExaminationID !== 'string' || ExaminationID.trim() === '')) {
    return 'กรุณากรอก ExaminationID ให้ถูกต้อง';
  }
  if (!ExaminationName || typeof ExaminationName !== 'string' || ExaminationName.trim() === '') {
    return 'กรุณากรอกชื่อชุดข้อสอบ';
  }
  if (!Details || typeof Details !== 'string' || Details.trim() === '') {
    return 'กรุณากรอกรายละเอียด';
  }
  if (!isValidDate(StartDateTime)) {
    return 'StartDateTime ไม่ใช่วันที่ที่ถูกต้อง';
  }
  if (!isValidDate(ResultDate)) {
    return 'ResultDate ไม่ใช่วันที่ที่ถูกต้อง';
  }
  if (
    typeof DurationMinutes !== 'string' ||          // ไม่ใช่ string
    DurationMinutes.trim() === '' ||                // เป็น string ว่าง
    !isNaN(Number(DurationMinutes))                 // เป็น string ที่ดูเหมือนตัวเลข เช่น "90"
  ) {
    return 'DurationMinutes ต้องเป็นข้อความ (ห้ามเป็นตัวเลข)';
  }
  if (typeof QuestionCount !== 'number' || QuestionCount <= 0) {
    return 'QuestionCount ต้องเป็นตัวเลขบวก';
  }
  if (typeof TotalScore !== 'number' || TotalScore <= 0) {
    return 'TotalScore ต้องเป็นตัวเลขบวก';
  }
  return null;
}

router.get('/', async (req, res) => {
  try {
    const db = await getDB();
    const [rows] = await db.query(`SELECT * FROM examination`);
    const result = rows.map(row => ({
      examination_id: row.examination_id,
      examination_name: row.examination_name,
      details: row.details,
      duration_minutes: row.duration_minutes,
      question_count: row.question_count,
      total_score: row.total_score,
      start_datetime: DateTime.fromISO(row.start_datetime.toISOString(), { zone: 'utc' })
                      .setZone('Asia/Bangkok')
                      .toISO({ suppressMilliseconds: true }),
      result_date: DateTime.fromISO(row.result_date.toISOString(), { zone: 'utc' })
                    .setZone('Asia/Bangkok')
                    .toISO({ suppressMilliseconds: true })
    }));
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  const examID = req.params.id.trim();
  try {
    const db = await getDB();
    const [rows] = await db.query(`SELECT * FROM examination WHERE examination_id = ?`, [examID]);
    if (rows.length === 0) return res.status(404).json({ error: "ไม่พบชุดข้อสอบ" });
    const row = rows[0];
    res.json({
      examination_id: row.examination_id,
      examination_name: row.examination_name,
      details: row.details,
      duration_minutes: row.duration_minutes,
      question_count: row.question_count,
      total_score: row.total_score,
      start_datetime: row.start_datetime,
      result_date: row.result_date
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const validationError = validateExamInput(req.body, true);
  if (validationError) return res.status(400).json({ error: validationError });
  const {
    ExaminationID,
    ExaminationName,
    Details,
    DurationMinutes,
    QuestionCount,
    TotalScore,
    StartDateTime,
    ResultDate
  } = req.body;
  const sql = `
    INSERT INTO examination 
    (examination_id, exam_set_name, details, duration_minutes, question_count, total_score, start_datetime, end_datetime)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  try {
    const db = await getDB();
    await db.query(sql, [
      ExaminationID.trim(),
      ExaminationName.trim(),
      Details.trim(),
      DurationMinutes,
      QuestionCount,
      TotalScore,
      StartDateTime,
      ResultDate
    ]);
    res.status(201).json({ message: "เพิ่มชุดข้อสอบสำเร็จ", id: ExaminationID });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ error: "รหัสข้อสอบนี้มีอยู่แล้ว" });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
});

router.put('/:id', async (req, res) => {
  const examID = req.params.id.trim();
  const validationError = validateExamInput(req.body, false);
  if (validationError) return res.status(400).json({ error: validationError });
  const {
    ExaminationName,
    Details,
    DurationMinutes,
    QuestionCount,
    TotalScore,
    StartDateTime,
    ResultDate
  } = req.body;
  const sql = `
    UPDATE examination 
    SET examination_name = ?, details = ?, duration_minutes = ?, question_count = ?, total_score = ?, start_datetime = ?, result_date = ?
    WHERE examination_id = ?
  `;
  try {
    const db = await getDB();
    const [result] = await db.query(sql, [
      ExaminationName.trim(),
      Details.trim(),
      DurationMinutes,
      QuestionCount,
      TotalScore,
      StartDateTime,
      ResultDate,
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

router.delete('/:id/:ids', async (req, res) => {
  const examID = req.params.id.trim();
  const AdminID = req.params.ids.trim();
  console.log('admin:', AdminID)
  let db;

  try {
    db = await getDB();
    await db.beginTransaction();

    // 1) ดึงข้อมูลชุดข้อสอบ
    const [examRows] = await db.query(`SELECT * FROM examination WHERE examination_id = ?`, [examID]);
    if (examRows.length === 0) {
      await db.rollback();
      return res.status(404).json({ error: "ไม่พบชุดข้อสอบที่ต้องการลบ" });
    }
    const examData = examRows[0];

    // 2) เก็บข้อมูลลง deleted_examinations
    const insertExamSql = `
      INSERT INTO deleted_examinations 
      (examination_id, examination_name, details, duration_minutes, question_count, total_score, start_datetime, result_date, deleted_at, admin_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const deletedAt = new Date();

    await db.query(insertExamSql, [
      examData.examination_id,
      examData.examination_name,
      examData.details,
      examData.duration_minutes,
      examData.question_count,
      examData.total_score,
      examData.start_datetime,
      examData.result_date,
      deletedAt,
      AdminID
    ]);

    // 3) ดึงข้อมูล public_relations ที่เกี่ยวข้อง
    const [relationRows] = await db.query(`SELECT * FROM public_relations WHERE examination_id = ?`, [examID]);

    // 4) ถ้ามีข้อมูล public_relations ก็ย้ายไป deleted_public_relations
    if (relationRows.length > 0) {
      const insertRelationSql = `
        INSERT INTO deleted_public_relations
        (public_relation_id, location, title, details, color, examination_id)
        VALUES ?
      `;

      // เตรียมค่า bulk insert
      const relationValues = relationRows.map(rel => ([
        rel.public_relation_id,  // ✅ ถูกต้อง
        rel.location,
        rel.title,
        rel.details,
        rel.color,
        rel.examination_id
      ]));

      await db.query(insertRelationSql, [relationValues]);
    }

    // 5) ลบข้อมูล public_relations ที่เกี่ยวข้อง
    await db.query(`DELETE FROM public_relations WHERE examination_id = ?`, [examID]);

    // 6) ลบชุดข้อสอบ
    await db.query(`DELETE FROM examination WHERE examination_id = ?`, [examID]);

    await db.commit();
    res.json({ message: "ลบชุดข้อสอบและข้อมูลประชาสัมพันธ์ที่เกี่ยวข้อง พร้อมเก็บประวัติเรียบร้อยแล้ว" });

  } catch (err) {
    if (db) await db.rollback();
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;