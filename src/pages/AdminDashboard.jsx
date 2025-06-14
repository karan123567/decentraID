import React, { useEffect, useState } from "react";
import { BrowserProvider, Contract } from "ethers"; // ✅ ethers v6 import
import axios from "axios";
import { CONTRACT_ADDRESS, ABI } from "../Blockchain/contractConfig";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("studentData");
  const [students, setStudents] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedStudentWallet, setSelectedStudentWallet] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [txHash, setTxHash] = useState("");
  const [verificationLink, setVerificationLink] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admins/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile || !selectedStudentWallet) {
      toast.warning("Please select a file and student");
      return;
    }

    try {
      const reader = new FileReader();
      reader.readAsArrayBuffer(selectedFile);

      reader.onloadend = async () => {
        const buffer = reader.result;

        // 🔐 Hash using SHA-256
        const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = "0x" + hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

        // ✅ Using ethers v6 BrowserProvider
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const contract = new Contract(CONTRACT_ADDRESS, ABI, signer);

        const tx = await contract.uploadCertificate(selectedStudentWallet, hashHex);
        await tx.wait();

        setTxHash(tx.hash);

        const link = `${window.location.origin}/verify?wallet=${selectedStudentWallet}&hash=${hashHex}`;
        setVerificationLink(link);

        toast.success("Certificate hash and wallet uploaded to blockchain!");
      };
    } catch (error) {
      toast.error("Upload failed");
      console.error("MetaMask or blockchain error:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-gray-900 text-white p-4 space-y-4">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <button
          onClick={() => setActiveTab("studentData")}
          className={`w-full text-left px-4 py-2 rounded ${
            activeTab === "studentData" ? "bg-gray-700" : "bg-gray-800"
          }`}
        >
          Student Data
        </button>
        <button
          onClick={() => setActiveTab("upload")}
          className={`w-full text-left px-4 py-2 rounded ${
            activeTab === "upload" ? "bg-gray-700" : "bg-gray-800"
          }`}
        >
          Upload Certificate
        </button>
      </div>

      {/* Main content */}
      <motion.main
        key={activeTab}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-1 p-6 overflow-y-auto bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
      >
        {activeTab === "studentData" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Student Records</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-900 text-white">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Roll No</th>
                    <th className="px-4 py-2">Wallet</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student._id} className="border-t border-gray-700">
                      <td className="px-4 py-2">{student.name}</td>
                      <td className="px-4 py-2">{student.rollNo}</td>
                      <td className="px-4 py-2">{student.wallet}</td>
                      <td className="px-4 py-2 space-x-2">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(student.wallet);
                            toast.success("Wallet address copied!");
                          }}
                          className="bg-green-600 px-3 py-1 rounded hover:bg-green-500"
                        >
                          Copy Wallet
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "upload" && (
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Upload Certificate</h2>
            <form className="space-y-4">
              <label className="block text-white">Select Student:</label>
              <select
                value={selectedStudentId}
                onChange={(e) => {
                  const studentId = e.target.value;
                  setSelectedStudentId(studentId);
                  const student = students.find((s) => s._id === studentId);
                  setSelectedStudentWallet(student?.wallet || "");
                }}
                className="w-full p-2 rounded bg-gray-700 text-white"
              >
                <option value="">-- Select a student --</option>
                {students.map((student) => (
                  <option key={student._id} value={student._id}>
                    {student.name} ({student.rollNo})
                  </option>
                ))}
              </select>

              <input
                type="file"
                onChange={handleFileChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
              />

              <input
                type="text"
                placeholder="Wallet Address"
                value={selectedStudentWallet}
                readOnly
                className="w-full p-2 rounded bg-gray-700 text-white"
              />

              <button
                type="button"
                onClick={handleUpload}
                className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-500"
              >
                Upload to Blockchain
              </button>
            </form>

            {txHash && (
              <div className="mt-6 p-4 bg-green-700 text-white rounded-lg shadow-lg">
                <p className="font-semibold mb-2">✅ Upload Successful!</p>
                <p className="break-all">
                  Transaction Hash:{" "}
                  <a
                    href={`https://sepolia.etherscan.io/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-200"
                  >
                    {txHash}
                  </a>
                </p>
              </div>
            )}

            {verificationLink && (
              <div className="mt-4 p-4 bg-gray-700 text-white rounded shadow">
                <p className="font-semibold mb-1">🔗 Verification Link:</p>
                <input
                  type="text"
                  value={verificationLink}
                  readOnly
                  className="w-full bg-gray-900 p-2 rounded mt-1 cursor-pointer text-white"
                  onClick={(e) => e.target.select()}
                />
              </div>
            )}
          </div>
        )}
      </motion.main>
    </div>
  );
};

export default AdminDashboard;
