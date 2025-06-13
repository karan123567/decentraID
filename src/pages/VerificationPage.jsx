// VerificationPage.jsx
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CONTRACT_ADDRESS, ABI } from "../Blockchain/contractConfig";
import { BrowserProvider, Contract } from "ethers";
import { useSearchParams } from "react-router-dom";

const VerificationPage = () => {
  const [searchParams] = useSearchParams();
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const walletParam = searchParams.get("wallet");
  const hashParam = searchParams.get("hash");

  const verifyCertificate = async () => {
    if (!walletParam || !hashParam) {
      toast.error("Invalid or missing verification link parameters.");
      return;
    }

    if (!window.ethereum) {
      toast.error("MetaMask is not detected.");
      return;
    }

    try {
      setLoading(true);
      const provider = new BrowserProvider(window.ethereum);
      const contract = new Contract(CONTRACT_ADDRESS, ABI, provider);
      const fetchedHash = await contract.getCertificateHash(walletParam);

      if (
        fetchedHash === "0x0000000000000000000000000000000000000000000000000000000000000000"
      ) {
        toast.error("No certificate found for this wallet.");
        setVerificationResult(false);
        return;
      }

      const isMatch = fetchedHash === hashParam;
      setVerificationResult(isMatch);
      toast.success(isMatch ? "✅ Certificate Verified" : "❌ Certificate Invalid or Tampered");
    } catch (err) {
      console.error("Verification failed:", err);
      toast.error("Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyCertificate();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-lg text-center space-y-4">
        <h1 className="text-2xl font-bold">Certificate Verification</h1>

        {loading ? (
          <p className="text-blue-400">Verifying certificate on blockchain...</p>
        ) : verificationResult === null ? (
          <p className="text-yellow-400">Awaiting verification...</p>
        ) : verificationResult ? (
          <p className="text-green-500 text-lg font-semibold">✅ Certificate is Valid</p>
        ) : (
          <p className="text-red-500 text-lg font-semibold">❌ Certificate is Invalid or Tampered</p>
        )}

        <div className="text-left mt-4 text-sm text-gray-400">
          <p><strong>Wallet:</strong> {walletParam || "N/A"}</p>
          <p className="break-all"><strong>Hash:</strong> {hashParam || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
