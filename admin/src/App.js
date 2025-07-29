import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginAdmin from "./pages/main/LoginAdmin";
import RegistrationSystemAdmin from "./pages/registration/RegistrationSystemAdmin";
import TestRegis from "./pages/registration/RegistrationSystemAdminImg/TestRegis";



import AdminApp from "./pages/registration/AdminApp";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/LoginAdmin" element={<LoginAdmin />}></Route>
        <Route path="/RegistrationSystemAdmin" element={<RegistrationSystemAdmin />}></Route>
        <Route path="/TestRegis/:id" element={<TestRegis />}></Route>
        <Route path="/AdminApp" element={<AdminApp />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

