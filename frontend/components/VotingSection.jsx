export default function VotingSection({ selectedProposal }) {
  return (
    <div className="absolute top-0 right-36">
      {selectedProposal.map((element, id) => (
        <div>
          <h2 className="mb-4 text-xl text-stone-300 decoration-solid underline underline-offset-4 decoration-orange-600">
            Vote for Proposal
          </h2>
          <p key={id} className="mb-4 text-stone-300">
            Selected Proposal: {element[0]}:{" "}
            {element.requestedContribution.toString()}
          </p>
          <p className="text-stone-300 decoration-solid underline underline-offset-4 decoration-violet-600">
            What are you voting for? Light or Darkness?
          </p>
          <input type="checkbox" name="" id="" />
          <input type="checkbox" name="" id="" />
        </div>
      ))}
    </div>
  )
}
