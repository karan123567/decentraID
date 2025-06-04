import React, { useState } from 'react';
import { connectWallet } from '../components/WalletButton';

const StudentSignUp = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    try {
      const address = await connectWallet();
      setWalletAddress(address);

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Student Sign Up</h2>
      <button onClick={handleSignUp}>Connect MetaMask</button>
      {walletAddress && <p>✅ Connected: {walletAddress}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default StudentSignUp;
