import { CriterionProps, T_CriterionWithValue } from "@/types";
import { ChangeEventHandler } from "react";

export default function CriterionTableRow<Type extends "withValue" | undefined>(
  props: CriterionProps<Type>
) {
  const id = `criterion-${props.criterion.name}`;
  const idForWeightInput = id + "-weight";

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const updatedCriterion = {
      ...props.criterion,
      [e.target.name]: e.target.value,
    };
    props.onChange(updatedCriterion);
  };
  return (
    <tr className="p-2 my-2">
      <td>
        <label htmlFor={id}>{props.criterion.name}</label>
      </td>
      <td>
        <input
          type="number"
          id={idForWeightInput}
          name="weight"
          min={0}
          placeholder="0"
          max={100}
          step={1}
          value={props.criterion.weight}
          onInput={onChange}
          // disabled={!editable}
        />
      </td>
      {props.type === "withValue" ? (
        <td>
          {/* TODO: Add tick names */}
          <input
            type="range"
            id={id}
            name="value"
            min="0"
            max={10}
            value={(props.criterion as T_CriterionWithValue).value}
            step={1}
            onChange={onChange}
            list="markers"
            // disabled={!editable}
          />
        </td>
      ) : null}
    </tr>
  );
}
