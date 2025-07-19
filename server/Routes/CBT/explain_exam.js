const express = require('express');
const router = express.Router();
const getDB = require('../../models/DataBase');

router.post('/ExplainExam', async (req, res) => {
    const { ExaminationID, ExamineeID } = req.body;

    try {
        const connection = await getDB();

        // query แบบใช้ promise ของ mysql2/promise
        const [rows] = await connection.execute(
            `SELECT ex.*, e.* 
             FROM examination ex 
             JOIN examinee_${ExaminationID} e 
             WHERE ex.examination_id = ? AND e.examinee_id = ?`,
            [ExaminationID, ExamineeID]
        );

        await connection.end();  // ปิด connection หลังใช้เสร็จ
        
        if (rows.length > 0) {
            res.send(rows[0]);
        } else {
            res.status(404).send({ error: 'Examination not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Database error' });
    }
});

module.exports = router;