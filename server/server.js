const express = require('express');
const app = express();
const cors = require('cors');

const MainExamAnnouncement = require('./Routes/registration/MainExamAnnouncement');
const publicRelationsRoutes = require('./Routes/registration/RegistrationRoute');
const Login = require('./Routes/CBT/login');
const questionlist = require('./Routes/CBT/questionlist');
const updateExam = require('./Routes/CBT/controllers/updateExam');
const explain = require('./Routes/CBT/explain_exam');
const Checkexamstatus = require('./Routes/CBT/Checkexamstatus.js');
const checkTheListRouter = require('./Routes/CBT/Checkthelist');
const ApplyExam = require('./Routes/registration/controllers/ApplyExam.js');
const Homepage = require('./Routes/CBT/home.js');

const port = 5000;

// ✅ Middleware
app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// ✅ Static route for examination list (mock)
app.get('/api/examinations', (req, res) => {
  const exams = [
    { examination_id: 686001, exam_set_name: "O-NET ภาษาไทย" },
    { examination_id: 686002, exam_set_name: "O-NET คณิตศาสตร์" },
    { examination_id: 686003, exam_set_name: "O-NET วิทยาศาสตร์" },
  ];
  res.json(exams);
});

// ✅ Use routes
app.use('/api/MainExamAnnouncement', MainExamAnnouncement);
app.use('/api/registration', publicRelationsRoutes);
app.use('/applyexam', ApplyExam);
app.use('/api/cbt', Login);
app.use('/api/cbt', questionlist);
app.use('/api/cbt', updateExam);
app.use('/api/cbt', explain);
app.use('/api/check-exam-status', Checkexamstatus);
app.use('/api/examinee', checkTheListRouter);
app.use('/api/cbt', Homepage);

// ✅ Start server only once
app.listen(port, () => {
  console.log(`✅ Server started at http://localhost:${port}`);
});
