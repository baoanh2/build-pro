import axios from "axios";
import { GetRolesResponse } from "./defs";

export const getRoles = async (
  token: string,
  search: string,
  pageNumber: number,
  pageSize?: number,
  isActive?: string
): Promise<GetRolesResponse> => {
  if (!token) throw new Error("Token is missing!");
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const res = await axios.get(
    `${API_BASE_URL}/roles?pageNumber=${pageNumber}&pageSize=${pageSize}&searchText=${search}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(res);
  return res.data.data;
};
