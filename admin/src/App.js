import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListofNames from './pages/registration/ListofNames';

function App() {
  return (
    <React.StrictMode>
      <Router>
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">
            <Routes>
              <Route path='/admin/list-of-names' element={< ListofNames />} />
            </Routes>
          </main>
        </div>
      </Router>
    </React.StrictMode>
  )
}

export default App;
