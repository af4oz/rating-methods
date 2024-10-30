export interface T_RatingMethod {
  id: number;
  name: string;
  criteria: T_Criterion[];
}

export interface T_Rating {
  id: number;
  name: string;
  criteria: T_CriterionWithValue[];
  finalRating?: number;
  methodName?: string;
}

export interface T_CriterionWithValue extends T_Criterion {
  value: number;
}

export interface T_Criterion {
  id: string;
  name: string;
  weight: number;
}

export type ValueOf<T> = T[keyof T];

export interface CriterionProps<
  Type extends "withValue" | undefined = undefined
> {
  type?: Type;
  criterion: Type extends "withValue" ? T_CriterionWithValue : T_Criterion;
  onChange: (
    criterion: Type extends "withValue" ? T_CriterionWithValue : T_Criterion
  ) => void;
  onDelete: (criterion: Omit<T_Criterion, "weight">) => void;
}
