// zustand
import { type StateCreator } from "zustand";

type SearchingSlice = {
  userSearching: boolean;
  repoSearching: boolean;
  setUserSearching: (userSearching: boolean) => void;
  setRepoSearching: (repoSearching: boolean) => void;
};

export const createSearchingSlice: StateCreator<SearchingSlice> = (
  set
): SearchingSlice => ({
  userSearching: false,
  repoSearching: false,
  setRepoSearching(repoSearching) {
    set((state) => ({ ...state, repoSearching }));
  },
  setUserSearching(userSearching) {
    set((state) => ({ ...state, userSearching }));
  },
});
