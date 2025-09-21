import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import loginIllustration from "../assets/login-illustration.jpg"; // <-- save your uploaded image here

const StudentLogin = () => {
  const [rollNo, setRollNo] = useState("");
  const [wallet, setWallet] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Please install MetaMask.");
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setWallet(accounts[0]);
    } catch (err) {
      setError("MetaMask connection failed");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!wallet) return alert("Connect MetaMask first");

    try {
      const res = await axios.post("http://localhost:5000/api/students/login", {
        rollNo,
        wallet: wallet,
      });

      localStorage.setItem("studentName", res.data.name);
      localStorage.setItem("studentRollNo", rollNo);
      localStorage.setItem("walletAddress", wallet);

      navigate("/student-dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#440a6d] flex items-center justify-center px-2 py-10">
      <div className="flex w-full max-w-5xl bg-[#1e1c2c] rounded-3xl shadow-xl overflow-hidden">
        
        {/* Left Image Panel */}
        <div className="w-1/2 hidden md:block">
          <img
            src={loginIllustration}
            alt="Login Illustration"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Form Panel */}
        <div className="w-full md:w-1/2 p-10 text-white flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2">Student Login</h2>
          <p className="text-sm text-gray-400 mb-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-purple-400 hover:underline">Register here</Link>
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <input
              type="text"
              placeholder="Enter your Roll Number"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              className="w-full px-4 py-2 bg-[#2b293b] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />

            <div className="text-sm text-gray-400">Wallet: {wallet || "Not Connected"}</div>

            <button
              type="button"
              onClick={connectWallet}
              className="w-full bg-yellow-400 text-black font-semibold py-2 rounded-lg hover:bg-yellow-300 transition"
            >
              Connect MetaMask Wallet
            </button>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2 rounded-lg"
            >
              Sign In
            </button>

            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          </form>

          {/* Optional Socials */}
          <div className="mt-6 border-t border-gray-600 pt-4 text-sm text-center text-gray-400">
            Or connect with
            <div className="flex justify-center gap-4 mt-2">
              <button className="px-4 py-1 bg-white text-black rounded-lg">Google</button>
              <button className="px-4 py-1 bg-black text-white rounded-lg border border-white">Apple</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
