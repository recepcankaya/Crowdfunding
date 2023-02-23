const { assert, expect } = require("chai");
const { ethers } = require("hardhat");

describe("Fund", function () {
  let fundContractFactory, fundContract;

  beforeEach(async function () {
    fundContractFactory = await ethers.getContractFactory("Fund");
    fundContract = await fundContractFactory.deploy();
    await fundContract.deployed();
  });

  const vote = {
    NO: 0,
    YES: 1,
  };

  describe("Create Proposal", function () {
    it("Should get the proposalId at first", async function () {
      const proposalId = await fundContract.proposalId();
      const expectedId = "0";
      assert.equal(proposalId.toString(), expectedId);
    });

    it("Should update propsalId by one after proposal created", async function () {
      const txResponse = await fundContract.createProposal(
        "This is a proposal",
        0
      );
      await txResponse.wait(1);
      const expectedId = "1";
      const proposalId = await fundContract.proposalId();
      assert.equal(proposalId.toString(), expectedId);
    });

    it("Should create the proposal and get it from the mapping with the given description", async function () {
      const firstProposal = await fundContract.createProposal(
        "This is the first proposal",
        0
      );
      await firstProposal.wait(1);
      const secondProposal = await fundContract.createProposal(
        "This is the second proposal",
        0
      );
      await secondProposal.wait(1);
      const proposal1 = await fundContract.proposals(0);
      const proposal2 = await fundContract.proposals(1);
      assert.equal(proposal1.description, "This is the first proposal");
      assert.equal(proposal2.description, "This is the second proposal");
    });
  });

  describe("Vote Proposal", function () {
    beforeEach(async function () {
      const theProposal = await fundContract.createProposal("Test proposal", 0);
      theProposal.wait(1);
    });

    it("Should vote on proposal", async function () {
      await fundContract.voteProposal(0, vote.YES);
      const proposal = await fundContract.proposals(0);
      assert.equal(proposal.yes.toString(), "1");
    });

    it("Should not allow the user to vote again", async function () {
      await fundContract.voteProposal(0, vote.NO);
      await expect(fundContract.voteProposal(0, vote.NO)).to.be.revertedWith(
        "Since you voted, you cannot vote again"
      );
    });

    // it.only("Should set the voter true in proposal", async function () {
    //   const [user] = await ethers.getSigner();
    //   const initialVoterValue = await fundContract.proposals(0).voters[user.address];
    //   assert.equal(initialVoterValue, false);

    //   await fundContract.voteProposal(0, vote.YES);
    //   const finalVoterValue = await fundContract.proposals(proposalIndex).voters[user.address];
    //   assert.equal(finalVoterValue, true);
    // });
  });

  describe("Contribute to the Contract", function () {
    beforeEach(async function () {
      const theProposal = await fundContract.createProposal("Test proposal", 0);
      theProposal.wait(1);
    });

    it("Should get the inital value of contribution and contributor number", async function () {
      const proposal = await fundContract.proposals(0);
      assert.equal(proposal.totalContribution.toString(), "0");
      assert.equal(proposal.contributors.toString(), "0");
    });

    it("Should update the contribution value and contributor number", async function () {
      const [contributor] = await ethers.getSigners();
      const contributionAmount = ethers.utils.parseEther("1");
      await fundContract
        .connect(contributor)
        .contributeToContract(0, { value: contributionAmount });

      const proposal = await fundContract.proposals(0);
      assert.equal(proposal.totalContribution.toString(), contributionAmount);
      assert.equal(proposal.contributors.toString(), "1");
    });
  });

  describe("Transfer Contribution To Creator", function () {
    beforeEach(async function () {
      const theProposal = await fundContract.createProposal("Test proposal", 0);
      theProposal.wait(1);
      await fundContract.voteProposal(0, vote.YES);
      const [contributor] = await ethers.getSigners();
      const contributionAmount = ethers.utils.parseEther("1");
      await fundContract
        .connect(contributor)
        .contributeToContract(0, { value: contributionAmount });
    });

    it("Should finish the contribution", async function () {
      const proposal = await fundContract.proposals(0);
      assert.equal(proposal.isContributionEnded, true);
    });

    it("Should not be the zero balance of the contract", async function () {
      const balance = await ethers.provider.getBalance(fundContract.address);
      assert.notEqual(balance.toString(), "0");
    });

    it("Should be at least contract balance than total contribution", async function () {
      const balance = await ethers.provider.getBalance(fundContract.address);
      const proposal = await fundContract.proposals(0);
      // This line is performing an assertion check to verify that the balance of the contract's address is greater than or equal to the proposal.totalContribution.
      assert(balance.gte(proposal.totalContribution));
    });

    it.only("Contract balance should be transferred to the creator", async function () {
      const proposal = await fundContract.proposals(0);
      await fundContract.transferContributionToCreator(0);
      const creatorBalance = await ethers.provider.getBalance(proposal.caller);
      assert(creatorBalance.toString(), proposal.totalContribution.toString()); // Return later
    });
  });

  describe("Get Balance", function () {
    // This is for when the contract is deployed
    it("Should be zero inital contract balance", async function () {
      const balance = await ethers.provider.getBalance(fundContract.address);
      assert.equal(balance.toString(), "0");
    });

    // Second test case was covered in line 130
  });
});
