const express = require('express');
const app = express(); //create Express App.
const cors = require('cors');

app.use(cors({
    origin: ['http://localhost:3000'], // อนุญาตเฉพาะ origin นี้
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // อนุญาตเฉพาะ methods นี้
    allowedHeaders: ['Content-Type', 'Authorization'] // อนุญาตเฉพาะ headers นี้
}));
app.use(express.json({ limit: '10mb' }));  // เพิ่ม limit เป็น 10MB หรือมากกว่านั้น
app.use(express.urlencoded({ limit: '10mb', extended: true }));



app.listen(5000, () => {console.log("Server started on port 5000") })