import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import StudentSignIn from "./pages/StudentSignIn.jsx";
import StudentSignUp from "./pages/StudentSignUp.jsx";
// import { BrowserRouter as Router } from "react-router-dom";
import StudentDashboard from "./pages/StudentDashboard.jsx"
// import StudentSignUp from "./pages/StudentSignUp.jsx"
import AdminDashboard from "./pages/AdminDashboard.jsx"
import { Routes, Route } from "react-router-dom";
import AdminSignIn from "./pages/AdminSignIn.jsx";
function App() {
  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/student" element={<
          StudentSignUp />} />
          <Route path="/employer" element={<AdminSignIn />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />}/>
        </Routes>
    </>
  );
}

export default App;
