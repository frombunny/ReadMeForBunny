import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import './App.css';
import Main from './pages/Main';
import ForOrganization from "./pages/ForOrganization";
import ForRepository from "./pages/ForRepository";

function AppContent(){
  return(
    <Routes>
      <Route path="/" element={<Main />} /> {/* 메인 페이지 */}
      <Route path="/ForOrganization" element={<ForOrganization/>} /> {/* Organization용 리드미 페이지 */}
      <Route path="/ForRepository" element={<ForRepository />} /> {/* Repository용 리드미 페이지 */}
    </Routes>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
