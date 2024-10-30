import { LocalStorageKey } from "@/constants";
import { T_Rating, T_RatingMethod } from "@/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface RootState {
  methods: T_RatingMethod[];
  ratings: T_Rating[];
  // Below counters are used in id generation for `methods` & `ratings`
  // TODO: find a better solution
  ratingCounter: number;
  methodCounter: number;
  editMethod: (name: string, data: T_RatingMethod) => void;
  editRating: (name: string, data: T_Rating) => void;
  saveMethod: (data: T_RatingMethod) => void;
  saveRating: (data: T_Rating) => void;
  reset: () => void;
  restoreFromLocalStorage: () => void;
  saveToLocalStorage: () => void;
  // updateDraftMethodCriterion: (criterion: T_Criterion) => void;
  // updateDraftName: (name: string) => void;
  // saveDraftMethod: (method: T_RatingMethod) => void;
}

const useRootStore = create<RootState>()(
  devtools((set) => ({
    methods: [],
    ratings: [],
    methodCounter: 0,
    ratingCounter: 0,
    editMethod: (name, data) =>
      set((state) => {
        return {
          methods: state.methods.map((item) =>
            item.name == name ? { ...item, ...data } : item
          ),
        };
      }),
    editRating: (name, data) =>
      set((state) => {
        return {
          ratings: state.ratings.map((item) =>
            item.name == name ? { ...item, ...data } : item
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
        return { methods: [], ratings: [] };
      }),
    restoreFromLocalStorage: () =>
      set((state) => {
        try {
          // TODO: Restore from local storage
          const dataString = localStorage.getItem(LocalStorageKey);
          if (!dataString) {
            return state;
          }
          const { methods, ratings, ratingCounter, methodCounter } = JSON.parse(
            dataString
          ) as Partial<RootState>;
          return { methods, ratings, ratingCounter, methodCounter };
        } catch (error) {
          console.error("Error while restoring from Local storage");
          return state;
        }
      }),
    saveToLocalStorage: () =>
      set((state) => {
        try {
          const {
            methods = [],
            ratings = [],
            methodCounter = 0,
            ratingCounter = 0,
          } = JSON.parse(
            localStorage.getItem(LocalStorageKey) as string
          ) as Partial<RootState>;

          // Merge
          state.methods.forEach((target, index) => {
            const idx = methods.findIndex((item) => item.id === target.id);
            if (idx >= 0) {
              methods[idx] = target;
            } else {
              methods.push(target);
            }
          });
          state.ratings.forEach((target, index) => {
            const idx = ratings.findIndex((item) => item.id === target.id);
            if (idx >= 0) {
              ratings[idx] = target;
            } else {
              ratings.push(target);
            }
          });

          localStorage.setItem(
            LocalStorageKey,
            JSON.stringify({
              methods,
              ratings,
              ratingCounter: Math.max(state.ratingCounter, ratingCounter),
              methodCounter: Math.max(state.methodCounter, methodCounter),
            })
          );
          return state;
        } catch (error) {
          return state;
        }
      }),
  }))
);

export default useRootStore;
