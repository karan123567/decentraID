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
      const res = await axios.post("http://localhost:5000/api/admin/login", {
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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Admin Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="University ID"
          value={universityId}
          onChange={(e) => setUniversityId(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <div className="text-sm text-gray-500">Wallet: {wallet || "Not Connected"}</div>
        <button
          type="button"
          onClick={connectWallet}
          className="w-full bg-yellow-500 text-white p-2 rounded"
        >
          Connect Wallet
        </button>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Login
        </button>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/admin-register" className="text-blue-500 underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default AdminLogin;


