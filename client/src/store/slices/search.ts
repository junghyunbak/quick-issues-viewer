// zustand
import { type StateCreator } from "zustand";

type SearchHistory = {
  id: number;
  type: "repo" | "user";
  name: string;
  url?: string;
  createAt: number;
};

type SearchSlice = {
  userSearching: boolean;
  repoSearching: boolean;
  setUserSearching: (userSearching: boolean) => void;
  setRepoSearching: (repoSearching: boolean) => void;

  searchHistory: SearchHistory[];
  setSearchHistory: (fn: (prev: SearchHistory[]) => SearchHistory[]) => void;
};

export const createSearchSlice: StateCreator<SearchSlice> = (
  set
): SearchSlice => ({
  userSearching: false,
  repoSearching: false,
  setRepoSearching(repoSearching) {
    set(() => ({ repoSearching }));
  },
  setUserSearching(userSearching) {
    set(() => ({ userSearching }));
  },

  searchHistory: [],
  setSearchHistory: (fn) => {
    set((state) => ({ searchHistory: fn(state.searchHistory) }));
  },
});
