import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const StudentDashboard = () => {
  const [wallet, setWallet] = useState("");
  const [userData, setUserData] = useState({});
  const [certHash, setCertHash] = useState("");
  const [verificationLink, setVerificationLink] = useState("");
  const [showLogout, setShowLogout] = useState(false);

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
        hash &&
        hash !==
          "0x0000000000000000000000000000000000000000000000000000000000000000"
      ) {
        setCertHash(hash);
        const link = `${window.location.origin}/verify?wallet=${walletAddress}&hash=${hash}`;
        setVerificationLink(link);
      } else {
        throw new Error("Empty or zero hash");
      }
    } catch (error) {
      // const fakeHash =
      //   "0x9c1fa3b4f98c2e8d4a78f9a2b4c3d1a9f2b4c3d1a9e4b78f9a2b4c3d1a9e4b78";

      // setCertHash(fakeHash);
      // const link = `${window.location.origin}/verify?wallet=${walletAddress}&hash=${fakeHash}`;
      // setVerificationLink(link);
      // toast("🧪 Showing demo certificate for submission.");
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-800 via-purple-800 to-blue-700 flex items-center justify-center px-4">
      <div className="relative bg-white/10 backdrop-blur-md text-white p-8 rounded-3xl shadow-lg max-w-lg w-full">
        {/* Avatar and Logout */}
        <div className="flex flex-col items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="avatar"
            className="w-24 h-24 rounded-full cursor-pointer border-4 border-white mb-2"
            onClick={() => setShowLogout(!showLogout)}
          />
          <h2 className="text-2xl font-bold mb-4">{userData.name || "Student"}</h2>

          {showLogout && (
            <button
              onClick={handleLogout}
              className="absolute top-4 right-4 bg-red-600 px-4 py-1 text-sm rounded-lg hover:bg-red-500"
            >
              Logout
            </button>
          )}
        </div>

        {/* Info */}
        <div className="mt-4 space-y-2 text-sm text-white/90">
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Roll No:</strong> {userData.rollNo}</p>
          <p><strong>Wallet Address:</strong> <span className="break-all">{wallet}</span></p>
        </div>

        {/* Certificate Section */}
        <div className="mt-6 p-4 bg-white/10 rounded-xl border border-white/20">
          <h3 className="text-lg font-semibold mb-3">Blockchain Certificate</h3>
          {certHash ? (
            <div>
              <p className="text-green-300 mb-1">✅ Certificate found on blockchain.</p>
              <p className="text-xs text-white/80 break-words mb-2"><strong>Hash:</strong> {certHash}</p>
              <input
                type="text"
                value={verificationLink}
                readOnly
                onClick={(e) => e.target.select()}
                className="w-full bg-white/20 p-2 rounded text-xs text-white/90 cursor-pointer mb-2"
              />
              <button
                onClick={copyLink}
                className="bg-blue-600 px-4 py-2 rounded text-white text-sm hover:bg-blue-500"
              >
                Copy Verification Link
              </button>
            </div>
          ) : (
            <p className="text-yellow-300 text-sm">⚠ No certificate uploaded on blockchain yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
