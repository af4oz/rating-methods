import CreateMethod from "@/components/CreateMethod";
import { useRouter } from "next/router";

export default function NewMethod() {
  const router = useRouter();
  const editMethodId = Number(router.query.editMethodId);
  const forkMethodId = Number(router.query.forkMethodId);
  return (
    <CreateMethod editMethodId={editMethodId} forkMethodId={forkMethodId} />
  );
}
