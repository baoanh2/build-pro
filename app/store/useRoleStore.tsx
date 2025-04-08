import axios from "axios";
import { create } from "zustand";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
interface RoleStore {
  roles: any;
  fetchRole: (token: string) => Promise<void>;
}
export const useRoleStore = create<RoleStore>((set, get) => ({
  roles: [],
  fetchRole: async (token) => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/roles?pageSize=20`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      set({ roles: data.data.results });
    } catch (error) {
      console.log("Error:", error);
    }
  },
}));
