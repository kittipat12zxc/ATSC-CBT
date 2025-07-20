const express = require('express');
const db = require('../../models/DataBase.js'); // Import getDB function

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT public_relations_cbt_id, pr_exam_set_id, title, subtitle, faculty, description,
              exam_date_start, exam_date_end, exam_time_start, exam_time_end, location,
              subject, rules, prohibites, contact_info, footer_message, color 
       FROM public_relations_cbt`
    );
    res.json(rows);
  } catch (err) {
    console.error('Database error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
