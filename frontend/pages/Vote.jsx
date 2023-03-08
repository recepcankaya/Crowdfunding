import Head from "next/head"
import { useContext, useEffect, useState } from "react"
import { ContextAPI } from "../context/ContextProvider"

export default function Vote() {
  const [proposalArray, setProposalArray] = useState([])
  const [openProposalArray, setOpenProposalArray] = useState([])
  const { contractInstance, getProviderOrSigner } = useContext(ContextAPI)

  const getAllProposals = async () => {
    try {
      const provider = await getProviderOrSigner()
      const contract = await contractInstance(provider)
      let i = 0
      let done = false
      setProposalArray([])
      while (!done) {
        try {
          const proposal = await contract.proposals(i)
          if (proposal.description) {
            setProposalArray((proposals) => [...proposals, proposal])
          }
          i++
        } catch (error) {
          done = true
          console.error(error)
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  console.log(proposalArray)

  const getOpenProposals = async () => {
    try {
      const provider = await getProviderOrSigner()
      const contract = await contractInstance(provider)
      let i = 0
      let done = false
      setOpenProposalArray([])
      while (!done) {
        try {
          const proposal = await contract.proposals(i)
          console.log(proposal)
          if (proposal.deadline > Math.floor(Date.now() / 1000)) {
            setOpenProposalArray((proposals) => [...proposals, proposal])
          }
          i++
        } catch (error) {
          done = true
          console.error(error)
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    getAllProposals()
    getOpenProposals()
  }, [])

  return (
    <>
      <Head>
        <title>Vote</title>
      </Head>
      <main className="relative">
        <section>
          <div className="w-2/5 h-48 mt-10 ml-20 border-solid border-2 border-violet-700 rounded-lg">
            <h2 className="pt-2 text-xl text-stone-300 text-center decoration-solid underline underline-offset-4 decoration-orange-600">
              Open Proposals
            </h2>
            {openProposalArray.map((element, id) => (
              <ul key={id} className="ml-8 mt-4 text-stone-300 list-dic">
                <li>
                  {element[0]}: {element.requestedContribution.toString()}
                </li>
              </ul>
            ))}
          </div>
        </section>
        <section>
          <div className="w-2/5 h-auto overflow-auto pb-4 mt-10 ml-20 border-solid border-2 border-violet-700 rounded-lg">
            <h2 className="pt-4 text-xl text-stone-300 text-center decoration-solid underline underline-offset-4 decoration-orange-600 ">
              All Proposals
            </h2>
            {proposalArray.map((element, id) => (
              <ul key={id} className="ml-8 mt-4 text-stone-300 list-dic">
                <li>{element[0]}</li>
              </ul>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
