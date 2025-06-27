import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-700 flex items-center justify-center p-4">
      <div className=" bg-opacity-10 backdrop-blur-md rounded-2xl shadow-2xl max-w-3xl w-full p-8 text-white">
        <h1 className="text-3xl font-bold mb-4 text-center">About Us</h1>
        <p className="mb-4 text-lg leading-relaxed">
          Credential DApp is a decentralized solution designed to streamline and secure the verification of academic and professional certificates. Our mission is to empower universities, students, and recruiters with a blockchain-based platform that ensures authenticity and transparency.
        </p>
        <p className="mb-4 text-lg leading-relaxed">
          Built with cutting-edge technologies like Ethereum blockchain and IPFS, Credential DApp allows institutions to upload and hash certificates, students to generate verifiable links, and employers to verify credentials instantly without third-party dependency.
        </p>
        <p className="text-lg leading-relaxed">
          We are committed to eliminating fake credentials, reducing verification time, and promoting trust in the education and employment ecosystem.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
