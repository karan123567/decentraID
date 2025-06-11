import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StudentLogin = () => {
  const [rollNo, setRollNo] = useState("");
  const [error, setError] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const navigate = useNavigate();

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask.");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setWalletAddress(accounts[0]);
    } catch (err) {
      setError("MetaMask connection failed.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!walletAddress) {
      alert("Please connect your MetaMask wallet.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/students/login", {
        rollNo,
        wallet: walletAddress,
      });

      if (response.status === 200) {
        localStorage.setItem("studentName", response.data.name);
        navigate("/student-dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed.");
    }
useEffect(() => {
  document.body.style.overflow = "hidden";
  return () => {
    document.body.style.overflow = "auto"; // reset on leaving login page
  };
}, []);

  };

  return (
    <div className="h-screen w-screen flex overflow-hidden">
      {/* Left: Login Form */}
      <div className="w-1/2 bg-white flex flex-col justify-center px-12">
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-3xl font-bold text-black mb-2">Welcome Back!</h2>
          <p className="text-gray-500 mb-8">Please enter log in details below</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="text"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              placeholder="Roll Number"
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <div className="text-sm text-gray-600">
              Wallet:{" "}
              <span className="text-black font-mono">
                {walletAddress ? walletAddress : "Not Connected"}
              </span>
            </div>

            <button
              type="button"
              onClick={connectWallet}
              className="w-full bg-yellow-400 text-black font-semibold p-3 rounded-xl hover:bg-yellow-500 transition"
            >
              Connect MetaMask
            </button>

            <button
              type="submit"
              className="w-full bg-black text-white font-semibold p-3 rounded-xl hover:bg-gray-900 transition"
            >
              Sign In
            </button>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          </form>

          <p className="text-sm text-center text-gray-500 mt-6">
            Don’t have an account?{" "}
            <span
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>

      {/* Right: Illustration */}
      <div className="w-1/2 bg-black text-white flex flex-col items-center justify-center p-15 rounded-bl-[30px]">
        <img
          src="/illustration.png" // <- Use your 3D character or animated graphic here
          alt="Login Visual"
          className="w-2/3 mx-auto"
        />
        <h3 className="text-2xl font-semibold mt-6">Manage your Certificates Easily</h3>
        <p className="text-gray-300 mt-2 text-center max-w-sm">
          Verify blockchain-based university certificates securely.
        </p>
      </div>
    </div>
  );
};

export default StudentLogin;
