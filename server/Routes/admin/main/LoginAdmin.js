const express = require('express')
const router = express.Router()
const getDB = require('../../../models/DataBase.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Post ค่า login 
router.post('/login', async (req,res)=>{
   // รับ username กับ password จาก ผู้ใช้งาน
    const {username,password} = req.body
    try {
        const db = await getDB();
        // เช็คถ้า ผู้ใช้งานไม่ใส่ อะไรเลย 
        if (!username || !password) {
            return res.status(400).json({ message: 'กรุณากรอก Username และ Password' });
        }
        
        const [rows] = await db.query('SELECT * FROM admin WHERE username = ?', [username])

        // เช็คหา username ในฐานข้อมูล admin
        if (rows.length === 0) {
        return res.status(400).json({ message: 'รหัสผ่านหรือชื่อผู้ใช้ไม่ถูกต้อง' });
        }

        const admin = rows[0]
        // เช็คว่ารหัสผ่านตรงกับ database ไหม
        if (admin.password !== password) {
             return res.status(400).json({ message: 'รหัสผ่านหรือชื่อผู้ใช้ไม่ถูกต้อง' });
        }

         const token = jwt.sign({ id: admin.admin_id, username: admin.username }, 'your_secret_key', {
            expiresIn: '1h',
    });

     res.json({ message: 'Login successful', token });


    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Error Connect Admin Login DB' });
    }
})


module.exports = router

