const express = require('express');
const app = express();
const cors = require('cors');
const getDB = require('./models/DataBase');

const publicRelationsRoutes = require('./Routes/RegistrationRoute')

app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));


// ดึงทั้งหมดมาจาก public-relations โดยเป็นข้อมูล ่json
app.use('/api/registration', publicRelationsRoutes)



app.listen(5000, () => {
    console.log("Server started on port 5000");
});
