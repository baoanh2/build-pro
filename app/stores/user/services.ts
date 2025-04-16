import axios from "axios";
import { GetUsersResponse } from "./defs";

export const getUsers = async (
  token: string,
  page: number,
  search: string,
  role: string
): Promise<GetUsersResponse> => {
  if (!token) throw new Error("Token is missing!");
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const res = await axios.get(
    `${API_BASE_URL}/users${page && `?pageNumber=${page}`}${
      role && `&filter=role%2Cstring%2Cequal%2C${role}`
    }${search && `&searchText=${search}`}`,
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
