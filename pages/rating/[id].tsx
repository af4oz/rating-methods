import useRootStore from "@/store";
import { idEqual } from "@/utils/common";
import { useRouter } from "next/router";

export default function ViewRating() {
  const router = useRouter();
  const rating = useRootStore((state) =>
    state.ratings.find((item) => idEqual(item.id, router.query.id as string))
  );
  if (!rating) {
    return <div>Invalid rating id: {String(router.query.id)}</div>;
  }

  const handleEdit = () => {
    router.push(`/rating/edit/${rating.id}`);
  };

  const handleFork = () => {
    router.push(`/rating/new?forkRatingId=${rating.id}`);
  };

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="h1">Rating Name: {rating.name}</h1>
        <div>
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
            <th align="left" className="pr-4 py-2">
              Rating
            </th>
          </tr>
        </thead>
        <tbody>
          {rating.criteria.map((item) => (
            <tr key={item.id} className="p-2 my-2">
              <td className="pr-4 py-2">{item.name}</td>
              <td className="pr-4 py-2">{item.weight}</td>
              <td className="pr-4 py-2">{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <br />
      {rating.finalRating ? (
        <div>
          <b>Final Rating: </b> {rating.finalRating}
        </div>
      ) : null}
    </div>
  );
}
