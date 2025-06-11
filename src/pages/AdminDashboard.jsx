import React, { useEffect, useState } from "react";
import axios from "axios";
import { CONTRACT_ADDRESS, ABI } from "../blockchain/contractConfig";
import { ethers } from "ethers";

const UniversityDashboard = () => {
  const [students, setStudents] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedStudentAddress, setSelectedStudentAddress] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/students");
        setStudents(res.data);
      } catch (error) {
        console.error("Error fetching students", error);
      }
    };
    fetchStudents();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async (studentWallet) => {
    if (!selectedFile || !studentWallet) return;

    try {
      setUploading(true);
      const reader = new FileReader();
      reader.onloadend = async () => {
        const fileContent = reader.result;
        const hashBuffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(fileContent));
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = "0x" + hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

        if (window.ethereum) {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

          const tx = await contract.uploadCertificate(studentWallet, hashHex);
          await tx.wait();
          alert("Certificate uploaded successfully!");
        } else {
          alert("MetaMask not found");
        }
      };
      reader.readAsText(selectedFile);
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      <aside className="w-64 bg-gray-800 p-4">
        <h1 className="text-2xl font-bold mb-4">University Admin</h1>
        <nav className="space-y-2">
          <a href="#" className="block p-2 rounded bg-gray-700">Dashboard</a>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <h2 className="text-3xl font-semibold mb-6">Student Records</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-gray-800 rounded-lg">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Roll No</th>
                <th className="px-4 py-2 text-left">Wallet</th>
                <th className="px-4 py-2 text-left">Certificate</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id} className="border-b border-gray-600">
                  <td className="px-4 py-2">{student.name}</td>
                  <td className="px-4 py-2">{student.rollNo}</td>
                  <td className="px-4 py-2">{student.walletAddress}</td>
                  <td className="px-4 py-2">
                    <input
                      type="file"
                      className="text-sm text-gray-300 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-600 file:text-white hover:file:bg-gray-500"
                      onChange={handleFileChange}
                    />
                    <button
                      onClick={() => handleUpload(student.walletAddress)}
                      className="ml-2 px-4 py-1 bg-blue-600 hover:bg-blue-500 rounded text-white"
                      disabled={uploading}
                    >
                      {uploading ? "Uploading..." : "Upload"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default UniversityDashboard;
