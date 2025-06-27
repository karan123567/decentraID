// src/pages/AdminLogin.jsx

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [universityId, setUniversityId] = useState("");
  const [wallet, setWallet] = useState("");
  const [error, setError] = useState("");

  const connectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setWallet(accounts[0]);
    } catch (err) {
      setError("MetaMask connection failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!wallet) return alert("Connect MetaMask first");

    try {
      const res = await axios.post("http://localhost:5000/api/admins/login", {
        universityId,
        wallet,
      });
      alert(res.data.message);
      navigate("/admin-dashboard");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-900 to-purple-700 text-white">
      <div className="bg-purple-800 bg-opacity-30 rounded-xl shadow-xl flex w-full max-w-5xl overflow-hidden">

        {/* Left Side Welcome */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <div>
            <div className="text-4xl font-bold mb-4">Welcome!</div>
            <p className="text-sm text-purple-200 mb-6">
              Say goodbye to fake certificates. Welcome to decentralized verification.
            </p>
            <button className="bg-gradient-to-r from-pink-500 to-red-500 px-4 py-2 rounded text-white font-semibold">Learn More</button>
          </div>
        </div>

        {/* Right Side Login */}
        <div className="w-1/2 bg-purple-900 bg-opacity-70 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6 text-center">Sign in</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              placeholder="University ID"
              value={universityId}
              onChange={(e) => setUniversityId(e.target.value)}
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
              Don’t have an account?{' '}
              <Link to="/admin-register" className="text-pink-400 underline">
                Register here
              </Link>
            </p>

            <div className="flex justify-center mt-4 space-x-4 text-white">
              <i className="fab fa-facebook-f"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-pinterest"></i>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
