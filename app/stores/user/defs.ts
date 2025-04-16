export interface User {
  userId: number;
  roleId: string;
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  isDeleted: boolean;
  mobilePhone: string;
  profilePictureUrl: string;
}

export interface UserState {
  users: User[];
  loading: boolean;
  search: string;
  page: number;
  role: string;
  totalPages: number;
}
export interface GetUsersResponse {
  results: User[];
  totalPages: number;
}
export interface UserActions {
  fetchUsers: () => Promise<void>;
  setSearch: (searchText: string) => void;
  setRole: (roleText: string) => void;
  setPage: (page: number) => void;
}
