const { assert, expect } = require("chai");
const { ethers, deployments } = require("hardhat");

describe("Fund", function () {
  let fundContractFactory, fundContract;

  beforeEach(async function () {
    fundContractFactory = await ethers.getContractFactory("Fund");
    fundContract = await fundContractFactory.deploy();
  });

  describe("Create Proposal", function () {
    it("Should get the proposalId at first", async function () {
      const proposalId = await fundContract.proposalId();
      const expectedId = "0";
      assert.equal(proposalId.toString(), expectedId);
    });

    it("Should update propsalId by one after proposal created", async function () {
      const txResponse = await fundContract.createProposal("This is a proposal");
      await txResponse.wait(1);
      const expectedId = "1";
      const proposalId = await fundContract.proposalId();
      assert.equal(proposalId.toString(), expectedId);
    });
  });
});