import CriterionTableRow from "@/components/CriterionTableRow";
import { CriterionProps, T_RatingMethod } from "@/types";
import { useState } from "react";

export default function NewMethod() {
  const onCriterionChange: CriterionProps["onChange"] = (criterion) => {
    setRatingMethod((method) => ({
      ...method,
      criteria: method.criteria.map((item) =>
        item.name === criterion.name ? criterion : item
      ),
    }));
    console.log(criterion);
  };
  const [method, setRatingMethod] = useState<T_RatingMethod>({
    name: "Untited",
    criteria: [{ name: "Default", weight: 100 }],
  });
  return (
    <div>
      <h1>{method.name}</h1>
      <table>
        <thead>
          <tr>
            <th>Criterion name</th>
            <th>Weight</th>
          </tr>
        </thead>
        <tbody>
          {method.criteria.map((item) => (
            <CriterionTableRow
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
