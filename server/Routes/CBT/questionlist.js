const express = require('express');
const router = express.Router();
const getDB = require('../../models/DataBase');

router.post('/questions', async (req, res) => {
    const { ExamineeID, ExaminationID } = req.body;
    console.log('Received request with:', { ExamineeID, ExaminationID });

    if (!ExamineeID || !ExaminationID) {
        return res.status(400).json({ error: 'Missing ExamineeID or ExaminationID' });
    }

    try {
        const connection = await getDB();
        // ฟังชันค์เช็ค table
        async function checkTableExists(db, tableName) {
            const [rows] = await db.execute(
                `SELECT COUNT(*) AS count
                 FROM information_schema.tables
                 WHERE table_schema = ? AND table_name = ?`,
                ['ATSC', tableName]
            );
            return rows[0].count > 0;
        }

        const table_mcq = await checkTableExists(connection, `question_mcq_${ExaminationID}`);//เช็ค table question_mcq
        const table_essay = await checkTableExists(connection, `question_essay_${ExaminationID}`);//เช็ค table question_essay

        console.log("table_mcq:", table_mcq);
        console.log("table_essay:", table_essay);

        // ดึงข้อมูลที่ต้องใช้ตามปกติอยู่แล้ว
        const [examInfoRows] = await connection.execute(`
            SELECT e.examination_id, e.firstName, e.lastName, ex.start_datetime,
                   ex.duration_minutes, ex.examination_name, ex.details
            FROM examinee_${ExaminationID} e
            JOIN examination ex ON e.examination_id = ex.examination_id
            WHERE e.examinee_id = ? AND e.examination_id = ?
        `, [ExamineeID, ExaminationID]);
        
        //ตรวจสอบว่ามีทั้ง 2 table ไหม
        if (!table_mcq && !table_essay) {
            await connection.end();
            return res.status(404).json({ error: 'ไม่พบตารางคำถาม' });
        }

        // สร้างตัวแปรที่จะเก็บข้อปรนัยและอัตนัย
        let mcqQuestions = [], essayQuestions = [];

        //ถ้ามี table MCQ ให้เก็บไว้ในตัวแปร mcqQuestions
        if (table_mcq) {
            const [mcqRows] = await connection.execute(
                `SELECT *, 'mcq' AS question_type FROM question_mcq_${ExaminationID}`//เพิ่มคอลัม question_type
            );
            mcqQuestions = mcqRows;
        }

        //ถ้ามี table essay ให้เก็บไว้ในตัวแปร essayQuestions
        if (table_essay) {
            const [essayRows] = await connection.execute(
                `SELECT *, 'essay' AS question_type FROM question_essay_${ExaminationID}`//เพิ่มคอลัม question_type
            );
            essayQuestions = essayRows;
        }

        await connection.end();

        // รวม mcq กับ essay แล้วแปลงภาพ
        const allQuestions = [...mcqQuestions, ...essayQuestions].map((row, index) => {
            let imageSrc = null;
            if (row.image_url) {
                const base64 = Buffer.from(row.image_url).toString('base64');
                imageSrc = `data:image/png;base64,${base64}`;
            }
            return {
                ...row,
                no: index + 1,
                image_url: imageSrc
            };
        });

        res.json({
            examInfo: examInfoRows[0] || {},
            questions: allQuestions
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

module.exports = router;
