import { create } from "zustand";

interface IPostId {
  otherPost: number | null;
  setOtherPost: (value: number | null) => void;

  setIsCreate: (value: boolean) => void;
  isCreate: boolean;
}
export const usepostStore = create<IPostId>((set) => ({
  otherPost: null,
  isCreate: false,
  setOtherPost: (value) => set({ otherPost: value }),
  setIsCreate: (value) => set({ isCreate: value }),
}));
