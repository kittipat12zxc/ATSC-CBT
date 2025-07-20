import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importing 
import ApplyExam from './pages/registration/ApplyExam.jsx'
import Serve from './pages/CBT/serve.jsx'
import Home from './pages/CBT/home.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/applyexam" element={<ApplyExam/>} />
        <Route path="/serve" element={<Serve/>} />
        <Route path="/home" element={<Home/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
