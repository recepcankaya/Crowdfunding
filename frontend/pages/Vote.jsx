import Head from "next/head"
import { useContext, useEffect, useState } from "react"
import { atom, useAtom } from "jotai"
import { ContextAPI } from "../context/ContextProvider"

const proposalsAtom = atom([])

export default function Vote() {
  const [proposalArray, setProposalArray] = useState([])
  const { contractInstance, getProviderOrSigner } = useContext(ContextAPI)

  const getOpenProposals = async () => {
    try {
      const provider = await getProviderOrSigner()
      const contract = await contractInstance(provider)
      let i = 0
      let done = false
      while (!done) {
        try {
          const proposal = await contract.proposals(i)
          if (proposal.description) {
            setProposalArray(proposal)
          }
          i++
        } catch (error) {
          done = true
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    getOpenProposals()
  }, [])

  return (
    <>
      <Head>
        <title>Vote</title>
      </Head>
      <main>
        <section>
          <div className="w-2/5 h-48 border-solid border-2 border-violet-700 rounded-lg">
            <h2 className="pt-2 text-xl text-stone-300 text-center decoration-solid underline underline-offset-4 decoration-orange-600">
              Open Proposals
            </h2>
          </div>
        </section>
      </main>
    </>
  )
}
