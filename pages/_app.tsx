import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { useEffect } from "react";
import useStore from "@/store";
import { LocalStorageKey } from "@/constants";

export default function App({ Component, pageProps }: AppProps) {
  const store = useStore();
  useEffect(() => {
    // Function to save data to localStorage
    const saveDataToLocalStorage = () => {
      localStorage.setItem(LocalStorageKey, JSON.stringify(store.methods));
    };

    // Attach the save function to the beforeunload event
    window.addEventListener("beforeunload", saveDataToLocalStorage);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("beforeunload", saveDataToLocalStorage);
    };
  });
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
