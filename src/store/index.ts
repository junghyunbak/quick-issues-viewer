// zustand
import { create } from "zustand";
import { shallow } from "zustand/shallow";
import { devtools, persist } from "zustand/middleware";

// slices
import { createLabelSlice } from "./slices/label";

export type StoreState = ReturnType<typeof createLabelSlice>;

const useStoreBase = create<StoreState>()(
  devtools(
    persist(
      (...a) => ({
        ...createLabelSlice(...a),
      }),
      { name: "zustandStore" }
    )
  )
);

const useStore = <T>(selector: (state: StoreState) => T) => {
  return useStoreBase(selector, shallow);
};

export default useStore;
