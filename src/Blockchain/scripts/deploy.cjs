const hre = require("hardhat");

async function main() {
  const CertificateVerification = await hre.ethers.getContractFactory("CertificateVerification");
  const contract = await CertificateVerification.deploy();

  await contract.waitForDeployment(); // ✅ Replaces contract.deployed()

  console.log(`Contract deployed at: ${contract.target}`); // ✅ Use contract.target instead of contract.address
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

