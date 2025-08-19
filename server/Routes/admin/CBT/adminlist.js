// backend/routes/admin.js
const express = require('express')
const router = express.Router()
const getDB = require('../../../models/DataBase.js')

//  GET - ดึงข้อมูล Admin
router.get('/', async (req, res) => {
    const adminQuery = 'SELECT admin_id, username, firstname, lastname, email, role FROM admin;'
    try {
        const db = await getDB()
        const [rows] = await db.query(adminQuery)
        res.status(200).json(rows)
    } catch (error) {
        console.error("Database query failed:", error)
        res.status(500).json({ message: "Failed to fetch data from database." })
    }
})

// ✅ POST - เพิ่ม Admin
router.post('/', async (req, res) => {
    const { admin_id, username, firstname, lastname, password, email, role } = req.body
    try {
        const db = await getDB()
        await db.query(
            'INSERT INTO admin (admin_id, username, firstname, lastname, password, email, role) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [admin_id, username, firstname, lastname, password, email, role]
        )
        res.status(201).json({ admin_id, username, firstname, lastname, email, role })
    } catch (error) {
        console.error("Insert failed:", error)
        res.status(500).json({ message: "Failed to add admin." })
    }
})

// ✅ PUT - แก้ไข Admin (รวม password ด้วย แต่ไม่บังคับแก้)
router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { username, firstname, lastname, password, email, role } = req.body
    try {
        const db = await getDB()
        await db.query(
            'UPDATE admin SET username=?, firstname=?, lastname=?, password=?, email=?, role=? WHERE admin_id=?',
            [username, firstname, lastname, password, email, role, id]
        )
        res.status(200).json({ message: "Admin updated successfully" })
    } catch (error) {
        console.error("Update failed:", error)
        res.status(500).json({ message: "Failed to update admin." })
    }
})

//  DELETE - ลบ Admin
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const db = await getDB()
        await db.query('DELETE FROM admin WHERE admin_id=?', [id])
        res.status(200).json({ message: "Admin deleted successfully" })
    } catch (error) {
        console.error("Delete failed:", error)
        res.status(500).json({ message: "Failed to delete admin." })
    }
})

module.exports = router
