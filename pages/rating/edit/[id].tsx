import CreateRating from "@/components/CreateRating";
import { useRouter } from "next/router";

export default function EditRating() {
  const router = useRouter();
  const editRatingId = Number(router.query.id);
  if (!editRatingId) {
    return <div>Invalid Rating id: {editRatingId}</div>;
  }
  return <CreateRating editRatingId={editRatingId} />;
}
