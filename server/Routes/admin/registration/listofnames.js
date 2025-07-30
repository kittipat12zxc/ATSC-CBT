const express = require('express')
const getDB = require('../../../models/DataBase')
const router = express.Router();

router.get('/list-of-names/:id', async (req, res) => {
    const ID = req.params.id;
    console.log("Calling API with ID:", ID);

    // ตรวจสอบว่า id เป็นตัวเลขเท่านั้น
    if (!/^\d+$/.test(ID)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }

    const tableName = `examinee_${ID}`
    const sql = `SELECT * FROM ${tableName}`
    const sql2 = 'SELECT * FROM examination WHERE examination_id = ?'

    try {
        const db = await getDB();
        const [rows] = await db.query(sql);
        const [examInfo] = await db.query(sql2, [ID]);
        const mergedRows = rows.map(item => ({
            ...item,
            examInfo: examInfo[0] || null
        }));
        
        res.json({ rows: mergedRows, num: mergedRows.length });
    } 
    catch(err) {
        console.error("Query Error:", err)
        res.status(500).json({ error: err})
    }
})

router.put('/edit-list-names/:id', async (req, res) => {
    const id = req.params.id;
    const {
        enrollments_id,
        thai_id,
        firstname,
        lastname,
        Namesubject,
        location,
        room
    } = req.body;

    const sql1 = `UPDATE examinee_${id} SET thai_id = ?, firstname = ?, lastname = ? WHERE enrollments_id = ?`;
    const sql2 = `UPDATE examination SET exam_set_name = ?, exam_building = ?, exam_room = ? WHERE examination_id = ?`;

    const db = await getDB();

    try {
        await db.beginTransaction();

        await db.query(sql1, [thai_id, firstname, lastname, enrollments_id])
        await db.query(sql2, [Namesubject, location, room, id])

        await db.commit(); // ยืนยันทั้งหมด
        res.json({ success: true })
    } catch(err) {
        await db.rollback(); // ยกเลิกทุกอย่างหากผิดพลาด
        console.error("Transaction Error:", err);
        res.status(500).json({ error: "Database update failed" });
    } finally {
        await db.end(); // ปิด connection
    }
})

router.delete('/delete-list-names/:id/:ids', async (req, res) => {
    const examineeId = req.params.id;
    const examinationID = req.params.ids;
    const db = await getDB();
    const delete1 = `DELETE FROM examinee_${examinationID} WHERE enrollments_id = ?`;

    try {
        await db.beginTransaction();
        await db.query(delete1, [examineeId]);

        await db.commit();
        res.json({ success: true })
    } catch(err) {
        await db.rollback();
        console.log(err)
        res.status(500).json({ error: err.message });
    }
})

module.exports = router;