// src/pages/AdminRegister.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import loginIllustration from "../assets/login-illustration.jpg"; // or .svg

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
      navigate("/employer");
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="max-h-screen bg-[#3e3b52] flex items-center justify-center px-4 py-10">
      <div className="flex w-full max-w-5xl bg-[#1e1c2c] rounded-3xl shadow-xl overflow-hidden">

        {/* Left Illustration */}
        <div className="w-1/2 hidden md:block">
          <img
            src={loginIllustration}
            alt="Admin Registration Illustration"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Registration Form */}
        <div className="w-full md:w-1/2 p-10 text-white flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2">Admin Registration</h2>
          <p className="text-sm text-gray-400 mb-6">
            Already have an account?{" "}
            <span
              className="text-purple-400 hover:underline cursor-pointer"
              onClick={() => navigate("/admin-login")}
            >
              Login here
            </span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {["name", "email", "phone", "universityId", "universityName"].map((field) => (
              <input
                key={field}
                type={field === "email" ? "email" : "text"}
                name={field}
                placeholder={field.replace(/([A-Z])/g, " $1")}
                value={formData[field]}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-[#2b293b] border border-gray-600 rounded-lg placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            ))}

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
              className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2 rounded-lg transition"
            >
              Register
            </button>

            {error && <p className="text-red-400 text-center text-sm">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
