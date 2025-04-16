import { RoleState } from "./defs";

export const selectRoles = (state: RoleState) => state.roles;
export const selectIsLoading = (state: RoleState) => state.loading;
export const selectSearch = (state: RoleState) => state.search;
export const selectPageNumber = (state: RoleState) => state.pageNumber;
export const selectPageSize = (state: RoleState) => state.pageSize;
export const selectIsActive = (state: RoleState) => state.isActive;
export const selectTotalPages = (state: RoleState) => state.totalPages;
