// src/pages/Register.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import loginIllustration from "../assets/login-illustration.jpg"; // or .svg

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    rollNo: "",
    college: "",
    course: "",
  });
  const [walletAddress, setWalletAddress] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
      setError("Failed to connect MetaMask.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allFieldsFilled = Object.values(formData).every(
      (field) => field.trim() !== ""
    );

    if (!allFieldsFilled || !walletAddress) {
      setError("All fields and wallet are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/students/register", {
        ...formData,
        wallet: walletAddress,
      });

      if (response.status === 201) {
        setSuccess("Registration successful! Redirecting...");
        setTimeout(() => navigate("/student-login"), 2000);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed.");
    }
  };

  return (
    <div className="max-h-screen bg-[#3e3b52] flex items-center justify-center px-4 py-10">
      <div className="flex w-full max-w-5xl bg-[#1e1c2c] rounded-3xl shadow-xl overflow-hidden">
        
        {/* Left Image Panel */}
        <div className="w-1/2 hidden md:block">
          <img
            src={loginIllustration}
            alt="Register Illustration"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Form Panel */}
        <div className="w-full md:w-1/2 p-10 text-white flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2">Student Registration</h2>
          <p className="text-sm text-gray-400 mb-6">
            Already have an account?{" "}
            <span
              className="text-purple-400 hover:underline cursor-pointer"
              onClick={() => navigate("/student-login")}
            >
              Login here
            </span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {["name", "email", "phone", "rollNo", "college", "course"].map((field) => (
              <input
                key={field}
                type={field === "email" ? "email" : "text"}
                name={field}
                placeholder={field.replace(/([A-Z])/g, " $1")}
                value={formData[field]}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-[#2b293b] border border-gray-600 rounded-lg placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            ))}

            <div className="text-sm text-gray-400">
              Wallet: {walletAddress || "Not Connected"}
            </div>

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
            {success && <p className="text-green-400 text-center text-sm">{success}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
