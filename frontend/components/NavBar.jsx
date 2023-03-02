import { useContext } from "react"
import Link from "next/link"
import { ContextAPI } from "../context/ContextProvider"

export default function NavBar() {
  const { connectWallet, walletConnected, address } = useContext(ContextAPI)

  return (
    <nav className="bg-neutral-900 h-16">
      <div className="flex justify-between items-center mx-8">
        <h1 className="text-2xl text-slate-200">Crowdfunding</h1>
        <Link href="/Vote">
          <span className="text-white">Vote</span>
        </Link>
        <button
          className="p-1.5 text-slate-200 border border-solid border-violet-800 rounded-lg hover:bg-gradient-to-br from-orange-600 to-violet-700 hover:border-slate-600"
          onClick={connectWallet}>
          {walletConnected ? "Wallet Connected" : "Connect Wallet"} : {""}
          {address.slice(0, 6)}...{address.slice(-3)}
        </button>
      </div>
    </nav>
  )
}
