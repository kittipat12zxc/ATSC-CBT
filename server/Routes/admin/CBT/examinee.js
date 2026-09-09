const express = require('express');
const router = express.Router();
const getDB = require('../../../models/DataBase.js')
const mysql = require('mysql2');
const multer = require('multer');
const xlsx = require('xlsx');
const fs = require('fs');

const upload = multer({ dest: 'uploads_examinee/' });

// ✅ สร้างตารางผู้เข้าสอบใหม่ตามรหัสชุดข้อสอบ
router.post('/api/create-examinee-table/:examID', async (req, res) => {
  const examID = req.params.examID;
  if (!/^\d+$/.test(examID)) {
    return res.status(400).json({ error: 'รูปแบบ examID ไม่ถูกต้อง' });
  }
  const tableName = `examinee_${examID}`;
  const escapedTable = mysql.escapeId(tableName);

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS ${escapedTable} (
      examinee_id INT AUTO_INCREMENT PRIMARY KEY,
      firstname VARCHAR(255),
      lastname VARCHAR(255),
      thai_id VARCHAR(13) UNIQUE,
      birthday DATE,
      email VARCHAR(255) ,
      password VARCHAR(255) NOT NULL,
      examination_id INT,
      status VARCHAR(50) DEFAULT 'not_started',
      score FLOAT DEFAULT 0,
      exam_place VARCHAR(50),
      exam_room INT
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;

  try {
    const db = await getDB();
    await db.query(createTableQuery);
    res.json({ message: `✅ สร้างตาราง ${tableName} แล้วหรือมีอยู่แล้ว` });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: "error" });
  }
});

// ✅ ดึงผู้เข้าสอบทั้งหมด
router.get('/api/examinees/:examID', async (req, res) => {
  const examID = req.params.examID;
  if (!/^\d+$/.test(examID)) {
    return res.status(400).json({ error: 'รูปแบบ examID ไม่ถูกต้อง' });
  }
  const tableName = `examinee_${examID}`;
  const escapedTable = mysql.escapeId(tableName);

  try {
    const db = await getDB();
    const [rows] = await db.query(`SELECT * FROM ${escapedTable}`);
    res.json(rows);
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: "error" });
  }
});

// ✅ เพิ่มผู้เข้าสอบ
router.post('/api/examinee/:examID', async (req, res) => {
  const examID = req.params.examID;
  if (!/^\d+$/.test(examID)) {
    return res.status(400).json({ error: 'รูปแบบ examID ไม่ถูกต้อง' });
  }
  const tableName = `Examinee_${examID}`;
  const escapedTable = mysql.escapeId(tableName);

  const {
    Full_Name, Thai_ID, Birthday,
    Email, Password, Status = 'not_started', Score = 0, Place, Room
  } = req.body;

  if (!/^\d{13}$/.test(Thai_ID)) {
    return res.status(400).json({ error: 'Thai_ID ต้องมี 13 หลัก' });
  }

  const insertQuery = `
    INSERT INTO ${escapedTable} (
      firstname, lastname, thai_id, birthday,
      email, password, examination_id, status, score, exam_place, exam_room
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    const db = await getDB();
    const [firstname, ...rest] = Full_Name.trim().split(" ");
    const lastname = rest.join(" ");
    await db.query(insertQuery, [
      firstname, lastname, Thai_ID, Birthday,
      Email, Password, examID, Status, Score, Place, Room
    ]);
    res.json({ message: '✅ เพิ่มผู้เข้าสอบสำเร็จ' });
  } catch (err) {
    console.error('❌ เพิ่มผู้เข้าสอบล้มเหลว:', err.message);
    res.status(500).json({ error: 'เพิ่มผู้เข้าสอบล้มเหลว' });
  }
});

// ✅ แก้ไขผู้เข้าสอบ
router.put('/api/examinees/:examID/:examineeID', async (req, res) => {
  const { examID, examineeID } = req.params;
  if (!/^\d+$/.test(examID)) {
    return res.status(400).json({ error: 'รูปแบบ examID ไม่ถูกต้อง' });
  }
  const tableName = `examinee_${examID}`;
  const escapedTable = mysql.escapeId(tableName);

  const {
    Full_Name, Thai_ID, Birthday,
    Email, Password, Status = 'not_started', Score = 0, Place, Room
  } = req.body;

  const updateQuery = `
    UPDATE ${escapedTable}
    SET firstname = ?, lastname = ?, thai_id = ?, birthday = ?, email = ?,
       password = ?, examination_id = ?, status = ?, score = ?, exam_place = ?, exam_room = ?
    WHERE examinee_id = ?
  `;

  try {
    const db = await getDB();
    const [firstname, ...rest] = Full_Name.trim().split(" ");
    const lastname = rest.join(" ");
    await db.query(updateQuery, [
      firstname, lastname, Thai_ID, Birthday, Email,
      Password, examID, Status, Score, Place, Room, examineeID
    ]);
    res.json({ message: '✅ แก้ไขผู้เข้าสอบสำเร็จ' });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: "error" });
  }
});

// ✅ ลบผู้เข้าสอบ
router.delete('/api/examinees/:examID/:examineeID', async (req, res) => {
  const { examID, examineeID } = req.params;
  if (!/^\d+$/.test(examID)) {
    return res.status(400).json({ error: 'รูปแบบ examID ไม่ถูกต้อง' });
  }
  const tableName = `examinee_${examID}`;
  const escapedTable = mysql.escapeId(tableName);

  const deleteQuery = `DELETE FROM ${escapedTable} WHERE examinee_id = ?`;

  try {
    const db = await getDB();
    await db.query(deleteQuery, [examineeID]);
    res.json({ message: '✅ ลบผู้เข้าสอบสำเร็จ' });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: "error" });
  }
});

// ✅ นำเข้าคำถามจาก Excel
router.post('/api/examinees/import/:examID', upload.single('file'), async (req, res) => {
  const examID = req.params.examID.trim();
  const filePath = req.file.path;
  const tableName = `examinee_${examID}`;
  console.log("FilePath:", filePath);

  try {
    const db = await getDB();
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const rawdata = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const data = rawdata.map(row => ({
      examinee_id: row.id || row.examinee_id || "",
      firstname: row.Firstname || row.firstname || "",
      lastname: row.Lastname || row.lastname || "",
      thai_id: row.ThaiID || row.thai_id || "",
      birthday: row.Birthday || row.birthday || "",
      email: row.Email || row.email || "",
      password: row.Password || row.password || "",
      examination_id: row.ExaminationID || row.examinationid || "",
      status: row.Status || row.status || "",
      score: row.Score || row.score || "",
      exam_place: row.location || row.Place || row.Location || row.place || "",
      exam_room: row.Room || row.room || ""
    }));

    function convertThaiDateToMySQL(thaiDate) {
      if (!thaiDate) return null;
      const [day, month, yearThai] = thaiDate.split('/');
      const year = parseInt(yearThai, 10) - 543; // แปลงจาก พ.ศ. → ค.ศ.
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }

    const values = data
      .filter(row => row.examinee_id && row.firstname && row.lastname && row.thai_id && row.birthday && row.email && row.password !== undefined && row.examination_id && row.exam_place && row.exam_room)
      .map(row => [row.examinee_id, row.firstname, row.lastname, row.thai_id, convertThaiDateToMySQL(row.birthday), row.email, String(row.password), row.examination_id, row.status || 'pending', row.score || 0 , row.exam_place || '', row.exam_room || '']);

    console.log("values:", values);
    if (values.length === 0) throw new Error("ไม่มีข้อมูลที่นำเข้าได้");

    const sql = `
      INSERT INTO \`${tableName}\` (examinee_id, firstname, lastname, thai_id, birthday, email, password, examination_id, status, score, exam_place, exam_room)
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