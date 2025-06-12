// VerificationPage.jsx
import React, { useState } from "react";
import { toast } from "react-toastify";
import { CONTRACT_ADDRESS, ABI } from "../blockchain/contractConfig";
import { ethers } from "ethers";

const VerificationPage = () => {
  const [studentAddress, setStudentAddress] = useState("");
  const [hashToCheck, setHashToCheck] = useState("");
  const [isValid, setIsValid] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!window.ethereum) return toast.error("MetaMask not detected");
    if (!studentAddress || !hashToCheck) return toast.error("Fill all fields");

    try {
      setLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const result = await contract.verifyHash(studentAddress, hashToCheck);
      setIsValid(result);
      toast.success(result ? "Valid Certificate" : "Invalid Certificate");
    } catch (err) {
      toast.error("Verification failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-12 flex flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-6 p-6 rounded-xl bg-gray-800 shadow-lg">
        <h1 className="text-2xl font-bold text-center">Verify Certificate</h1>

        <div>
          <label className="block mb-1">Student Wallet Address</label>
          <input
            type="text"
            value={studentAddress}
            onChange={(e) => setStudentAddress(e.target.value)}
            placeholder="0x..."
            className="w-full p-2 rounded bg-gray-700 focus:outline-none"
          />
        </div>

        <div>
          <label className="block mb-1">Certificate Hash</label>
          <input
            type="text"
            value={hashToCheck}
            onChange={(e) => setHashToCheck(e.target.value)}
            placeholder="0x..."
            className="w-full p-2 rounded bg-gray-700 focus:outline-none"
          />
        </div>

        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded transition"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>

        {isValid !== null && (
          <p className={`text-center font-semibold ${isValid ? "text-green-500" : "text-red-500"}`}>
            {isValid ? "✅ Certificate is Valid" : "❌ Invalid Certificate"}
          </p>
        )}
      </div>
    </div>
  );
};

export default VerificationPage;
