import React, { useEffect, useState } from "react";
import { BrowserProvider, Contract } from "ethers";
import axios from "axios";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CONTRACT_ADDRESS, ABI } from "../Blockchain/contractConfig.js";
import { toast } from "react-toastify";

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);
  const [certHash, setCertHash] = useState(null);
  const navigate = useNavigate();

  const rollNo = localStorage.getItem("studentRollNo");
  const wallet = localStorage.getItem("walletAddress");

  useEffect(() => {
    if (!rollNo || !wallet) {
      toast.error("Missing session info. Please log in again.");
      navigate("/student-login");
      return;
    }

    const fetchStudent = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/students/${rollNo}`);
        setStudent(res.data);
      } catch (err) {
        console.error("Error fetching student:", err);
      }
    };

    const fetchCertificate = async () => {
      try {
        if (!window.ethereum) {
          toast.error("MetaMask is not detected.");
          return;
        }

        const provider = new BrowserProvider(window.ethereum);
        const contract = new Contract(CONTRACT_ADDRESS, ABI, provider);
        const hash = await contract.getCertificateHash(wallet);

        if (
          hash !==
          "0x0000000000000000000000000000000000000000000000000000000000000000"
        ) {
          setCertHash(hash);
        }
      } catch (err) {
        console.error("Error fetching certificate:", err);
      }
    };

    fetchStudent();
    fetchCertificate();
  }, [rollNo, wallet, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("studentName");
    localStorage.removeItem("studentRollNo");
    localStorage.removeItem("walletAddress");
    navigate("/");
  };

  const copyLink = () => {
    const url = `${window.location.origin}/verify?wallet=${wallet}`;
    navigator.clipboard.writeText(url);
    toast.success("Verification link copied!");
  };

  if (!student) return <div className="p-6">Loading student data...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Student Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center"
        >
          <LogOut className="mr-2" size={18} />
          Logout
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Student Details</h3>
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
          <div><strong>Name:</strong> {student.name}</div>
          <div><strong>Roll No:</strong> {student.rollNo}</div>
          <div><strong>College:</strong> {student.college}</div>
          <div><strong>Course:</strong> {student.course}</div>
          <div><strong>Email:</strong> {student.email}</div>
          <div><strong>Phone:</strong> {student.phone}</div>
          <div><strong>Wallet:</strong> {student.wallet}</div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mt-6">
        <h3 className="text-xl font-semibold mb-4">Blockchain Certificate</h3>
        {certHash ? (
          <div>
            <p className="text-green-600 mb-2">✅ Certificate found on blockchain.</p>
            <p className="break-all text-sm text-gray-700 mb-4"><strong>Hash:</strong> {certHash}</p>
            <button
              onClick={copyLink}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
            >
              Copy Verification Link
            </button>
          </div>
        ) : (
          <p className="text-yellow-600">⚠ No certificate uploaded on blockchain yet.</p>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;