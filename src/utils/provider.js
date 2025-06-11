import { ethers } from "ethers";

// Connect to Hardhat local node
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");

export default provider;
