import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginAdmin from "./pages/main/LoginAdmin";
import ListofNames from './pages/registration/ListofNames';
import RegistrationSystemAdmin from "./pages/registration/RegistrationSystemAdmin";
import AdminApp from "./pages/registration/AdminApp";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/LoginAdmin" element={<LoginAdmin />}></Route>
        <Route path="/RegistrationSystemAdmin" element={<RegistrationSystemAdmin />}></Route>
        <Route path='/admin/list-of-names' element={< ListofNames />} />
        <Route path="/AdminApp" element={<AdminApp />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

