import { BrowserProvider, Contract } from "ethers";
import React, { createContext, useEffect, useState } from "react";
import { CONTRACT_ADDRESS, ABI } from "../Blockchain/contractConfig.js";

export const BlockchainContext = createContext();

export const BlockchainProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const tempProvider = new BrowserProvider(window.ethereum); // ✅ Replaced Web3Provider
        const tempSigner = await tempProvider.getSigner();
        const tempAccount = await tempSigner.getAddress();
        const tempContract = new Contract(CONTRACT_ADDRESS, ABI, tempSigner); // ✅ Use Contract from ethers v6

        setProvider(tempProvider);
        setSigner(tempSigner);
        setAccount(tempAccount);
        setContract(tempContract);
      } else {
        alert("Please install MetaMask!");
      }
    };

    init();
  }, []);

  return (
    <BlockchainContext.Provider
      value={{ provider, signer, contract, account }}
    >
      {children}
    </BlockchainContext.Provider>
  );
};