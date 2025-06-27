import React from "react";
import { useNavigate } from "react-router-dom";

const HelpSupport = () => {
  const navigate = useNavigate();

  const goBack = () => navigate("/");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-indigo-900 py-10 px-4 flex items-center justify-center">
      <div className=" bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-lg max-w-3xl w-full p-8 text-white">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Help & Support</h1>
          <button
            onClick={goBack}
            className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded"
          >
            Home
          </button>
        </div>

        <p className="text-purple-100 mb-4">
          If you're facing any issues or need assistance, we're here to help. Please read through the most frequently asked questions below or reach out directly.
        </p>

        <div className="bg-purple-900 bg-opacity-40 p-4 rounded-lg mb-4">
          <h2 className="font-semibold text-lg mb-2">❓ How to verify my certificate?</h2>
          <p className="text-sm text-purple-200">
            Simply visit the verification link provided on your student dashboard and enter the hash and wallet address.
          </p>
        </div>

        <div className="bg-purple-900 bg-opacity-40 p-4 rounded-lg mb-4">
          <h2 className="font-semibold text-lg mb-2">🛠 What if my certificate is not found?</h2>
          <p className="text-sm text-purple-200">
            Ensure your university has uploaded it to the blockchain. If it's still not visible, reach out to your admin.
          </p>
        </div>

        <div className="bg-purple-900 bg-opacity-40 p-4 rounded-lg">
          <h2 className="font-semibold text-lg mb-2">📞 Need more help?</h2>
          <p className="text-sm text-purple-200">
            Contact us at <span className="underline">support@credentialdapp.com</span> or call <span className="underline">+91-7460076794</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
