import { T_Criterion } from "@/types";

export function uuidv4(): string {
  // @ts-ignore
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    // @ts-ignore
    (
      c ^
      // @ts-ignore
      (crypto.randomFillSync(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

export function generateTimeStampBasedId(): string {
  return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

export function hasValidWeights(criteria: T_Criterion[]): boolean {
  return (
    Math.round(
      criteria.reduce((acc, curr) => {
        return acc + curr.weight;
      }, 0) * 100
    ) /
      100 ===
    100.0
  );
}

export function idEqual(id1: string | number, id2: string | number) {
  return String(id1) === String(id2);
}
