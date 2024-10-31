import CreateRating from "@/components/CreateRating";
import useRootStore from "@/store";
import { idEqual } from "@/utils/common";
import { useRouter } from "next/router";

export default function NewRating() {
  const router = useRouter();
  const store = useRootStore();

  const applyMethodId = Number(router.query.applyMethodId);
  if (!Number.isNaN(applyMethodId)) {
    const method = store.methods.find((item) =>
      idEqual(item.id, applyMethodId)
    );
    if (!method) {
      return <div>Method not found with id: {applyMethodId}</div>;
    }
    return <CreateRating applyMethod={method} />;
  }

  const forkRatingId = Number(router.query.forkRatingId);
  if (!Number.isNaN(forkRatingId)) {
    const rating = store.ratings.find((item) => idEqual(item.id, forkRatingId));
    if (!rating) {
      return <div>Rating not found with id: {forkRatingId}</div>;
    }
    return <CreateRating forkRating={rating} />;
  }

  return <CreateRating />;
}
