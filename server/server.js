
const express = require('express');
const app = express();
const cors = require('cors');
const getDB = require('./models/DataBase');


const publicRelationsRoutes = require('./Routes/RegistrationRoute');
const questionlist = require('./Routes/questionlist')

app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use('/api/registration', publicRelationsRoutes);
app.use('/api/cbt',questionlist)

app.listen(5000, () => {
    console.log("Server started on port 5000");
});