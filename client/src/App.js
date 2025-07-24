import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/PCHeader.jsx';
import Footer from './components/Footer/Footer.jsx';
import HomePage from './pages/main/HomePage.jsx';
import MainExamAnnouncement from './pages/registration/MainExamAnnouncement.jsx';
import Examinationpage from './pages/registration/Examinationpage.jsx';
import PrintExam from './pages/registration/PrintExam.jsx';
import DetailRegistration from './pages/registration/DetailRegistration.jsx';
import NotFound from './pages/main/NotFound.jsx';
import ApplyExam from './pages/registration/ApplyExam.jsx'
import Checkexamstatus from './pages/CBT/Checkexamstatus/Checkexamstatus.jsx';
import Checkthelist from './pages/CBT/Checkthelist/Checkthelist.jsx';
import ContacttheDepartment from './pages/CBT/ContacttheDepartment/ContacttheDepartment.jsx';

function App() {
  return (
    <React.StrictMode>
      <Router>
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">
            <Routes>
              <Route index element={<HomePage />} />
              <Route path='/Exam-Announcement' element={<MainExamAnnouncement />} />
              <Route path='/RegisterPrint' element={<PrintExam />} /> 
              <Route path='/Examinationpage' element={<Examinationpage />} />
              <Route path='/DetailRegistration' element={<DetailRegistration />} />
              <Route path="/applyexam" element={<ApplyExam/>} />
              <Route path="/cbt/Checkexamstatus" element={<Checkexamstatus/>} />
              <Route path="/cbt/Checkthelist" element={<Checkthelist/>} />
              <Route path="/cbt/ContacttheDepartment" element={<ContacttheDepartment/>} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </Router>
    </React.StrictMode>
  );
}

export default App;
