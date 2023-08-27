import { ethers } from "hardhat";
import "dotenv/config";

async function main() {
  const LensTell = await ethers.getContractFactory("LensTell");

  const [deployer] = await ethers.getSigners();

  const consumerSC = process.env["MUMBAI_CONSUMER_CONTRACT_ADDRESS"];
  if (!consumerSC) {
    throw new Error("MUMBAI_CONSUMER_CONTRACT_ADDRESS not set");
  }
  const consumer = LensTell.attach(consumerSC);
  await Promise.all([consumer.deployed()]);

  console.log("Pushing a request...");
  await consumer
    .connect(deployer)
    .request("0x62aa", { value: ethers.utils.parseEther("0.01") });
  console.log("Done");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
