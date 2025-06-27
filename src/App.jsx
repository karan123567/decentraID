import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import { Routes, Route, useLocation } from "react-router-dom";
import StudentLogin from "./pages/StudentLogin.jsx";
import Register from "./pages/Register.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminRegister from "./pages/AdminRegister.jsx";
import VerifyCertificate from "./pages/VerificationPage.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import HelpSupport from "./pages/HelpSupport.jsx";
import TermsPopup from "./components/TermsPopup.jsx";

function App() {
  const location = useLocation();
  const showTermsPopup = location.pathname === "/";

  return (
    <>
      <Navbar />
      {showTermsPopup && <TermsPopup />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/employer" element={<AdminLogin />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/verify" element={<VerifyCertificate />} />
        <Route path="/help-support" element={<HelpSupport />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
    </>
  );
}

export default App;
