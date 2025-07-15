const express = require('express');
const app = express();
const cors = require('cors');
const getDB = require('./models/DataBase'); // make sure the file name is correct

app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));


// ดึงทั้งหมดมาจาก public-relations โดยเป็นข้อมูล ่json
app.get('/public-relations', async (req, res) => {
  const db = await getDB();
  const [rows] = await db.execute('SELECT * FROM public_relations');
  res.json(rows); 
});



app.listen(5000, () => {
    console.log("Server started on port 5000");
});
