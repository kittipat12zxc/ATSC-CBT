const express = require('express');
const router = express.Router();
const getDB = require('../models/DataBase');

// 

router.get('/public-relations', async (req, res) => {
    try {
        const db = await getDB();
        const [rows] = await db.execute('SELECT * FROM public_relations');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching public relations:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
