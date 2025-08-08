const express = require('express');
const router = express.Router();
const getDB = require('../../../models/DataBase.js')
const multer = require('multer');
const xlsx = require('xlsx');
const fs = require('fs');

const upload = multer({ dest: 'uploads_exam/' });

function isValidTableName(name) {
  return /^[a-zA-Z0-9_]+$/.test(name);
}

// ✅ สร้างตารางคำถาม
router.post('/init/:examID', async (req, res) => {
  const examID = req.params.examID.trim();

  if (!isValidTableName(examID)) return res.status(400).json({ error: "รหัสชุดข้อสอบไม่ถูกต้อง" });

  const tableName = `question_${examID}`;
  const createSQL = `
    CREATE TABLE IF NOT EXISTS \`${tableName}\` (
      questions_id INT AUTO_INCREMENT PRIMARY KEY,
      questions_text TEXT NOT NULL,
      choices_one TEXT NOT NULL,
      choices_two TEXT NOT NULL,
      choices_three TEXT NOT NULL,
      choices_four TEXT NOT NULL,
      choices_five TEXT NOT NULL,
      is_correct TEXT NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;

  try {
    const db = await getDB();
    await db.query(createSQL);
    res.json({ message: `✅ สร้างตาราง ${tableName} สำเร็จหรือมีอยู่แล้ว` });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ ดึงคำถามทั้งหมด
router.get('/:examID', async (req, res) => {
  const examID = req.params.examID.trim();

  if (!isValidTableName(examID)) return res.status(400).json({ error: "รหัสชุดข้อสอบไม่ถูกต้อง" });

  try {
    const db = await getDB();
    const [rows] = await db.query(`SELECT * FROM \`question_${examID}\``);
    res.json(rows);
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ เพิ่มคำถามใหม่
router.post('/:examID', async (req, res) => {
  const examID = req.params.examID.trim();
  const { Question, Choice1, Choice2, Choice3, Choice4, Choice5, Answer } = req.body;

  const sql = `
    INSERT INTO \`question_${examID}\` (questions_text, choices_one, choices_two, choices_three, choices_four, choices_five, is_correct)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    const db = await getDB();
    const [result] = await db.query(sql, [Question, Choice1, Choice2, Choice3, Choice4, Choice5, Answer]);
    res.status(201).json({ message: "เพิ่มคำถามสำเร็จ", questionID: result.insertId });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ แก้ไขคำถาม
router.put('/:examID/:questionID', async (req, res) => {
  const { examID, questionID } = req.params;
  const { Question, Choice1, Choice2, Choice3, Choice4, Choice5, Answer } = req.body;

  const sql = `
    UPDATE \`question_${examID}\`
    SET questions_text = ?, choices_one = ?, choices_two = ?, choices_three = ?, choices_four = ?, choices_five = ?, is_correct = ?
    WHERE questions_id = ?
  `;

  try {
    const db = await getDB();
    await db.query(sql, [Question, Choice1, Choice2, Choice3, Choice4, Choice5, Answer, questionID]);
    res.json({ message: "อัปเดตคำถามสำเร็จ" });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ ลบคำถาม
router.delete('/:examID/:questionID', async (req, res) => {
  const { examID, questionID } = req.params;

  try {
    const db = await getDB();
    await db.query(`DELETE FROM \`question_${examID}\` WHERE questions_id = ?`, [questionID]);
    res.json({ message: "ลบคำถามสำเร็จ" });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ นำเข้าคำถามจาก Excel
router.post('/import/:examID', upload.single('file'), async (req, res) => {
  const examID = req.params.examID.trim();
  const filePath = req.file.path;
  const tableName = `question_${examID}`;
  console.log("FilePath:", filePath);

  try {
    const db = await getDB();
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const rawdata = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const data = rawdata.map(row => ({
      questions_text: row.Question || row.questions_text || "",
      choices_one: row.Choice1 || row.choices_one || "",
      choices_two: row.Choice2 || row.choices_two || "",
      choices_three: row.Choice3 || row.choices_three || "",
      choices_four: row.Choice4 || row.choices_four || "",
      choices_five: row.Choice5 || row.choices_five || "",
      is_correct: row.Answer || row.is_correct || ""
    }));

    const values = data
      .filter(row => row.questions_text && row.choices_one && row.choices_two && row.choices_three && row.choices_four && row.choices_five && row.is_correct)
      .map(row => [row.questions_text, row.choices_one, row.choices_two, row.choices_three, row.choices_four, row.choices_five, row.is_correct]);

    if (values.length === 0) throw new Error("ไม่มีข้อมูลที่นำเข้าได้");

    const sql = `
      INSERT INTO \`${tableName}\` (questions_text, choices_one, choices_two, choices_three, choices_four, choices_five, is_correct)
      VALUES ?
    `;

    await db.query(sql, [values]);
    fs.unlinkSync(filePath);
    res.json({ message: `✅ นำเข้าข้อมูล ${values.length} แถว สำเร็จ` });
  } catch (err) {
    console.error("❌ Import error:", err.message);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการนำเข้าข้อมูล" });
  }
});

module.exports = router;