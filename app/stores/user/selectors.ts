import { UserState } from "./defs";

export const selectUsers = (state: UserState) => state.users;
export const selectIsLoading = (state: UserState) => state.loading;
export const selectSearch = (state: UserState) => state.search;
export const selectFilterByRole = (state: UserState) => state.role;
export const selectPageNumber = (state: UserState) => state.page;
export const selectTotalPages = (state: UserState) => state.totalPages;
