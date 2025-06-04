import React, { useState } from 'react';
import { ethers } from 'ethers';

const AdminSignIn = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    if (!window.ethereum) {
      setError("MetaMask not found.");
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const address = accounts[0];
      setWalletAddress(address);

      // TODO: Check isAdmin(address) from contract

    } catch (err) {
      setError("MetaMask connection denied.");
    }
  };

  return (
    <div>
      <h2>Admin Sign In</h2>
      <button onClick={handleSignIn}>Connect MetaMask</button>
      {walletAddress && <p>✅ Admin Wallet: {walletAddress}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AdminSignIn;
