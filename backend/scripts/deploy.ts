import { ethers, run } from "hardhat";
// import "@nomicfoundation/hardhat-verify";
require('dotenv').config()

async function main() {
  const merkleRoot = process.env.MERKLE_ROOT || ""
  const PrlxAirdrop = await ethers.getContractFactory("PrlxAirdrop");
  const prlxAirdrop = await PrlxAirdrop.deploy(merkleRoot);

  await prlxAirdrop.deployed();
  console.log(`PrlxAirdrop deployed to ${prlxAirdrop.address}`);

  await run("verify:verify", {
    address: prlxAirdrop.address,
    constructorArguments: [merkleRoot],
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
