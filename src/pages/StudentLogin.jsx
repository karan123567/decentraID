import React, { useState } from "react";
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
        localStorage.setItem("studentName", response.data.name); // store student name
        navigate("/student-dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed.");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Student Login</h2>

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="text"
          name="rollNo"
          placeholder="Enter Roll Number"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
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
          Login
        </button>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>

      <p className="text-sm text-center mt-4">
        Don’t have an account?{" "}
        <span
          onClick={() => navigate("/register")}
          className="text-blue-500 hover:underline cursor-pointer"
        >
          Register here
        </span>
      </p>
    </div>
  );
};

export default StudentLogin;

