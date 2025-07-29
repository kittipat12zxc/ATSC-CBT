import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminApp from "./pages/registration/AdminApp";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/AdminApp" element={<AdminApp />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
