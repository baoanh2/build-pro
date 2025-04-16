export interface Role {
  roleId: string;
  role: string;
}

export interface RoleState {
  roles: Role[];
  loading: boolean;
  totalPages: number;
  search: string;
  pageNumber: number;
  pageSize: number;
  isActive: string;
}
export interface GetRolesResponse {
  results: Role[];
  totalPages: number;
}
export interface RoleActions {
  fetchRoles: () => Promise<void>;
  setSearch: (search: string) => void;
  setPageNumber: (pageNumber: number) => void;
  setPageSize: (pageSize: number) => void;
  setIsActive: (isActive: string) => void;
}
