import CreateMethod from "@/components/CreateMethod";
import { useRouter } from "next/router";

export default function EditMethod() {
  const router = useRouter();
  const editMethodId = Number(router.query.id);
  if (!editMethodId) {
    return <div>Invalid Method id: {editMethodId}</div>;
  }

  return <CreateMethod editMethodId={editMethodId} />;
}
