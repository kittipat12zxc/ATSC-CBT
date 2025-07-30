const express = require('express');
const router = express.Router();
const getDB = require('../../models/DataBase');

router.get('/', async (req, res) => {
  try {
    const db = await getDB();
    const [rows] = await db.query('SELECT * FROM publi_relations_ann');
    await db.end();
    res.json(rows);
  } catch (error) {
    console.error('Error fetching announcements:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
