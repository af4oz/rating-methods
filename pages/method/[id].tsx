import { useRouter } from "next/router";
import useRootStore from "@/store";

export default function Page() {
  const router = useRouter();
  const store = useRootStore();
  const method = store.methods.find((item) => item.id === router.query.id);

  if (!method) {
    return <div>Method not found</div>;
  }

  return (
    <div>
      <h1 className="text-center py-4">{method?.name}</h1>
    </div>
  );
}
