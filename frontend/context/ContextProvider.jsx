import { createContext, useRef, useState, useEffect } from "react";
import { Contract, providers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../constants/index";
import Web3Modal from "web3modal";

export const ContextAPI = createContext();

export function ContextProvider({ children }) {
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

  const contractInstance = (providerOrSigner) => {
    return new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, providerOrSigner);
  };

  // const getAddress = async () => {
  //   const signer = await getProviderOrSigner(true);
  //   const address = await signer.getAddress();
  //   console.log(address);
  // };

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
    <ContextAPI.Provider
      value={{
        connectWallet,
        walletConnected,
        contractInstance,
        getProviderOrSigner,
      }}>
      {children}
    </ContextAPI.Provider>
  );
}
