import { ethers } from "hardhat";
import "dotenv/config";

async function main() {
  const LensTellContract = await ethers.getContractFactory("LensTell");

  const [deployer] = await ethers.getSigners();

  console.log("Deploying...");
  const attestor =
    process.env["MUMBAI_LENSAPI_ORACLE_ENDPOINT"] || deployer.address; // When deploy for real e2e test, change it to the real attestor wallet.
  const consumer = await LensTellContract.deploy(attestor);
  await consumer.deployed();
  console.log("Deployed", {
    consumer: consumer.address,
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
