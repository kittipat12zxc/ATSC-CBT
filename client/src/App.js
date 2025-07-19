import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/PCHeader'
import Footer from './components/Footer/Footer';
import DetailRegistration from './pages/registration/DetailRegistration/DetailRegistration'
import DoneExam from './pages/DoneExam/DoneExam';
import QuestionList from './pages/QuestionList/QuestionList';



function App() {
  return (
    <>
      <React.StrictMode>
        <Router>
        <Header></Header>
          <Routes >
            <Route path='/DetailRegistration' element={<DetailRegistration />} />
            <Route path='/end' element={<DoneExam />} />
            <Route path='/ExamTest' element={<QuestionList />} />
          </Routes>
        <Footer></Footer>
        </Router>
      </React.StrictMode>

    </>

  );
}

export default App;
