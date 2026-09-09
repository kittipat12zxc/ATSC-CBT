import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginAdmin from "./pages/main/LoginAdmin";
import ListofNames from './pages/registration/ListofNames';
import RegistrationSystemAdmin from "./pages/registration/RegistrationSystemAdmin";
import AdminApp from "./pages/main/AdminApp";
import ListSubject from "./pages/registration/RegistrationSystemMain/ListSubject";
import PublicRelations from "./pages/registration/RegistrationSystemMain/PublicRelations";

// CBT
import Main from "./pages/CBT/main";
import ExamSetManager from "./pages/CBT/ExamSetManager";
import UserListManager from "./pages/CBT/UserListManager";
import ExamineeID from "./pages/CBT/ExmineeID";
import ManageQuestions from "./pages/CBT/ManageQuestions";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginAdmin />}></Route>
        <Route path="/RegistrationSystemAdmin" element={<RegistrationSystemAdmin />}></Route>
        <Route path="/RegistrationSystemAdmin/ListSubject" element={<ListSubject />}></Route>
        <Route path="/RegistrationSystemAdmin/PublicRelations" element={<PublicRelations />}></Route>
        <Route path='/admin/list-of-names/:ID' element={< ListofNames />} />
        <Route path="/AdminApp" element={<AdminApp />}></Route>

        {/* CBT */}
        <Route path="/main" element={<Main />}></Route>
        <Route path="/ExamsetManager" element={<ExamSetManager />}></Route>
        <Route path="/UserListManager" element={<UserListManager />}></Route>
        <Route path="/ExamineeID" element={<ExamineeID />}></Route>
        <Route path="/ManageQuestions" element={<ManageQuestions />}></Route>
      </Routes>
    </BrowserRouter>
  );
}


