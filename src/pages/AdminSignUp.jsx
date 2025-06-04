import React, { useState } from 'react';
import { ethers } from 'ethers';

const AdminSignUp = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignUp = async () => {
    if (!window.ethereum) {
      setError("MetaMask not installed.");
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const accounts = await provider.send("eth_requestAccounts", []);
      const address = accounts[0];
      setWalletAddress(address);

      // TODO: Interact with contract to register admin
      // await contract.registerAdmin(address);

      setSuccess("Admin registered successfully!");
    } catch (err) {
      setError("MetaMask connection error or user rejected.");
    }
  };

  return (
    <div>
      <h2>Admin Sign Up</h2>
      <button onClick={handleSignUp}>Connect MetaMask</button>
      {walletAddress && <p>🔑 Address: {walletAddress}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AdminSignUp;
