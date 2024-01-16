// zustand
import { create } from "zustand";
import { shallow } from "zustand/shallow";
import { devtools, persist } from "zustand/middleware";

// slices
import { createSearchingSlice } from "./slices/label";

export type StoreState = ReturnType<typeof createSearchingSlice>;

const useStoreBase = create<StoreState>()(
  devtools(
    persist(
      (...a) => ({
        ...createSearchingSlice(...a),
      }),
      { name: "zustandStore" }
    )
  )
);

const useStore = <T>(selector: (state: StoreState) => T) => {
  return useStoreBase(selector, shallow);
};

export default useStore;
