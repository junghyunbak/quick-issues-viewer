// zustand
import { type StateCreator } from "zustand";

type LabelSlice = {
  searchLabel: string;
  setSearchLabel: (searchLabel: string) => void;
};

export const createLabelSlice: StateCreator<LabelSlice> = (
  set
): LabelSlice => ({
  searchLabel: "",
  setSearchLabel(searchLabel) {
    set(() => ({ searchLabel }));
  },
});
