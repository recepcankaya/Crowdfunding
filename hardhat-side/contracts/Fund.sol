//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Fund {
    using SafeMath for uint;

    struct Proposal {
        string description;
        uint256 deadline;
        uint256 yes;
        uint256 no;
        uint256 totalContribution;
        uint256 requestedContribution;
        uint256 numberOfVoters;
        uint256 contributors;
        address caller;
        bool isContributionEnded;
        mapping(address => bool) voters;
    }

    enum Vote {
        NO,
        YES
    }

    // given id help to find the proposal
    mapping(uint256 => Proposal) public proposals;
    uint256 public proposalId;

    // Create proposal
    function createProposal(
        string memory _description
    ) public returns (uint256) {
        Proposal storage proposal = proposals[proposalId];
        proposal.deadline = block.timestamp + 1 minutes;
        proposal.isContributionEnded = false;
        proposal.caller = msg.sender;
        proposal.description = _description;
        proposalId++;
        // With function execution, the id is incremented. To find the correct id belongs to the proposal
        // it is returned minus 1
        return proposalId - 1;
    }

    modifier activeProposal(uint256 proposalIndex) {
        require(
            block.timestamp < proposals[proposalIndex].deadline,
            "This proposal does not accept any vote"
        );
        _;
    }

    modifier preventOverFunding(uint256 proposalIndex) {
        require(
            proposals[proposalIndex].totalContribution <=
                proposals[proposalIndex].requestedContribution.mul(11).div(10),
            "You exceeded contribution limit"
        );
        _;
    }

    modifier isProposalPassed(uint256 proposalIndex) {
        require(
            proposals[proposalIndex].yes > proposals[proposalIndex].no,
            "Proposal did not pass. Campaign cannot be started!"
        );
        _;
    }

    modifier onlyVoters(uint256 proposalIndex) {
        Proposal storage proposal = proposals[proposalIndex];
        require(
            proposal.voters[msg.sender] = true,
            "You did not vote. You cannot contribute to the campaign"
        );
        _;
    }

    modifier timeRestrictionForContribution(uint256 endTime) {
        require(
            block.timestamp < endTime,
            "You cannot contribute because the time has expired"
        );
        _;
    }

    function voteProposal(
        uint256 proposalIndex,
        Vote vote
    ) public activeProposal(proposalIndex) {
        Proposal storage proposal = proposals[proposalIndex];
        if (vote == Vote.YES) {
            proposal.yes++;
        } else {
            proposal.no++;
        }
        require(
            !proposal.voters[msg.sender],
            "Since you voted, you cannot vote again"
        );
        proposal.voters[msg.sender] = true;
        proposal.numberOfVoters++;
    }

    function contributeToContract(
        uint256 proposalIndex
    )
        public
        payable
        onlyVoters(proposalIndex)
        preventOverFunding(proposalIndex)
        timeRestrictionForContribution(block.timestamp + 1 minutes)
    {
        Proposal storage proposal = proposals[proposalIndex];
        proposal.totalContribution += msg.value;
        proposal.contributors++; // Sıfırdan başladığı için frontta üstüne bir ekleterek başla
        proposal.isContributionEnded = true;
    }

    function transferContributionToCreator(
        uint256 proposalIndex
    ) public isProposalPassed(proposalIndex) {
        Proposal storage proposal = proposals[proposalIndex];
        require(proposal.isContributionEnded, "Contribution has not ended yet");
        require(address(this).balance != 0, "Contract balance is zero");
        require(
            address(this).balance >= proposal.totalContribution,
            "The contract has insufficient balance"
        );
        payable(proposal.caller).transfer(proposal.totalContribution);
    }

    // Functions to receive Ether from contributors
    receive() external payable {}

    fallback() external payable {}
}
