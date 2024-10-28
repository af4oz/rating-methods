import { LocalStorageKey } from "@/constants";
import { T_Rating, T_RatingMethod } from "@/types";
import { create } from "zustand";

interface RootState {
  methods: T_RatingMethod[];
  ratings: T_Rating[];
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

const useRootStore = create<RootState>((set) => ({
  methods: [],
  ratings: [],
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
      };
    });
  },
  saveRating(data) {
    set((state) => {
      return {
        ratings: [...state.ratings, data],
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
        const { methods, ratings } = JSON.parse(dataString) as {
          methods: T_RatingMethod[];
          ratings: T_Rating[];
        };
        return { methods, ratings };
      } catch (error) {
        console.error("Error while restoring from Local storage");
        return state;
      }
    }),
  saveToLocalStorage: () =>
    set((state) => {
      const { methods, ratings } = state;
      localStorage.setItem(
        LocalStorageKey,
        JSON.stringify({ methods, ratings })
      );
      return state;
    }),
  // draftMethod: {
  //   name: "Untited",
  //   criteria: [
  //     {
  //       name: "Default",
  //       weight: 100,
  //     },
  //   ],
  // },
  // updateDraftMethodCriterion: (criterion) =>
  //   set((state) => {
  //     if (typeof state.draftMethod !== "undefined") {
  //       return {
  //         draftMethod: {
  //           ...state.draftMethod,
  //           criteria: state.draftMethod?.criteria.map((item) =>
  //             item.name === criterion.name ? { ...item, ...criterion } : item
  //           ),
  //         },
  //       };
  //     } else {
  //       return state;
  //     }
  //   }),
  // updateDraftName: (name) => {
  //   set((state) => {
  //     if (typeof state.draft !== "undefined") {
  //       return { draft: { ...state.draft, name } };
  //     } else {
  //       return state;
  //     }
  //   });
  // },
  // saveDraftMethod: (method) =>
  //   set((state) => {
  //     return { methods: [...state.methods, method] };
  //   }),
}));

export default useRootStore;
