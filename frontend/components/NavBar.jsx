import { providers } from "ethers";
import { useState, useRef, useEffect } from "react";
import Web3Modal from "web3modal";

export default function NavBar() {
  const [walletConnected, setWalletConnected] = useState(false);
  const web3ModalRef = useRef();

  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 80001) {
      window.alert("Change the network to Mumbai");
      throw new Error("Change the network to Mumbai");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "mumbai",
        providerOptions: [],
        disableInjectedProvider: false,
      });
      connectWallet();
    }
  }, [walletConnected]);

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
