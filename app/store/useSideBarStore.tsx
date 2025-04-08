import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface sidebar {
  activeTab: string;
  setActiveTab: (active: string) => void;
  sideBarDrop: Record<string, boolean>;
  setSideBarDrop: (name: string) => void;
}

export const useSideBarStore = create<sidebar>()(
  persist(
    (set, get) => ({
      activeTab: "home",
      setActiveTab: (active) => set({ activeTab: active }),
      sideBarDrop: {},
      setSideBarDrop: (name) =>
        set((state) => ({
          sideBarDrop: {
            ...state.sideBarDrop,
            [name]: !state.sideBarDrop[name],
          },
        })),
    }),
    {
      name: "sidebar-session",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
