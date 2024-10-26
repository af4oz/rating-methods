import { Criterion, RatingMethod } from "@/types";
import { create } from "zustand";

interface RootState {
  methods: RatingMethod[];
  updateMethod: (id: string, data: Omit<Criterion, "id">) => void;
  reset: () => void;
  setMethods: (methods: RatingMethod[]) => void;
}

const useRootStore = create<RootState>((set) => ({
  methods: [],
  updateMethod: (id, data) =>
    set((state) => {
      return {
        methods: state.methods.map((item) =>
          item.id == id ? { ...item, ...data } : item
        ),
      };
    }),
  reset: () =>
    set(() => {
      return { methods: [] };
    }),
  setMethods: (methods: RatingMethod[]) =>
    set(() => {
      return { methods };
    }),
}));

export default useRootStore;
