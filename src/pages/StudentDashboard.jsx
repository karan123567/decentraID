import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const StudentDashboard = () => {
  const [wallet, setWallet] = useState("");
  const [userData, setUserData] = useState({});
  const [certHash, setCertHash] = useState("");
  const [verificationLink, setVerificationLink] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const storedWallet = localStorage.getItem("walletAddress");

    if (!storedWallet) {
      navigate("/student-login");
    } else {
      setWallet(storedWallet);
      fetchStudentData(storedWallet);
      fetchCertificate(storedWallet);
    }
  }, []);

  const fetchStudentData = async (walletAddress) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/students/wallet/${walletAddress}`
      );
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching student data:", error);
      toast.error("Failed to load student data.");
    }
  };

  const fetchCertificate = async (walletAddress) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/certificate/${walletAddress}`
      );
      const hash = response.data.hash;
      if (
        hash !==
        "0x0000000000000000000000000000000000000000000000000000000000000000"
      ) {
        setCertHash(hash);
        const link = `${window.location.origin}/verify?wallet=${walletAddress}&hash=${hash}`;
        setVerificationLink(link);
      }
    } catch (error) {
      console.error("Error fetching certificate:", error);
      toast.error("Failed to load certificate data.");
    }
  };

  const copyLink = () => {
    if (!verificationLink) {
      toast.warning("No link to copy");
      return;
    }
    navigator.clipboard.writeText(verificationLink);
    toast.success("Verification link copied!");
  };

  const handleLogout = () => {
    localStorage.removeItem("studentName");
    localStorage.removeItem("studentRollNo");
    localStorage.removeItem("walletAddress");
    toast.success("Logged out successfully");
    navigate("/student-login");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 relative">
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>

      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Student Dashboard</h2>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Student Information</h3>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Roll No:</strong> {userData.rollNo}</p>
          <p><strong>Wallet Address:</strong> {wallet}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 mt-6">
          <h3 className="text-xl font-semibold mb-4">Blockchain Certificate</h3>
          {certHash ? (
            <div>
              <p className="text-green-600 mb-2">✅ Certificate found on blockchain.</p>
              <p className="break-all text-sm text-gray-700 mb-4"><strong>Hash:</strong> {certHash}</p>

              <label className="text-gray-700 font-semibold text-sm">Verification Link:</label>
              <input
                type="text"
                value={verificationLink}
                readOnly
                onClick={(e) => e.target.select()}
                className="w-full bg-gray-100 text-gray-800 p-2 mt-1 rounded cursor-pointer break-all"
              />

              <button
                onClick={copyLink}
                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
              >
                Copy Verification Link
              </button>
            </div>
          ) : (
            <p className="text-yellow-600">⚠ No certificate uploaded on blockchain yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
