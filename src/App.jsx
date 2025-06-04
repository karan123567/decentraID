import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
// import Footer from './components/Footer'
import Home from "./components/Home";
import StudentSignIn from "./pages/StudentSignIn.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/student",
      element: <>
      <StudentSignIn />
      <Navbar />
      
      </>
    },
    // {},
    // {}
  ]);
  // const [count, setCount] = useState(0);

  return (
    <>
      {/* <Navbar /> */}
      <Home />
      <RouterProvider router={router} />
      {/* <Footer /> */}
    </>
  );
}

export default App;
