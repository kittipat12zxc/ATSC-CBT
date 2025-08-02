const express = require('express');
const getDB = require('../../models/DataBase');
const router = express.Router();

// 
router.post('/validatePassword', async (req, res) => {
    const { ExamineeID, Password } = req.body;
    console.log("🔍 Checking Login:", { ExamineeID, Password });

    try {
        const db = await getDB();

        const [rows] = await db.query(`SELECT examination_id, start_datetime, duration_minutes FROM examination`);

        const promises = rows.map(async (row) => {
            const ExamID = row.examination_id;
            const sql = `SELECT examinee_id, status FROM examinee_${ExamID} WHERE examinee_id = ? AND password = ?`;
            console.log("examID:", ExamID);

            try {
                const [results] = await db.query(sql, [ExamineeID, Password]);

                if (results.length > 0) {
                    const rowData = results[0];
                    return {
                        Validation: true,
                        ExamineeID,
                        Status: rowData.status,
                        DateOfExamination: row.start_datetime,
                        ExaminationID: ExamID,
                        TimeOut: row.duration_minutes
                    };
                } else {
                    return null;
                }
            } catch (err) {
                console.error(`❌ Query error on Examinee${ExamID}:`, err);
                return null;
            }
        });

        const data = await Promise.all(promises);
        const filtered = data.filter(item => item !== null);
        console.log("✅ Data:", filtered);

        res.status(200).json({ data: filtered });

    } catch (err) {
        console.error("❌ General error:", err);
        res.status(500).json({ error: "Database error" });
    }
});

module.exports = router;