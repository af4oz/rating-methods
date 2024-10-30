import { CriterionProps, T_CriterionWithValue } from "@/types";
import { ChangeEventHandler } from "react";

export default function CriterionTableRow<Type extends "withValue" | undefined>(
  props: CriterionProps<Type>
) {
  const { criterion } = props;
  const idForWeightInput = criterion.id + "-weight";
  const idForNameInput = criterion.id + "-name";

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const updatedCriterion = {
      ...criterion,
      [e.target.name]: e.target.value,
    };
    props.onChange(updatedCriterion);
  };

  const handleDelete = () => {
    props.onDelete(criterion);
  };
  return (
    <tr className="p-2 my-2">
      <td className="pr-4 py-2">
        <input
          id={idForNameInput}
          type="text"
          name="name"
          min={1}
          max={120}
          value={criterion.name}
          onInput={onChange}
        ></input>
        {/* <label htmlFor={id}>{props.criterion.name}</label> */}
      </td>
      <td className="pr-4 py-2">
        <input
          type="number"
          id={idForWeightInput}
          name="weight"
          min={0}
          placeholder="0"
          max={100}
          step={1}
          value={criterion.weight}
          onInput={onChange}
          // disabled={!editable}
        />
      </td>
      {props.type === "withValue" ? (
        <td className="pr-4 py-2">
          {/* TODO: Add tick names */}
          <input
            type="range"
            id={criterion.id + "-value"}
            name="value"
            min="0"
            max={10}
            value={(criterion as T_CriterionWithValue).value}
            step={1}
            onChange={onChange}
            list="markers"
            // disabled={!editable}
          />
        </td>
      ) : null}
      <td className="pr-4 py-2">
        <button onClick={handleDelete}>❌</button>
      </td>
    </tr>
  );
}
