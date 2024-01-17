// zustand
import { create } from "zustand";
import { shallow } from "zustand/shallow";
import { devtools, persist } from "zustand/middleware";

// slices
import { createSearchSlice } from "./slices/search";

export type StoreState = ReturnType<typeof createSearchSlice>;

const useStoreBase = create<StoreState>()(
  devtools(
    persist(
      (...a) => ({
        ...createSearchSlice(...a),
      }),
      { name: "zustandStore" }
    )
  )
);

const useStore = <T>(selector: (state: StoreState) => T) => {
  return useStoreBase(selector, shallow);
};

export default useStore;
