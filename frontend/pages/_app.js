import NavBar from "@/components/NavBar";
import "@/styles/globals.css";
import { ContextProvider } from "../context/ContextProvider";

export default function App({ Component, pageProps }) {
  return (
    <ContextProvider>
      <NavBar />
      <Component {...pageProps} />
    </ContextProvider>
  );
}
