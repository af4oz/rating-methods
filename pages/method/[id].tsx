import useRootStore from "@/store";
import { idEqual } from "@/utils/common";
import { useRouter } from "next/router";

export default function ViewMethod() {
  const router = useRouter();
  const method = useRootStore((state) =>
    state.methods.find((item) => idEqual(item.id, router.query.id as string))
  );
  if (!method) {
    return <div>Invalid method id: {String(router.query.id)}</div>;
  }

  const handleEdit = () => {
    router.push(`/method/edit/${method.id}`);
  };

  const handleFork = () => {
    router.push(`/method/new?forkMethodId=${method.id}`);
  };

  const handleApply = () => {
    router.push(`/rating/new?applyMethodId=${method.id}`);
  };

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="h1">Rating Method Name: {method.name}</h1>
        <div>
          <button className="btn-primary mr-4 mb-2" onClick={handleApply}>
            Apply
          </button>
          <button className="btn-primary mr-4 mb-2" onClick={handleEdit}>
            Edit 📝
          </button>
          <button className="btn-primary mb-2" onClick={handleFork}>
            Fork
          </button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th align="left" className="pr-4 py-2">
              Criterion name
            </th>
            <th align="left" className="pr-4 py-2">
              Weight
            </th>
          </tr>
        </thead>
        <tbody>
          {method.criteria.map((item) => (
            <tr key={item.id} className="p-2 my-2">
              <td className="pr-4 py-2">{item.name}</td>
              <td className="pr-4 py-2">{item.weight}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
