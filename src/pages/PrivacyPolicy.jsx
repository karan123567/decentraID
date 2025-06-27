import React from "react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2A0845] to-[#6441A5] flex items-center justify-center px-4 py-10">
      <div className="max-w-3xl w-full bg-white/10 backdrop-blur-md shadow-xl rounded-3xl p-8 text-white relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 right-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Back
        </button>

        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          Privacy Policy
        </h1>

        <div className="space-y-4 text-sm leading-relaxed">
          <p>
            At Credential DApp, we are committed to protecting your privacy. This policy outlines the types of personal information we may collect and how we use, share, and safeguard it.
          </p>

          <p>
            We collect only essential details like name, roll number, and wallet address for registration purposes. All certificates are hashed and stored securely on the blockchain. We do not share your personal data with third parties.
          </p>

          <p>
            Blockchain records are immutable and transparent. However, our system ensures that your document content remains confidential since only the hash is stored.
          </p>

          <p>
            By using our platform, you consent to this privacy policy. We may update it periodically to reflect changes in our services or regulations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
