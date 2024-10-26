import { LocalStorageKey } from "@/constants";
import useStore from "@/store";
import { RatingMethod } from "@/types";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  const store = useStore();

  useEffect(() => {
    // Check if window is defined to make sure this code only runs on the client side
    if (typeof window !== "undefined") {
      // Get item from localStorage
      const storedData = localStorage.getItem(LocalStorageKey);
      if (storedData) {
        store.setMethods(JSON.parse(storedData) as RatingMethod[]);
      }
    }
  }, []);

  return (
    <div>
      <h1 className="text-center py-4">Rating methods</h1>
      <main className="p-4">
        <Link
          href="/method/new"
          className="border-white border rounded px-2 py-4 bg-green-600 shadow-md hover:active:bg-green-500"
        >
          + New rating method
        </Link>
        <h2 className="mt-4">Existing rating methods</h2>
        <table className="w-full">
          <thead className="border-b-2 font-bold">
            <tr className="text-left">
              <th>Id</th>
              <th>Method Name</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b-1">
              <td>1</td>
              <td>
                <Link href={`/method/${1}`}>Nww</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
