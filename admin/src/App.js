import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginAdmin from "./pages/main/LoginAdmin";
import ListofNames from './pages/registration/ListofNames';
import RegistrationSystemAdmin from "./pages/registration/RegistrationSystemAdmin";
import AdminApp from "./pages/main/AdminApp";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginAdmin />}></Route>
        <Route path="/RegistrationSystemAdmin" element={<RegistrationSystemAdmin />}></Route>
        <Route path='/admin/list-of-names/:ID' element={< ListofNames />} />
        <Route path="/AdminApp" element={<AdminApp />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

