import CreateRating from "@/components/CreateRating";
import { useRouter } from "next/router";

export default function NewRating() {
  const router = useRouter();
  const applyMethodId = Number(router.query.applyMethodId);
  const forkRatingId = Number(router.query.forkRatingId);
  return (
    <CreateRating applyMethodId={applyMethodId} forkRatingId={forkRatingId} />
  );
}
