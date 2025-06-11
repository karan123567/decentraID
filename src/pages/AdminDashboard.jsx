import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import { CONTRACT_ADDRESS, ABI } from "../blockchain/contractConfig";

const UniversityDashboard = () => {
  const [students, setStudents] = useState([]);
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [status, setStatus] = useState("");

  // 1. Connect wallet and contract
  const connectWalletAndContract = async () => {
    try {
      if (!window.ethereum) return alert("Please install MetaMask!");

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
      setContract(contractInstance);
    } catch (err) {
      console.error("Wallet connection failed:", err);
    }
  };

  // 2. Load students from backend
  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/students"); // replace with your actual endpoint
      setStudents(res.data);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  // 3. Upload certificate hash to blockchain
  const handleUpload = async (walletAddress, certFile) => {
    try {
      if (!certFile) return alert("Please select a certificate file");

      // Read file & hash with SHA-256
      const fileArrayBuffer = await certFile.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest("SHA-256", fileArrayBuffer);
      const hashHex = `0x${[...new Uint8Array(hashBuffer)].map(x => x.toString(16).padStart(2, "0")).join("")}`;

      setStatus(`Uploading certificate for ${walletAddress}...`);

      const tx = await contract.uploadCertificate(walletAddress, hashHex);
      await tx.wait();

      setStatus(`✅ Uploaded certificate hash to blockchain`);
    } catch (err) {
      console.error("Upload failed:", err);
      setStatus("❌ Upload failed. Check console.");
    }
  };

  useEffect(() => {
    connectWalletAndContract();
    fetchStudents();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">University Admin Dashboard</h1>
      <p className="text-green-600 mb-2">{status}</p>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Roll No</th>
              <th className="py-2 px-4">Wallet Address</th>
              <th className="py-2 px-4">Upload Certificate</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id} className="text-center border-b">
                <td className="py-2 px-4">{student.name}</td>
                <td className="py-2 px-4">{student.rollNo}</td>
                <td className="py-2 px-4">{student.walletAddress}</td>
                <td className="py-2 px-4">
                  <label className="cursor-pointer bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                    Upload
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.png"
                      onChange={(e) =>
                        handleUpload(student.walletAddress, e.target.files[0])
                      }
                    />
                  </label>
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No student data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UniversityDashboard;
