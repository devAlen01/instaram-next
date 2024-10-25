import { create } from "zustand";

interface IPostId {
  otherPost: number | null;
  setOtherPost: (value: number | null) => void;
}
export const usepostStore = create<IPostId>((set) => ({
  otherPost: null,
  setOtherPost: (value) => set({ otherPost: value }),
}));
