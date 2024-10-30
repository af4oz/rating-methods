import useRootStore from "@/store";
import Link from "next/link";

export default function Home() {
  const methods = useRootStore((state) => state.methods);
  const ratings = useRootStore((state) => state.ratings);
  const reset = useRootStore((state) => state.reset);

  const handleReset = () => {
    // TODO: show a confirmation dialog

    reset();
  };

  return (
    <div>
      <main className="p-4">
        <Link href="/method/new" className="btn-primary mr-4">
          + New rating method
        </Link>
        <Link href="/rating/new" className="btn-primary mr-4">
          + New rating
        </Link>
        <button
          onClick={handleReset}
          className="btn bg-red-700 hover:bg-red-600"
        >
          Reset
        </button>
        <h2 className="h1 mt-2">Rating methods</h2>
        <table className="w-full">
          <thead className="border-b-2 border-gray-600 font-bold">
            <tr className="text-left">
              <th>id</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {methods?.length > 0
              ? methods.map((item) => {
                  return (
                    <tr className="border-b-1 border-gray-600" key={item.id}>
                      <td>{item.id}</td>
                      <td>
                        <Link className="link" href={`/method/${item.id}`}>
                          {item.name}
                        </Link>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
        <h2 className="h1 mt-2">Ratings</h2>
        <table className="w-full">
          <thead className="border-b-2 border-gray-600 font-bold">
            <tr className="text-left">
              <th>id</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {ratings?.length > 0
              ? ratings.map((item) => {
                  return (
                    <tr className="border-b-1 border-gray-600" key={item.id}>
                      <td>{item.id}</td>
                      <td>
                        <Link className="link" href={`/rating/${item.id}`}>
                          {item.name}
                        </Link>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
