import { RoleState } from "./defs";

export const initialRoleState: RoleState = {
  roles: [],
  loading: false,
  totalPages: 1,
  search: "",
  pageNumber: 1,
  pageSize: 10,
  isActive: "",
};
