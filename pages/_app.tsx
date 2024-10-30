import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { useEffect } from "react";
import useRootStore from "@/store";

export default function App({ Component, pageProps }: AppProps) {
  const saveToLocalStorage = useRootStore((state) => state.saveToLocalStorage);
  const restoreFromLocalStorage = useRootStore(
    (state) => state.restoreFromLocalStorage
  );

  useEffect(() => {
    restoreFromLocalStorage();

    // Attach the save function to the beforeunload event
    window.addEventListener("beforeunload", saveToLocalStorage);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("beforeunload", saveToLocalStorage);
    };
  }, []);
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
