import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
// import StudentSignIn from "./pages/StudentSignIn.jsx";
// import StudentSignUp from "./pages/StudentSignUp.jsx";
// import { BrowserRouter as Router } from "react-router-dom";
import StudentDashboard from "./pages/StudentDashboard.jsx"
// import StudentSignUp from "./pages/StudentSignUp.jsx"
import AdminDashboard from "./pages/AdminDashboard.jsx"
import { Routes, Route } from "react-router-dom";
// import AdminSignIn from "./pages/AdminSignIn.jsx";
// import Register from "./pages/Register.jsx";
import StudentLogin from "./pages/StudentLogin.jsx";
import Register from "./pages/Register.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminRegister from "./pages/AdminRegister.jsx";


function App() {
  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/student-login" element={<
          StudentLogin />} />
          <Route path="/employer" element={<AdminLogin />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />}/>
          <Route path="/register" element={<Register />} />
          <Route path="/admin-register" element={<AdminRegister />} />
        </Routes>
    </>
  );
}

export default App;
