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
      if (typeof window.ethereum === "undefined") {
        alert("Please install MetaMask!");
        return;
      }

      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });

        // Only call eth_requestAccounts if no account is connected
        if (accounts.length === 0) {
          await window.ethereum.request({
            method: "eth_requestAccounts",
          });
        }

        const tempProvider = new BrowserProvider(window.ethereum);
        const tempSigner = await tempProvider.getSigner();
        const tempAccount = await tempSigner.getAddress();
        const tempContract = new Contract(CONTRACT_ADDRESS, ABI, tempSigner);

        setProvider(tempProvider);
        setSigner(tempSigner);
        setAccount(tempAccount);
        setContract(tempContract);
      } catch (error) {
        console.error("MetaMask connection error:", error);
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