// /src/context/BlockchainProvider.jsx
import React, { createContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
// import CertificateVerification from '../Blockchain/contracts/CertificateVerification'

export const BlockchainContext = createContext();

const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // Replace if changed

export const BlockchainProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const tempSigner = tempProvider.getSigner();
        const tempAccount = await tempSigner.getAddress();
        const tempContract = new ethers.Contract(CONTRACT_ADDRESS, CertificateVerification.abi, tempSigner);

        setProvider(tempProvider);
        setSigner(tempSigner);
        setAccount(tempAccount);
        setContract(tempContract);
      } else {
        alert('Please install MetaMask!');
      }
    };

    init();
  }, []);

  return (
    <BlockchainContext.Provider value={{ provider, signer, contract, account }}>
      {children}
    </BlockchainContext.Provider>
  );
};
