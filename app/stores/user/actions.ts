import { StateCreator } from "zustand";
import { UserState, UserActions } from "./defs";
import { getUsers } from "./services";
import { useAuthStore } from "@/app/store/useAuthStore";

export const createUserActions: StateCreator<
  UserState & UserActions,
  [],
  [],
  UserActions
> = (set, get) => ({
  setSearch: (search) => set({ search }),
  setRole: (role) => set({ role }),
  setPage: (page) => set({ page }),
  fetchUsers: async () => {
    const { search, role, page } = get();
    set({ loading: true });
    const token = useAuthStore.getState().token;
    try {
      const users = await getUsers(token, page, search, role);
      set({ users: users.results });
      set({ totalPages: users.totalPages });
    } catch (err) {
      console.error("Fetch users failed:", err);
    } finally {
      set({ loading: false });
    }
  },
});
