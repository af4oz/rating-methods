import CriterionTableRow from "@/components/CriterionTableRow";
import useRootStore from "@/store";
import { CreateRatingProps, CriterionProps, T_Rating } from "@/types";
import { hasValidWeights, idEqual } from "@/utils/common";
import { useRouter } from "next/router";
import { useId, useState } from "react";

let criterioncount = 0;
/**
 *
 * /rating/new
 * <CreateRating>
 *
 * /rating/new?applyMethodId=methodId
 * <CreateRating applyMethodId="" />
 *
 * /rating/new?forkRatingId=ratingId
 * <CreateRating forkRatingId="" />
 *
 * /rating/edit/[id]
 * <CreateRating editRatingId="1"/>
 */
export default function CreateRating({
  applyMethodId,
  forkRatingId,
  editRatingId,
}: CreateRatingProps) {
  const id = useId();
  const [error, setError] = useState("");
  const [finalRating, setFinalRating] = useState(NaN);
  const store = useRootStore();
  const router = useRouter();

  const getId = () => {
    if (applyMethodId || forkRatingId) return store.ratingCounter;
    else if (editRatingId) return editRatingId;
    else return store.ratingCounter;
  };

  const initRating = (): T_Rating => {
    if (applyMethodId) {
      // Initial state of a rating when fork/edit/apply buttons pressed on /method/new or /method/[id] pages
      const method = store.methods.find((item) =>
        idEqual(item.id, applyMethodId)
      );
      if (!method) {
        throw new Error("Method not found");
      }
      return {
        id: getId(),
        name: "Untited",
        method: { id: method.id, name: method.name },
        criteria: method.criteria.map((item) => ({ ...item, value: 0 })),
      };
    } else if (forkRatingId || editRatingId) {
      // Initial state of a rating when fork/edit buttons pressed on /rating/[id] pages
      const rating = store.ratings.find((item) =>
        idEqual(item.id, (forkRatingId || editRatingId) as number)
      );

      if (!rating) {
        throw new Error("Rating not found");
      }
      return {
        id: getId(),
        name: forkRatingId ? "Untited" : rating.name,
        criteria: rating.criteria,
      };
    } else {
      // Initial state of a new rating
      return {
        id: getId(),
        name: "Untited",
        criteria: [
          {
            id: id + ++criterioncount,
            name: "Default",
            weight: 100,
            value: 5,
          },
        ],
      };
    }
  };
  const [rating, setRating] = useState<T_Rating>(initRating);

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

    // Save/edit rating to store
    const data = { ...rating, criteria: formattedCriteria, finalRating };
    if (editRatingId) {
      store.editRating(editRatingId, data);
    } else {
      store.saveRating(data);
    }

    // Route back to home
    router.push("/");
  };

  return (
    <div>
      <h1 className="h1">{rating.name}</h1>
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
