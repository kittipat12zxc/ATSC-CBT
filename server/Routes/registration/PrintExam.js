const express = require('express');
const getDB = require('../../models/DataBase');
const router = express.Router();  // เพิ่มบรรทัดนี้

// ไม่ต้องใช้ app.use(cors()) ที่นี่เพราะทำใน server.js แล้ว

// สร้าง route รับเลขบัตรประชาชน ตรวจสอบใน DB
router.get('/:thai_id', async (req, res) => {
    const thai_id = req.params.thai_id.trim();
    console.log('เลขที่รับเข้ามา:', thai_id);  // ✅ เพิ่มบรรทัดนี้

    try {
        const connection = await getDB();
        const [rows] = await connection.execute(
            `SELECT 
                e.enrollments_id, e.thai_id, e.firstname, e.lastname, e.province, e.examination_id,
                ex.exam_set_name, ex.details, ex.question_count, ex.duration_minutes, ex.total_score,
                ex.exam_place, ex.exam_building, ex.exam_room, ex.start_datetime, ex.end_datetime
            FROM examinee_686001 e
            LEFT JOIN examination ex ON e.examination_id = ex.examination_id
            WHERE e.thai_id = ?`,
            [thai_id]
        );

        console.log('ผลจาก MySQL:', rows);  // ✅ เพิ่มบรรทัดนี้
        await connection.end();

        if (rows.length === 0) {
            return res.status(404).json({ message: 'ไม่พบข้อมูลผู้เข้าสอบ' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล' });
    }
});

module.exports = router;
