const { assert, expect } = require("chai");
const { ethers, deployments } = require("hardhat");

describe("Fund", function () {
  let fundContract;
  let timeContract;

  const proposals = [{
    id: 0,
    description: "A Proposal",
    deadline: 1000000,
    yes: 0,
    no: 0,
    totalContribution: 0,
    requestedContribution: 0,
    numberOfVoters: 0,
    contributors: 0,
    caller: "0x000",
    isContributionEnded: false
  }];

  beforeEach(async function () {
    fundContract = await ethers.getContractFactory("Fund");
    timeContract = await ethers.getContractFactory("Time");
    await fundContract.deploy();
    await timeContract.deploy();
  });

  describe("Create Proposal", function () {
    it("Should retrieve the correct proposal from the proposals array", async function () {
      // Define the proposalId and the proposals array
      const proposalId = 0;
      const proposal = proposals[proposalId];

      assert.equal(proposal.id, proposalId);
    });
  });
});