// zustand
import { type StateCreator } from "zustand";

type IssueSlice = {
  labelId: number | null;
  setLabelId: (labelId: number | null) => void;
};

export const createIssueSlice: StateCreator<IssueSlice> = (
  set
): IssueSlice => ({
  labelId: null,
  setLabelId: (labelId: number | null) => {
    set(() => ({ labelId }));
  },
});
