
const express = require('express');
const router = express.Router();
const getDB = require('../../../models/DataBase.js');
const fs = require('fs');
const multer = require('multer');
const xlsx = require('xlsx');

const upload = multer({ dest: 'uploads_exam/' });

// เช็คว่าชื่อตารางถูกไหม
function isValidTableName(name) {
    return /^[a-zA-Z0-9_]+$/.test(name);
}

// ดึงข้อมูลจากฐานข้อมูล question_mcq_ไอดี
router.get('/:examID', async (req, res) => {
    const examID = req.params.examID.trim();

    if (!isValidTableName(examID)) return res.status(400).json({ error: "รหัสชุดข้อสอบไม่ถูกต้อง" });

    const questionQuery =
        `SELECT questions_mcq_id, questions_text, choices_one, choices_two, choices_three, choices_four, choices_five, is_correct FROM \`question_mcq_${examID}\``;

    try {
        const db = await getDB();
        const [rows] = await db.query(questionQuery);
        res.json(rows);
    } catch (err) {
        console.error("❌ Error fetching questions:", err);
        
        if (err.code === 'ER_NO_SUCH_TABLE') {
            return res.status(404).json({ error: `ไม่พบตารางข้อสอบสำหรับ ID: ${examID}` });
        }
        res.status(500).json({ error: "เกิดข้อผิดพลาดฝั่งเซิร์ฟเวอร์" });
    }
});


// เพิ่มข้อสอบ
router.post('/:examID', async (req, res) => {
    const examID = req.params.examID.trim();
    if (!isValidTableName(examID)) return res.status(400).json({ error: "รหัสชุดข้อสอบไม่ถูกต้อง" });

    const { questions_text, choices_one, choices_two, choices_three, choices_four, choices_five, is_correct } = req.body;

    if (!questions_text || !choices_one || !choices_two || !choices_three || !choices_four || !is_correct) {
        return res.status(400).json({ error: "กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน" });
    }

    const tableName = `question_mcq_${examID}`;
    const sql = `
        INSERT INTO \`${tableName}\` 
        (questions_text, choices_one, choices_two, choices_three, choices_four, choices_five, is_correct)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [questions_text, choices_one, choices_two, choices_three, choices_four, choices_five || null, is_correct];

    try {
        const db = await getDB();
        await db.query(sql, values);
        res.status(201).json({ message: "เพิ่มคำถามสำเร็จ" });
    } catch (err) {
        console.error("❌ Error adding question:", err);
        res.status(500).json({ error: "เกิดข้อผิดพลาดในการเพิ่มคำถาม" });
    }
});


// เเก้ไขข้อสอบ
router.put('/:examID/:questionId', async (req, res) => {
    const { examID, questionId } = req.params;
    if (!isValidTableName(examID)) return res.status(400).json({ error: "รหัสชุดข้อสอบไม่ถูกต้อง" });

    const { questions_text, choices_one, choices_two, choices_three, choices_four, choices_five, is_correct } = req.body;

 
    if (!questions_text || !choices_one || !choices_two || !choices_three || !choices_four || !is_correct) {
        return res.status(400).json({ error: "กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน" });
    }

    const tableName = `question_mcq_${examID}`;
    const sql = `
        UPDATE \`${tableName}\` SET
        questions_text = ?, choices_one = ?, choices_two = ?, 
        choices_three = ?, choices_four = ?, choices_five = ?, is_correct = ?
        WHERE questions_mcq_id = ?
    `;
    const values = [questions_text, choices_one, choices_two, choices_three, choices_four, choices_five || null, is_correct, questionId];

    try {
        const db = await getDB();
        const [result] = await db.query(sql, values);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: `ไม่พบคำถาม ID ${questionId}` });
        }
        res.json({ message: `อัปเดตคำถาม ID ${questionId} สำเร็จ` });
    } catch (err) {
        console.error("❌ Error updating question:", err);
        res.status(500).json({ error: "เกิดข้อผิดพลาดในการอัปเดตคำถาม" });
    }
});


// ลบข้อสอบ

router.delete('/:examID/:questionId', async (req, res) => {
    const { examID, questionId } = req.params;
    if (!isValidTableName(examID)) return res.status(400).json({ error: "รหัสชุดข้อสอบไม่ถูกต้อง" });

    const tableName = `question_mcq_${examID}`;
    const sql = `DELETE FROM \`${tableName}\` WHERE questions_mcq_id = ?`;

    try {
        const db = await getDB();
        const [result] = await db.query(sql, [questionId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: `ไม่พบคำถาม ID ${questionId}` });
        }
        res.json({ message: `ลบคำถาม ID ${questionId} สำเร็จ` });
    } catch (err) {
        console.error("❌ Error deleting question:", err);
        res.status(500).json({ error: "เกิดข้อผิดพลาดในการลบคำถาม" });
    }
});



// Import Excel
router.post('/import/:examID', upload.single('file'), async (req, res) => {
    const examID = req.params.examID.trim();
    const filePath = req.file?.path;

    if (!isValidTableName(examID)) {
        return res.status(400).json({ error: "รหัสชุดข้อสอบไม่ถูกต้อง" });
    }
    if (!filePath) {
        return res.status(400).json({ error: "ไม่พบไฟล์ที่อัปโหลด" });
    }

    const tableName = `question_mcq_${examID}`;
    console.log("📂 Importing from:", filePath);

    try {
        const db = await getDB();
        await db.query(`DELETE FROM \`${tableName}\``);
        await db.query(`ALTER TABLE \`${tableName}\` AUTO_INCREMENT = 1`);

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
            .filter(row => row.questions_text && row.is_correct) 
            .map(row => [
                null, 
                row.questions_text, row.choices_one, row.choices_two,
                row.choices_three, row.choices_four, row.choices_five, row.is_correct
            ]);
            
        if (values.length === 0) throw new Error("ไม่มีข้อมูลที่นำเข้าได้ในไฟล์ Excel");

        const sql = `
          INSERT INTO \`${tableName}\` 
          (questions_mcq_id, questions_text, choices_one, choices_two, choices_three, choices_four, choices_five, is_correct)
          VALUES ?
        `;

        await db.query(sql, [values]);

        fs.unlinkSync(filePath);
        res.json({ message: `✅ นำเข้าข้อมูล ${values.length} แถว สำเร็จ` });

    } catch (err) {
        console.error("❌ Import error:", err.message);
        res.status(500).json({ error: "เกิดข้อผิดพลาดในการนำเข้าข้อมูล: " + err.message });
    }
});

module.exports = router;