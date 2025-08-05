const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');


// === ROUTES ===
const MainExamAnnouncement = require('./Routes/registration/MainExamAnnouncement');
const publicRelationsRoutes = require('./Routes/registration/RegistrationRoute');
const ApplyExam = require('./Routes/registration/controllers/ApplyExam');
const Login = require('./Routes/CBT/login');
const questionlist = require('./Routes/CBT/questionlist');
const updateExam = require('./Routes/CBT/controllers/updateExam');
const explain = require('./Routes/CBT/explain_exam');
const LoginAdmin = require('./Routes/admin/main/LoginAdmin');
const RegistrationSystemAdmin = require('./Routes/admin/registration/RegistrationSystemAdmin')
const ImageUploadRoute = require('./Routes/ImageUploadRoute');
const ListofNames = require('./Routes/admin/registration/listofnames')


// === MIDDLEWARE ===
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use('/images', express.static('uploads'));




// ใช้งาน Routes
app.use('/api/registration', MainExamAnnouncement);
app.use('/api/registration', publicRelationsRoutes);
app.use('/applyexam', ApplyExam);
app.use('/api/cbt', Login);
app.use('/api/cbt', questionlist);
app.use('/api/cbt', updateExam);
app.use('/api/cbt', explain);
app.use('/api/admin', LoginAdmin);
app.use('/api/admin',RegistrationSystemAdmin)
app.use('/api', ImageUploadRoute);
app.use('/api/admin', ListofNames)


// === START SERVER ===
app.listen(5000, () => {
    console.log("Server started on port 5000");
});
