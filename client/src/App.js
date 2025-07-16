import ApplyExam from './pages/registration/ApplyExam.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/applyexam" element={<ApplyExam/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
