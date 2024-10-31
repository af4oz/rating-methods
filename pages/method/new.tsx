import CreateMethod from "@/components/CreateMethod";
import useRootStore from "@/store";
import { idEqual } from "@/utils/common";
import { useRouter } from "next/router";

export default function NewMethod() {
  const router = useRouter();
  const store = useRootStore();

  const forkMethodId = Number(router.query.forkMethodId);
  if (!Number.isNaN(forkMethodId)) {
    const method = store.methods.find((item) => idEqual(item.id, forkMethodId));
    if (!method) {
      return <div>Method not found with id: {forkMethodId}</div>;
    }
    return <CreateMethod forkMethod={method} />;
  }

  return <CreateMethod />;
}
