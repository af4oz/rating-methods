import CriterionTableRow from "@/components/CriterionTableRow";
import { CriterionProps, T_Rating } from "@/types";
import { useState } from "react";

export default function NewRating() {
  const onCriterionChange: CriterionProps<"withValue">["onChange"] = (
    criterion
  ) => {
    setRating((rating) => ({
      ...rating,
      criteria: rating.criteria.map((item) =>
        item.name === criterion.name ? criterion : item
      ),
    }));
    console.log(criterion);
  };
  const [rating, setRating] = useState<T_Rating>({
    name: "Untited",
    criteria: [{ name: "Default", weight: 100, value: 5 }],
  });
  return (
    <div>
      <h1>{rating.name}</h1>
      <table>
        <thead>
          <tr>
            <th>Criterion name</th>
            <th>Weight</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {rating.criteria.map((item) => (
            <CriterionTableRow
              type="withValue"
              criterion={item}
              onChange={onCriterionChange}
              key={item.name}
            />
          ))}
        </tbody>
      </table>
      {/* <AddCriterionButton /> */}

      <datalist id="markers">
        <option value="1"></option>
        <option value="2"></option>
        <option value="3"></option>
        <option value="4"></option>
        <option value="5"></option>
        <option value="6"></option>
        <option value="7"></option>
        <option value="8"></option>
        <option value="9"></option>
        <option value="10"></option>
      </datalist>
    </div>
  );
}
