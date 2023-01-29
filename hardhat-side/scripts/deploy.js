const { ethers } = require("hardhat");

async function main() {
  const FundContractFactory = await ethers.getContractFactory("Fund");
  console.log("Deploying contract...");
  const fundContract = await FundContractFactory.deploy();
  await fundContract.deployed();
  console.log(`Contract deployed to: ${fundContract.address}`);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
