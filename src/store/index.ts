// zustand
import { create } from "zustand";
import { shallow } from "zustand/shallow";
import { devtools, persist } from "zustand/middleware";

// slices
import { createGithubRepoSlice } from "./slices/githubRepo";

export type StoreState = ReturnType<typeof createGithubRepoSlice>;

const useStoreBase = create<StoreState>()(
  devtools(
    persist(
      (...a) => ({
        ...createGithubRepoSlice(...a),
      }),
      { name: "zustandStore" }
    )
  )
);

const useStore = <T>(selector: (state: StoreState) => T) => {
  return useStoreBase(selector, shallow);
};

export default useStore;
