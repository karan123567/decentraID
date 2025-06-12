// src/pages/AdminRegister.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    universityId: "",
    universityName: ""
  });
  const [wallet, setWallet] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
      };
    }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
    if (!wallet) return alert("Please connect your MetaMask wallet");

    try {
      const res = await axios.post("http://localhost:5000/api/admins/register", {
        ...formData,
        wallet,
      });
      alert(res.data.message);
      navigate("/admin-dashboard");
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e002e] px-4">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg w-full max-w-xl text-white">
        <h2 className="text-3xl font-bold text-center mb-6">Admin Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {["name", "email", "phone", "universityId", "universityName"].map((field) => (
            <input
              key={field}
              type={field === "email" ? "email" : "text"}
              name={field}
              placeholder={field.replace(/([A-Z])/g, " $1")}
              value={formData[field]}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          ))}

          <div className="text-sm text-gray-300">Wallet: {wallet || "Not Connected"}</div>

          <button
            type="button"
            onClick={connectWallet}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded-lg transition"
          >
            Connect MetaMask
          </button>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:opacity-90 text-white font-semibold py-3 rounded-lg transition"
          >
            Register
          </button>

          {error && <p className="text-red-400 text-center text-sm">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AdminRegister;
