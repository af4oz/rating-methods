export interface RatingMethod {
  id: string;
  name: string;
  criteria: Criterion[];
}

export interface Criterion {
  name: string;
  weight: number;
  value: number;
}
