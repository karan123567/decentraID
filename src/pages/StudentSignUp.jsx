// src/pages/StudentSignUp.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentSignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
  });

  const [walletAddress, setWalletAddress] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask to continue.");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setWalletAddress(accounts[0]);
    } catch (err) {
      console.error("Wallet connection failed:", err);
      setError("Wallet connection failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!walletAddress) {
      alert("Please connect your wallet.");
      return;
    }

    if (!formData.name || !formData.rollNo) {
      alert("Please fill in all fields.");
      return;
    }

    // Optional: Save to localStorage or call smart contract here
    localStorage.setItem(
      "studentData",
      JSON.stringify({ ...formData, wallet: walletAddress })
    );

    // Or: await contract.methods.registerStudent(...).send({ from: walletAddress });

    navigate("/student-dashboard");
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Student Sign Up</h2>

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
          type="text"
          name="rollNo"
          placeholder="Roll Number"
          value={formData.rollNo}
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
          Connect Wallet
        </button>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Sign Up
        </button>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
};

export default StudentSignUp;

