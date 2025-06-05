// src/pages/AdminSignIn.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminSignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    adminId: "",
    passcode: "",
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
      alert("Please install MetaMask.");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setWalletAddress(accounts[0]);
    } catch (err) {
      console.error("MetaMask error:", err);
      setError("Failed to connect MetaMask");
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();

    if (!walletAddress) {
      alert("Please connect your wallet first.");
      return;
    }

    if (!formData.adminId || !formData.passcode) {
      alert("Please enter all fields.");
      return;
    }

    // Simulate admin check (in real use, validate via smart contract or backend)
    localStorage.setItem(
      "adminData",
      JSON.stringify({ ...formData, wallet: walletAddress })
    );

    navigate("/admin-dashboard");
  };

  useEffect(() => {
    const admin = localStorage.getItem("adminData");
    if (admin) {
      navigate("/admin-dashboard");
    }
  }, []);

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Admin Sign In</h2>

      <form onSubmit={handleSignIn} className="space-y-4">
        <input
          type="text"
          name="adminId"
          placeholder="Admin ID"
          value={formData.adminId}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="password"
          name="passcode"
          placeholder="Passcode"
          value={formData.passcode}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
          required
        />

        <div className="text-sm text-gray-600">
          Wallet: {walletAddress || "Not Connected"}
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
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Sign In
        </button>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
};

export default AdminSignIn;

