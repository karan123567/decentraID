// // VerificationPage.jsx
// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { CONTRACT_ADDRESS, ABI } from "../Blockchain/contractConfig";
// import { BrowserProvider, Contract } from "ethers";
// import { useSearchParams } from "react-router-dom";

// const VerificationPage = () => {
//   const [searchParams] = useSearchParams();
//   const [verificationResult, setVerificationResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const walletParam = searchParams.get("wallet");
//   const hashParam = searchParams.get("hash");

//   const verifyCertificate = async () => {
//   if (!walletParam || !hashParam) {
//     toast.error("Invalid or missing verification link parameters.");
//     return;
//   }

//   if (!window.ethereum) {
//     toast.error("MetaMask is not detected.");
//     return;
//   }

//   try {
//     setLoading(true);
//     const provider = new BrowserProvider(window.ethereum);
//     const contract = new Contract(CONTRACT_ADDRESS, ABI, provider);

//     const [storedHash, timestamp] = await contract.getCertificateHash(walletParam);

//     if (
//       storedHash === "0x0000000000000000000000000000000000000000000000000000000000000000"
//     ) {
//       toast.error("No certificate found for this wallet.");
//       setVerificationResult(false);
//       return;
//     }

//     const isMatch = storedHash.toLowerCase() === hashParam.toLowerCase();
//     setVerificationResult(isMatch);
//     toast.success(isMatch ? "✅ Certificate Verified" : "❌ Certificate Invalid or Tampered");
//   } catch (err) {
//     console.error("Verification failed:", err);
//     toast.error("Verification failed.");
//   } finally {
//     setLoading(false);
//   }
// };

//   useEffect(() => {
//     verifyCertificate();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
//       <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-lg text-center space-y-4">
//         <h1 className="text-2xl font-bold">Certificate Verification</h1>

//         {loading ? (
//           <p className="text-blue-400">Verifying certificate on blockchain...</p>
//         ) : verificationResult === null ? (
//           <p className="text-yellow-400">Awaiting verification...</p>
//         ) : verificationResult ? (
//           <p className="text-green-500 text-lg font-semibold">✅ Certificate is Valid</p>
//         ) : (
//           <p className="text-red-500 text-lg font-semibold">❌ Certificate is Invalid or Tampered</p>
//         )}

//         <div className="text-left mt-4 text-sm text-gray-400">
//           <p><strong>Wallet:</strong> {walletParam || "N/A"}</p>
//           <p className="break-all"><strong>Hash:</strong> {hashParam || "N/A"}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VerificationPage;


import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const VerifyCertificate = () => {
  const [params] = useSearchParams();
  const [studentData, setStudentData] = useState(null);
  const [hash, setHash] = useState("");

  const wallet = params.get("wallet");
  const hashParam = params.get("hash");

  useEffect(() => {
    if (wallet && hashParam) {
      setHash(hashParam);
      fetchStudentData(wallet);
    }
  }, [wallet, hashParam]);

  const fetchStudentData = async (walletAddress) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/students/wallet/${walletAddress}`
      );
      setStudentData(response.data);
    } catch (error) {
      toast.error("Student not found or invalid wallet.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-green-600">
          ✅ Certificate Verified Successfully
        </h2>

        {studentData ? (
          <>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Student Information</h3>
              <p><strong>Name:</strong> {studentData.name}</p>
              <p><strong>Roll No:</strong> {studentData.rollNo}</p>
              <p><strong>Wallet Address:</strong> {wallet}</p>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Certificate Details</h3>
              <p className="break-all"><strong>Certificate Hash:</strong> {hash}</p>
              <p className="mt-2 text-green-600">This certificate is valid and stored on blockchain.</p>
            </div>
          </>
        ) : (
          <p className="text-red-600">Loading or invalid wallet...</p>
        )}
      </div>
    </div>
  );
};

export default VerifyCertificate;
