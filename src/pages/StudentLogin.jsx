import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

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

  if (!wallet) {
    alert("Please connect your MetaMask wallet first.");
    return;
  }

  try {
    const res = await axios.post("http://localhost:5000/api/students/login", {
      rollNo,
      wallet,
    });

    // Save student details to localStorage
    localStorage.setItem("studentName", res.data.name);
    localStorage.setItem("studentRollNo", rollNo);
    localStorage.setItem("walletAddress", wallet);

    // Navigate to student dashboard
    navigate("/student-dashboard");
  } catch (err) {
    console.error("Login Error:", err);
    setError(err.response?.data?.error || "Login failed. Please try again.");
  }
};


  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-900 to-purple-700 text-white">
      <div className="bg-purple-800 bg-opacity-30 rounded-xl shadow-xl flex w-full max-w-5xl overflow-hidden">
        {/* Left Side Welcome */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <div>
            <div className="text-4xl font-bold mb-4">Welcome!</div>
            <p className="text-sm text-purple-200 mb-6">
              Access your blockchain-verified certificates.
            </p>
            <button className="bg-gradient-to-r from-pink-500 to-red-500 px-4 py-2 rounded text-white font-semibold">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Side Login */}
        <div className="w-1/2 bg-purple-900 bg-opacity-70 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6 text-center">Sign in</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="text"
              placeholder="Roll Number"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              className="w-full px-4 py-2 bg-purple-700 bg-opacity-30 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />

            <div className="text-sm text-gray-300">Wallet: {wallet || "Not Connected"}</div>
            <button
              type="button"
              onClick={connectWallet}
              className="w-full bg-yellow-500 text-black font-semibold p-2 rounded hover:bg-yellow-400 transition"
            >
              Connect Wallet
            </button>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold p-2 rounded"
            >
              Submit
            </button>

            {error && <p className="text-red-300 text-sm text-center">{error}</p>}

            <p className="text-sm text-center mt-4 text-purple-200">
              Don’t have an account?{" "}
              <Link to="/register" className="text-pink-400 underline">
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
