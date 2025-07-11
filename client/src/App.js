import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/PCHeader'
import Footer from './components/Footer/Footer';
import HomePage from './pages/main/HomePage/HomePage';
import MainExamAnnouncement from './pages/registration/MainExamAnnouncement/MainExamAnnouncement'
import NotFound from './pages/NotFound/NotFound'

function App() {
  return (
    <>
      <React.StrictMode>
        <Router>
        <Header></Header>
          <Routes >
            <Route index element={<HomePage />} />
            <Route path='/Exam-Announcement' element={<MainExamAnnouncement />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        <Footer></Footer>
        </Router>
      </React.StrictMode>

    </>

  );
}

export default App;
