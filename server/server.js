const express = require('express');
const app = express();
const cors = require('cors');
const MainExamAnnouncement = require('./Routes/registration/MainExamAnnouncement')
const publicRelationsRoutes = require('./Routes/registration/RegistrationRoute')
const ApplyExam = require('./Routes/registration/controllers/ApplyExam')
const Login = require('./Routes/CBT/login');
const questionlist = require('./Routes/CBT/questionlist');
const updateExam = require('./Routes/CBT/controllers/updateExam');
const explain = require('./Routes/CBT/explain_exam');
const Checkexamstatus = require('./Routes/CBT/Checkexamstatus/Checkexamstatus.js');
const checkTheListRouter = require('./Routes/CBT/Checkthelist/Checkthelist');

app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use('/api/registration', MainExamAnnouncement);
app.use('/api/registration', publicRelationsRoutes);
app.use('/applyexam', ApplyExam);
app.use('/api/cbt', Login);
app.use('/api/cbt', questionlist);
app.use('/api/cbt', updateExam);
app.use('/api/cbt', explain);
app.use('/api/check-exam-status', Checkexamstatus);
app.use('/api/examinee', checkTheListRouter);

app.listen(5000, () => {
    console.log("Server started on port 5000");
});

