// zustand
import { type StateCreator } from "zustand";

type GithubRepoSlice = {
  owner: string;
  repo: string;
  setOwner: (owner: string) => void;
  setRepo: (repo: string) => void;
};

export const createGithubRepoSlice: StateCreator<GithubRepoSlice> = (
  set
): GithubRepoSlice => ({
  owner: "junghyunbak",
  repo: "github-issues-viewer",
  setOwner: (owner: string) => {
    set(() => ({ owner }));
  },
  setRepo: (repo: string) => {
    set(() => ({ repo }));
  },
});
