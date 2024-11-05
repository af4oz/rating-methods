import CriterionTableRow from "@/components/CriterionTableRow";
import { MethodNameSettings } from "@/constants";
import useRootStore from "@/store";
import { CreateMethodProps, CriterionProps, T_RatingMethod } from "@/types";
import { formatCriteria, hasValidWeights } from "@/utils/common";
import { useRouter } from "next/router";
import { ChangeEventHandler, useId, useRef, useState } from "react";
import RM_Dialog from "./RM_Dialog";

let criterioncount = 0;
/**
 *
 * /method/new
 * <CreateMethod>
 *
 * /method/new?forkMethod=methodId
 * <CreateMethod forkMethod={methodId} />
 *
 * /method/edit/[id]
 * <CreateMethod editMethod={methodId}/>
 */
export default function CreateMethod({
  forkMethod,
  editMethod,
}: CreateMethodProps) {
  const id = useId();
  const [error, setError] = useState("");
  const store = useRootStore();
  const router = useRouter();
  const [methodName, setMethodName] = useState("");
  const [open, setOpen] = useState(false);

  const initRating = (): T_RatingMethod => {
    if (editMethod) {
      // Initial state of a method when edit button pressed on /method/[id] pages
      return editMethod;
    } else if (forkMethod) {
      // Initial state of a method when fork button pressed on /method/[id] pages
      return {
        ...forkMethod,
        id: store.methodCounter,
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

  const methodNameInput = useRef<HTMLInputElement | null>(null);
  const handleNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    methodNameInput.current?.reportValidity();
    setMethodName(e.target.value);
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
  const handleEdit = () => {
    // Reset Error state
    setError("");

    const formattedCriteria = formatCriteria(method.criteria);

    // Verification
    // 1. All weights summed should be equal to 100
    if (!hasValidWeights(formattedCriteria)) {
      setError("All weights summed should be equal to 100");
      return;
    }

    // Save/edit method to store
    const data = { ...method, criteria: formattedCriteria };
    store.editMethod(editMethod!.id, data);

    // Route back to home
    router.push("/");
  };

  const handleSave = () => {
    // Reset Error state
    setError("");

    // TODO: remove the need for formatCriteria
    const formattedCriteria = formatCriteria(method.criteria);

    // Verification
    // 1. All weights summed should be equal to 100
    if (!hasValidWeights(formattedCriteria)) {
      setError("All weights summed should be equal to 100");
      return;
    }
    // Show Rating Name input dialog
    setOpen(true);
  };
  const handleSaveMethodAs = () => {
    const valid = methodNameInput.current?.reportValidity();
    if (!valid) {
      return;
    }

    // TODO: remove the need for formatCriteria
    const formattedCriteria = formatCriteria(method.criteria);
    const data = {
      ...method,
      name: methodName,
      criteria: formattedCriteria,
    } as T_RatingMethod;

    // Save newly created rating with name
    store.saveMethod(data);

    // Close the dialog
    setOpen(false);

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
      <h1 className="h1">Create a new rating method</h1>
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
        {editMethod ? (
          <button onClick={handleEdit} className="btn-primary mr-4">
            Save edit
          </button>
        ) : (
          <button onClick={handleSave} className="btn-primary mr-4">
            Save
          </button>
        )}
        <button onClick={handleSaveAndApply} className="btn-primary">
          Save & Apply
        </button>
      </div>
      <RM_Dialog
        open={open}
        title="Save Method as"
        onOpenChange={setOpen}
        description="It gets easy for you later to manage the methods that you've created."
      >
        <div>
          <input
            ref={methodNameInput}
            id="method-name"
            type="text"
            name="method-name"
            required
            minLength={MethodNameSettings.min}
            maxLength={MethodNameSettings.max}
            value={methodName}
            onInput={handleNameChange}
            placeholder="Enter a name"
            autoComplete="off"
          />

          <div className="flex mt-4 justify-end">
            <button className="btn-primary" onClick={handleSaveMethodAs}>
              Save
            </button>
          </div>
        </div>
      </RM_Dialog>
    </div>
  );
}
