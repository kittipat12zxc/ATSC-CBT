const express = require('express')
const router = express.Router()
const getDB = require('../../../models/DataBase')

// ดึงข้อมูลจาก registrationsystemadmin เป็น Json

router.get('/registrationsystemadmin', async (req,res)=>{
    try {
        const db = await getDB()
        const [rows] = await db.query('SELECT * FROM `examination` ORDER BY `examination_id` ASC')
        res.json(rows)
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Error Connect Admin registrationsystemadmin DB' });
    }
})


module.exports = router