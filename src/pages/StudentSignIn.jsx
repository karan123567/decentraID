import React, { useState } from 'react';
import { ethers } from 'ethers';
// import Navbar from '../components/Navbar';

const StudentSignIn = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    if (!window.ethereum) {
      setError("MetaMask not detected");
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const address = accounts[0];
      setWalletAddress(address);

      // TODO: Call smart contract isStudent(address) here

    } catch (err) {
      setError("User rejected MetaMask connection.");
    }
  };

  return (
    <div>
      <h2>Student Sign In</h2>
      <button onClick={handleSignIn}>Connect MetaMask</button>
      {walletAddress && <p>✅ Logged in as: {walletAddress}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default StudentSignIn;
