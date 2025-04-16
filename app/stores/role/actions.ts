import { StateCreator } from "zustand";
import { RoleState, RoleActions } from "./defs";
import { getRoles } from "./services";
import { useAuthStore } from "@/app/store/useAuthStore";

export const createRoleActions: StateCreator<
  RoleState & RoleActions,
  [],
  [],
  RoleActions
> = (set, get) => ({
  setSearch: (search: string) => set({ search }),
  setPageNumber: (pageNumber: number) => set({ pageNumber }),
  setPageSize: (pageSize: number) => set({ pageSize }),
  setIsActive: (isActive: string) => set({ isActive }),
  fetchRoles: async () => {
    set({ loading: true });
    const { search, pageNumber, pageSize, isActive } = get();
    const token = useAuthStore.getState().token;
    try {
      const roles = await getRoles(
        token,
        search,
        pageNumber,
        pageSize,
        isActive
      );
      set({ roles: roles.results });
      set({ totalPages: roles.totalPages });
    } catch (err) {
      console.error("Fetch roles failed:", err);
    } finally {
      set({ loading: false });
    }
  },
});
