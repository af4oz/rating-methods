import CriterionTableRow from "@/components/CriterionTableRow";
import useRootStore from "@/store";
import { CreateMethodProps, CriterionProps, T_RatingMethod } from "@/types";
import { hasValidWeights, idEqual } from "@/utils/common";
import { useRouter } from "next/router";
import { useId, useState } from "react";

let criterioncount = 0;
/**
 *
 * /method/new
 * <CreateMethod>
 *
 * /method/new?forkMethodId=methodId
 * <CreateMethod forkMethodId="" />
 *
 * /method/edit/[id]
 * <CreateMethod editMethodId="1"/>
 */
export default function CreateMethod({
  forkMethodId,
  editMethodId,
}: CreateMethodProps) {
  const id = useId();
  const [error, setError] = useState("");
  const store = useRootStore();
  const router = useRouter();

  const getId = () => {
    if (editMethodId) return editMethodId;
    else return store.methodCounter;
  };

  const initRating = (): T_RatingMethod => {
    if (editMethodId || forkMethodId) {
      // Initial state of a method when edit buttons pressed on /method/[id] pages
      const method = store.methods.find((item) =>
        idEqual(item.id, (forkMethodId || editMethodId) as number)
      );
      if (!method) {
        throw new Error("Method not found");
      }
      return {
        id: getId(),
        name: method.name,
        criteria: method.criteria,
      };
    } else {
      // Initial state of a new method
      return {
        id: store.methodCounter,
        name: "Untited",
        criteria: [
          {
            id: id + ++criterioncount,
            name: "Default",
            weight: 100,
          },
        ],
      };
    }
  };

  const [method, setMethod] = useState<T_RatingMethod>(initRating);

  const onCriterionChange: CriterionProps["onChange"] = (criterion) => {
    setMethod((method) => ({
      ...method,
      criteria: method.criteria.map((item) =>
        item.id === criterion.id ? criterion : item
      ),
    }));
  };

  const handleDelete: CriterionProps["onDelete"] = (deletedItem) => {
    setMethod((m) => ({
      ...m,
      criteria: m.criteria.filter((item) => item.id !== deletedItem.id),
    }));
  };

  const handleAddCriterion = () => {
    setMethod((m) => ({
      ...m,
      criteria: [
        ...m.criteria,
        {
          id: id + ++criterioncount,
          name: "Default",
          value: 5,
          weight: 0,
        },
      ],
    }));
  };
  const handleSave = () => {
    // Reset Error state
    setError("");

    // Data formatting TODO: (remove duplicated work)
    const formattedCriteria = method.criteria.map((item) => ({
      ...item,
      weight: Number(item.weight),
    }));

    // Verification
    // 1. All weights summed should be equal to 100
    if (!hasValidWeights(formattedCriteria)) {
      setError("All weights summed should be equal to 100");
      return;
    }

    // Save/edit method to store
    const data = { ...method, criteria: formattedCriteria };
    if (editMethodId) {
      store.editMethod(editMethodId, data);
    } else {
      store.saveMethod(data);
    }

    // Route back to home
    router.push("/");
  };

  const handleSaveAndApply = () => {
    // Save
    handleSave();
    // Apply
    router.push(`/rating/new?applyMethodId=${method.id}`);
  };

  return (
    <div>
      <h1 className="h1">{method.name}</h1>
      {error ? <div className="text-red-600">Error: {error}</div> : null}
      <table>
        <thead>
          <tr>
            <th align="left" className="pr-4 py-2">
              Criterion name
            </th>
            <th align="left" className="pr-4 py-2">
              Weight
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {method.criteria.map((item) => (
            <CriterionTableRow
              criterion={item}
              onChange={onCriterionChange}
              key={item.id}
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
      <button className="btn-primary py-0" onClick={handleAddCriterion}>
        ➕
      </button>
      <br />
      <br />
      <div>
        <button onClick={handleSave} className="btn-primary mr-4">
          Save method
        </button>
        <button onClick={handleSaveAndApply} className="btn-primary">
          Save & Apply
        </button>
      </div>
    </div>
  );
}
