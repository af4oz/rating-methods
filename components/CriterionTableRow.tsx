import {
  CriterionNameSettings,
  CriterionRatingSettings,
  CriterionWeightSettings,
} from "@/constants";
import { CriterionProps, T_CriterionWithValue } from "@/types";
import { ChangeEventHandler, useRef } from "react";

export default function CriterionTableRow<Type extends "withValue" | undefined>(
  props: CriterionProps<Type>
) {
  const { criterion } = props;
  const idForWeightInput = criterion.id + "-weight";
  const idForNameInput = criterion.id + "-name";
  const nameInput = useRef<HTMLInputElement | null>(null);
  const weighInput = useRef<HTMLInputElement | null>(null);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    nameInput.current?.reportValidity();
    weighInput.current?.reportValidity();

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
          ref={nameInput}
          id={idForNameInput}
          type="text"
          name="name"
          min={CriterionNameSettings.min}
          max={CriterionNameSettings.max}
          value={criterion.name}
          onInput={onChange}
          required
          data-testid="criterion-name"
        ></input>
        {/* <label htmlFor={id}>{props.criterion.name}</label> */}
      </td>
      <td className="pr-4 py-2">
        <input
          ref={weighInput}
          type="number"
          id={idForWeightInput}
          name="weight"
          min={CriterionWeightSettings.min}
          placeholder="0"
          max={CriterionWeightSettings.max}
          step={CriterionWeightSettings.step}
          value={criterion.weight}
          onInput={onChange}
          required
          data-testid="criterion-weight"
        />
      </td>
      {props.type === "withValue" ? (
        <td className="pr-4 py-2">
          {/* TODO: Add tick names */}
          <input
            type="range"
            id={criterion.id + "-value"}
            name="value"
            min={CriterionRatingSettings.min}
            max={CriterionRatingSettings.max}
            value={(criterion as T_CriterionWithValue).value}
            step={CriterionRatingSettings.step}
            onChange={onChange}
            list="markers"
            required
            data-testid="criterion-rating"
          />
        </td>
      ) : null}
      <td className="pr-4 py-2">
        <button onClick={handleDelete}>❌</button>
      </td>
    </tr>
  );
}
