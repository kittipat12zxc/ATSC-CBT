const express = require("express");
const getDB = require("../../models/DataBase");
const router = express.Router();

router.post("/updateExam", async (req, res) => {
    const { ExamineeID, accuracy, answersMCQ, answersEssay, shuffledQuestionsChonies, shuffledQuestionsWrite, ExaminationID } = req.body;

    if (!ExamineeID || !ExaminationID) {
        return res.status(400).send({ error: "Missing ExamineeID or ExaminationID" });
    }

    try {
        const db = await getDB();

        const [rows] = await db.execute(
            `SELECT status FROM examinee_${ExaminationID} WHERE examinee_id = ?`,
            [ExamineeID]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: "Examinee not found" });
        }

        if (rows[0].Status === 'Done') {
            return res.status(400).json({ error: "Exam already submitted." });
        }

        // อัปเดต Status เป็น Done
        await db.execute(
            `UPDATE examinee_${ExaminationID} SET Status = 'Done' WHERE examinee_id = ?`,
            [ExamineeID]
        );
        console.log(`✅ Updated status for ExamineeID ${ExamineeID}`);

        // อัปเดตคำตอบที่ถูกต้อง
        if (accuracy !== undefined) {
            await db.execute(
                `UPDATE examinee_${ExaminationID} SET accuracy = ? WHERE examinee_id = ?`,
                [accuracy, ExamineeID]
            );
            console.log(`✅ Accuracy updated for ${ExamineeID}`);
        }

        // ดำเนินการสร้างตารางคำตอบ และเพิ่มคำตอบ
        await insertAnswersIntoNewTable(db, ExamineeID, answersMCQ, answersEssay, shuffledQuestionsChonies, shuffledQuestionsWrite, res);
        await db.end();
    } catch (err) {
        console.error("❌ Error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

async function insertAnswersIntoNewTable(db, ExamineeID, answersMCQ, answersEssay, shuffledQuestionsChonies, shuffledQuestionsWrite, res) {
    const tableName = `answers_${ExamineeID}`;

    try {
        await db.execute(`
            CREATE TABLE IF NOT EXISTS ${tableName} (
                order_of_answer INT PRIMARY KEY,
                examinee_id INT,
                questions_text TEXT,
                answer_text TEXT,
                question_type VARCHAR(11)
            )
        `);
        console.log(`✅ Created table ${tableName}`);

        const insertSQL = `
            INSERT INTO ${tableName} (order_of_answer, examinee_id, answer_text, questions_text, question_type)
            VALUES (?, ?, ?, ?, ?)
        `;

        let insertErrors = [];
        let order = 0;

        // ✅ แทรก MCQ ก่อน
        for (const [index, answerText] of Object.entries(answersMCQ)) {
            const q = shuffledQuestionsChonies[parseInt(index)];
            const questionText = q?.questions_text || "";

            try {
                await db.execute(insertSQL, [order, ExamineeID, answerText, questionText, "mcq"]);
                console.log(`✅ Inserted MCQ answer ${order}`);
            } catch (err) {
                console.error(`❌ Failed to insert MCQ ${order}:`, err.message);
                insertErrors.push(order);
            }

            order++;
        }

        // ✅ ต่อด้วย Essay
        for (const [index, answerText] of Object.entries(answersEssay)) {
            const q = shuffledQuestionsWrite[parseInt(index)];
            const questionText = q?.questions_text || "";

            try {
                await db.execute(insertSQL, [order, ExamineeID, answerText, questionText, "essay"]);
                console.log(`✅ Inserted Essay answer ${order}`);
            } catch (err) {
                console.error(`❌ Failed to insert Essay ${order}:`, err.message);
                insertErrors.push(order);
            }

            order++;
        }

        if (insertErrors.length > 0) {
            return res.status(500).json({
                success: false,
                error: "Some answers failed to insert",
                failed: insertErrors
            });
        }

        return res.json({ success: true, table: tableName });

    } catch (err) {
        console.error("❌ Error creating/inserting into table:", err.message);
        return res.status(500).json({ error: "Failed to create or insert answer table" });
    }
}

module.exports = router;