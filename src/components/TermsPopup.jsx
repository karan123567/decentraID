import React, { useState, useEffect } from "react";

const TermsPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("termsAccepted");
    if (!accepted) setShowPopup(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("termsAccepted", "true");
    setShowPopup(false);
  };

  const handleDecline = () => {
    alert("⚠ You must accept the terms to use this site.");
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-[999] flex justify-center items-center  bg-opacity-50 backdrop-blur-sm px-4">
      <div className=" bg-opacity-10 backdrop-blur-md text-white p-6 sm:p-8 rounded-2xl max-w-xl w-full shadow-2xl border border-white/20">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-white">
          Terms & Conditions
        </h2>
        <p className="text-sm text-purple-100 mb-4 text-center leading-relaxed">
          By using this platform, you agree to the following terms and conditions. These terms ensure that your data remains secure, verifiable, and tamper-proof using blockchain technology.
        </p>

        <ul className="list-disc text-sm pl-6 mb-6 text-purple-200 space-y-2">
          <li>Your credential data is hashed and stored securely on-chain.</li>
          <li>We do not store your personal documents or data off-chain.</li>
          <li>You are responsible for keeping your wallet address confidential.</li>
          <li>The platform uses smart contracts for certificate verification only.</li>
          <li>Do not attempt to upload fake or invalid documents — violators will be blocked.</li>
        </ul>

        <p className="text-xs text-center text-purple-300 mb-6">
          For more details, review our <a href="/privacy-policy" className="underline text-white hover:text-blue-300">Privacy Policy</a> and <a href="/terms" className="underline text-white hover:text-blue-300">Terms of Service</a>.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleDecline}
            className="px-5 py-2 rounded bg-red-600 hover:bg-red-700 transition"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-5 py-2 rounded bg-green-500 hover:bg-green-600 transition"
          >
            Allow
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsPopup;
