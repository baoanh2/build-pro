import Dropbox from "next-auth/providers/dropbox";
import { create } from "zustand";

interface dropdown {
  isDropDown: boolean;
  showActionUser: string;
  setIsDropDown: () => void;
  setShowActionUser: (action: string) => void;
}

export const useStore = create<dropdown>((set, get) => ({
  isDropDown: false,
  showActionUser: "",
  setShowActionUser: (action) => set({ showActionUser: action }),
  setIsDropDown: () =>
    set((state) => {
      if (state.isDropDown) {
        sessionStorage.removeItem("sidebar-session");
      }
      return { isDropDown: !state.isDropDown };
    }),
}));
