import { getServerSession } from "next-auth";
import { getSession, signOut } from "next-auth/react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useSideBarStore } from "./useSideBarStore";

interface IAuth {
  session: any;
  token: any;
  setSession: () => Promise<void>;
  logOut: () => void;
}

export const useAuthStore = create<IAuth>()(
  persist(
    (set, get) => ({
      session: null,
      token: null,
      setSession: async () => {
        const session1 = await getSession();
        set({ session: session1, token: session1?.accessToken });
      },
      logOut: () => {
        signOut();
        // sessionStorage.removeItem("sidebar-session");
        set({ session: null, token: null });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
