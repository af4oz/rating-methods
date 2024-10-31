import { LocalStorageKey } from "@/constants";
import { T_Rating, T_RatingMethod } from "@/types";
import { idEqual } from "@/utils/common";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface RootState {
  methods: T_RatingMethod[];
  ratings: T_Rating[];
  // Below counters are used in id generation for `methods` & `ratings`
  // TODO: find a better solution
  /** Counter value increases by one for each successfull store.saveRating call */
  ratingCounter: number;
  /** Counter value increases by one for each successfull store.saveMethod call */
  methodCounter: number;
  editMethod: (
    id: T_RatingMethod["id"],
    data: Omit<T_RatingMethod, "id">
  ) => void;
  editRating: (id: T_Rating["id"], data: Omit<T_Rating, "id">) => void;
  saveMethod: (data: T_RatingMethod) => void;
  saveRating: (data: T_Rating) => void;
  reset: () => void;
}

const useRootStore = create<RootState>()(
  devtools(
    persist(
      (set) => ({
        methods: [],
        ratings: [],
        methodCounter: 0,
        ratingCounter: 0,
        editMethod: (id, data) =>
          set((state) => {
            return {
              methods: state.methods.map((item) =>
                idEqual(item.id, id) ? { ...item, ...data } : item
              ),
            };
          }),
        editRating: (id, data) =>
          set((state) => {
            return {
              ratings: state.ratings.map((item) =>
                idEqual(item.id, id) ? { ...item, ...data } : item
              ),
            };
          }),
        saveMethod: (data) => {
          set((state) => {
            return {
              methods: [...state.methods, data],
              // Increment the counter (used for id genration)
              methodCounter: state.methodCounter + 1,
            };
          });
        },
        saveRating(data) {
          set((state) => {
            return {
              ratings: [...state.ratings, data],
              // Increment the counter (used for id genration)
              ratingCounter: state.ratingCounter + 1,
            };
          });
        },
        reset: () =>
          set(() => {
            localStorage.removeItem(LocalStorageKey);
            return {
              methods: [],
              ratings: [],
              methodCounter: 0,
              ratingCounter: 0,
            };
          }),
      }),
      {
        name: LocalStorageKey,
        partialize: (state) => ({
          methods: state.methods,
          ratings: state.ratings,
          methodCounter: state.methodCounter,
          ratingCounter: state.ratingCounter,
        }),
      }
    )
  )
);

export default useRootStore;
