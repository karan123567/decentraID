import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import StudentSignIn from "./pages/StudentSignIn.jsx";
// import { BrowserRouter as Router } from "react-router-dom";
import StudentDashboard from "./pages/StudentDashboard.jsx"
// import StudentSignUp from "./pages/StudentSignUp.jsx"
import AdminDashboard from "./pages/AdminDashboard.jsx"
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/student" element={<
          StudentSignIn />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/employer" element={<AdminDashboard />}/>
        </Routes>
    </>
  );
}

export default App;
