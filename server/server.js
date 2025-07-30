const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

// ✅ Import routes (no duplicates)
const MainExamAnnouncement = require('./Routes/registration/MainExamAnnouncement');
const publicRelationsRoutes = require('./Routes/registration/RegistrationRoute');
const ApplyExam = require('./Routes/registration/controllers/ApplyExam.js');
const Checkexamstatus = require('./Routes/CBT/Checkexamstatus.js');
const checkTheListRouter = require('./Routes/CBT/Checkthelist');
const PrintExam = require('./Routes/registration/PrintExam');
const Login = require('./Routes/CBT/login');
const questionlist = require('./Routes/CBT/questionlist');
const updateExam = require('./Routes/CBT/controllers/updateExam');
const explain = require('./Routes/CBT/explain_exam');
const Homepage = require('./Routes/CBT/home.js');

// ✅ Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// ✅ Static mock API
app.get('/api/examinations', (req, res) => {
  const exams = [
    { examination_id: 686001, exam_set_name: "O-NET ภาษาไทย" },
    { examination_id: 686002, exam_set_name: "O-NET คณิตศาสตร์" },
    { examination_id: 686003, exam_set_name: "O-NET วิทยาศาสตร์" },
  ];
  res.json(exams);
});

// ✅ Use routes (only once)
app.use('/api/PrintExam/search', PrintExam);
app.use('/api/MainExamAnnouncement', MainExamAnnouncement);
app.use('/api/registration', publicRelationsRoutes);
app.use('/applyexam', ApplyExam);
app.use('/api/check-exam-status', Checkexamstatus);
app.use('/api/examinee', checkTheListRouter);
app.use('/api/cbt', Login);
app.use('/api/cbt', questionlist);
app.use('/api/cbt', updateExam);
app.use('/api/cbt', explain);
app.use('/api/cbt', Homepage);

// ✅ Start server
app.listen(port, () => {
  console.log(`✅ Server started at http://localhost:${port}`);
});
