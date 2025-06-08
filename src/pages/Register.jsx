// src/pages/Register.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Student Registration</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="rollNo"
          placeholder="Roll Number"
          value={formData.rollNo}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="college"
          placeholder="College Name"
          value={formData.college}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="course"
          placeholder="Course Name"
          value={formData.course}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
          required
        />

        <div className="text-sm text-gray-600">
          Wallet: {walletAddress ? walletAddress : "Not Connected"}
        </div>

        <button
          type="button"
          onClick={connectWallet}
          className="w-full bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
        >
          Connect MetaMask
        </button>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Register
        </button>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}
      </form>
    </div>
  );
};

export default Register;



