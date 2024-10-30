import CriterionTableRow from "@/components/CriterionTableRow";
import useRootStore from "@/store";
import { CriterionProps, T_Rating } from "@/types";
import { hasValidWeights } from "@/utils/common";
import { useRouter } from "next/router";
import { useId, useState } from "react";

let criterioncount = 0;
export default function NewRating() {
  const id = useId();
  const [error, setError] = useState("");
  const [finalRating, setFinalRating] = useState(NaN);
  const store = useRootStore();
  const router = useRouter();
  const [rating, setRating] = useState<T_Rating>({
    id: store.ratingCounter,
    name: "Untited",
    criteria: [
      {
        id: id + ++criterioncount,
        name: "Default",
        weight: 100,
        value: 5,
      },
    ],
  });

  const onCriterionChange: CriterionProps<"withValue">["onChange"] = (
    criterion
  ) => {
    setRating((rating) => ({
      ...rating,
      criteria: rating.criteria.map((item) =>
        item.id === criterion.id ? criterion : item
      ),
    }));
  };

  const handleAddCriterion = () => {
    setRating((r) => ({
      ...r,
      criteria: [
        ...r.criteria,
        {
          id: id + ++criterioncount,
          name: "Default",
          value: 5,
          weight: 0,
        },
      ],
    }));
  };

  const handleDelete: CriterionProps["onDelete"] = (deletedItem) => {
    setRating((r) => ({
      ...r,
      criteria: r.criteria.filter((item) => item.id !== deletedItem.id),
    }));
  };

  const handleCalculate = () => {
    // Reset related state
    setError("");
    setFinalRating(NaN);

    // Data formatting TODO: (remove duplicated work)
    const formattedCriteria = rating.criteria.map((item) => ({
      ...item,
      weight: Number(item.weight),
    }));

    // Verification
    // 1. All weights summed should be equal to 100
    if (!hasValidWeights(formattedCriteria)) {
      setError("All weights summed should be equal to 100");
      return;
    }
    // Calculation
    // 1. Normalize weights
    const normalizedCriteria = formattedCriteria.map((item) => ({
      ...item,
      weight: Math.round((item.weight / 100) * 100) / 100,
    }));
    // 2. Use WSM(weighted sum model) model
    const finalRating = normalizedCriteria.reduce((acc, curr) => {
      return acc + curr.value * curr.weight;
    }, 0);
    // 3. round up to 2 decimal places and return
    setFinalRating(Math.round(finalRating * 100) / 100);
  };

  const handleSave = () => {
    // Reset Error state
    setError("");

    // Data formatting TODO: (remove duplicated work)
    const formattedCriteria = rating.criteria.map((item) => ({
      ...item,
      weight: Number(item.weight),
    }));

    // Verification
    // 1. All weights summed should be equal to 100
    if (!hasValidWeights(formattedCriteria)) {
      setError("All weights summed should be equal to 100");
      return;
    }

    // Save rating to store
    store.saveRating({ ...rating, criteria: formattedCriteria, finalRating });

    // Route back to home
    router.push("/");
  };

  return (
    <div>
      <h1 className="h1">{rating.name}</h1>
      {error && <div className="text-red-600">Error: {error}</div>}
      <table>
        <thead>
          <tr>
            <th align="left" className="pr-4 py-2">
              Criterion name
            </th>
            <th align="left" className="pr-4 py-2">
              Weight
            </th>
            <th align="left" className="pr-4 py-2">
              Rating
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rating.criteria.map((item) => (
            <CriterionTableRow
              type="withValue"
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
      <b>Final Rating:</b> {finalRating}
      <br />
      <br />
      <div>
        <button onClick={handleCalculate} className="btn-primary mr-4">
          Calculate
        </button>
        <button onClick={handleSave} className="btn-primary">
          Save
        </button>
      </div>
    </div>
  );
}
