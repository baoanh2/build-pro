import { UserState } from "./defs";

export const initialUserState: UserState = {
  users: [],
  loading: false,
  search: "",
  role: "",
  page: 1,
  totalPages: 1,
};
