import React from 'react';
import { ethers } from 'ethers';

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const address = accounts[0];
      return address;
    } catch (err) {
      throw new Error("User denied connection");
    }
  } else {
    throw new Error("MetaMask not found");
  }
};
