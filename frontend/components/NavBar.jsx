import { ContextAPI } from "../context/ContextProvider";
import { useContext } from "react";

export default function NavBar() {
  const { connectWallet, walletConnected } = useContext(ContextAPI);

  return (
    <nav className="bg-zinc-800 h-16">
      <div className="flex justify-between items-center mx-8">
        <h1 className="text-2xl text-slate-200">Crowdfunding</h1>
        <button
          className="p-1.5 text-slate-200 border border-solid border-violet-800 rounded-lg hover:bg-gradient-to-br from-orange-600 to-violet-700 hover:border-slate-600"
          onClick={connectWallet}>
          {walletConnected ? "Wallet Connected" : "Connect Wallet"}
        </button>
      </div>
    </nav>
  );
}
