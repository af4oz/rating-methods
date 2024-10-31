import CreateRating from "@/components/CreateRating";
import useRootStore from "@/store";
import { idEqual } from "@/utils/common";
import { useRouter } from "next/router";

export default function EditRating() {
  const router = useRouter();
  const editRatingId = Number(router.query.id);
  if (!Number.isNaN(editRatingId)) {
    const store = useRootStore();
    const rating = store.ratings.find((item) => idEqual(item.id, editRatingId));
    if (!rating) {
      return <div>Rating not found with id: {editRatingId}</div>;
    }
    return <CreateRating editRating={rating} />;
  }
  return <CreateRating />;
}
