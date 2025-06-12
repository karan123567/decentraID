import React, { useEffect, useState } from "react";
import axios from "axios";
import { CONTRACT_ADDRESS, ABI } from "../blockchain/contractConfig";
import { ethers } from "ethers";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UniversityDashboard = () => {
  const [activeTab, setActiveTab] = useState("studentData");
  const [students, setStudents] = useState([]);
  const [studentAddresses, setStudentAddresses] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [wallet, setWallet] = useState("");
  const [selectedStudentWallet, setSelectedStudentWallet] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admins/students"
      );
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleAddressChange = (e, studentId) => {
    setStudentAddresses({ ...studentAddresses, [studentId]: e.target.value });
  };

  const handleAddressUpdate = async (studentId) => {
    const address = studentAddresses[studentId];
    try {
      await axios.put(`http://localhost:5000/api/admins/students/${studentId}`, {
        physicalAddress: address,
      });
      toast.success("Address updated successfully!");
      fetchStudents();
    } catch (error) {
      toast.error("Failed to update address");
      console.error(error);
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setWallet(accounts[0]);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Top state hooks (add these near the top)

  // Update this function to upload hash + wallet to blockchain
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
        const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex =
          "0x" + hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

        const tx = await contract.uploadCertificate(
          selectedStudentWallet,
          hashHex
        );
        await tx.wait();

        toast.success("Certificate hash and wallet uploaded to blockchain!");
      };
    } catch (error) {
      toast.error("Upload failed");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
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
                    <th className="px-4 py-2">Address</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student._id} className="border-t border-gray-700">
                      <td className="px-4 py-2">{student.name}</td>
                      <td className="px-4 py-2">{student.rollNo}</td>
                      <td className="px-4 py-2">{student.walletAddress}</td>
                      <td className="px-4 py-2">
                        {student.physicalAddress || (
                          <input
                            type="text"
                            placeholder="Enter Address"
                            value={studentAddresses[student._id] || ""}
                            onChange={(e) =>
                              handleAddressChange(e, student._id)
                            }
                            className="px-2 py-1 rounded bg-gray-700 text-white"
                          />
                        )}
                      </td>
                      <td className="px-4 py-2 space-x-2">
                        {!student.physicalAddress && (
                          <button
                            onClick={() => handleAddressUpdate(student._id)}
                            className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-500"
                          >
                            Save Address
                          </button>
                        )}
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
            <button
              onClick={connectWallet}
              className="mb-4 bg-green-600 px-4 py-2 rounded text-white"
            >
              Connect Wallet
            </button>
            <form className="space-y-4">
              <label className="block text-white">Select Student:</label>
              <select
                value={selectedStudentId}
                onChange={(e) => {
                  const studentId = e.target.value;
                  setSelectedStudentId(studentId);
                  const student = students.find((s) => s._id === studentId);
                  setSelectedStudentWallet(student?.walletAddress || "");
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

              <button
                type="button"
                onClick={handleUpload}
                className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-500"
              >
                Upload to Blockchain
              </button>
            </form>
          </div>
        )}
      </motion.main>
    </div>
  );
};

export default UniversityDashboard;
