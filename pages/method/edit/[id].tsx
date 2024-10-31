import CreateMethod from "@/components/CreateMethod";
import useRootStore from "@/store";
import { idEqual } from "@/utils/common";
import { useRouter } from "next/router";

export default function EditMethod() {
  const router = useRouter();
  const editMethodId = Number(router.query.id);
  const store = useRootStore();
  if (!Number.isNaN(editMethodId)) {
    const method = store.methods.find((item) => idEqual(item.id, editMethodId));
    if (!method) {
      return <div>Method not found with id: {editMethodId}</div>;
    }
    return <CreateMethod editMethod={method} />;
  }
  return <CreateMethod />;
}
