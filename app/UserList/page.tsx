"use client";
import Layout from "../components/Layout";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import axios from "axios";
import { useStore } from "../store/useStore";
import Link from "next/link";
import { useRoleStore } from "../store/useRoleStore";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Tooltip,
  IconButton,
  Switch,
  Button,
  TablePagination,
  Pagination,
  InputAdornment,
  Typography,
  SxProps,
  Theme,
  Skeleton,
  TableCell,
  TableRow,
} from "@mui/material";
import TableCustom from "../components/TableCustom";
import EditIcon from "@mui/icons-material/Edit";
import { AddCircle, Search } from "@mui/icons-material";
import RoleBadge from "../components/RoleBadge";
import Loading from "../components/Loading";

const page = () => {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { token, session } = useAuthStore();
  const { roles, fetchRole } = useRoleStore();
  const [role, setRole] = useState<any>("");
  const [search, setSearch] = useState<any>("");
  const [list, setList] = useState<any[] | undefined>();
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("");
  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/users?pageNumber=${page}${
          role && `&filter=role%2Cstring%2Cequal%2C${role}`
        }&searchText=${search}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const listOfData = data?.data.results;
      setList(listOfData);
      setTotalPages(data?.data.totalPages);
      console.log(listOfData);
      console.log(listOfData);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [search, role, page]);
  useEffect(() => {
    fetchRole(token);
    console.log(page);
  }, [page]);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string
  ) => {
    const capitalizedProperty = capitalizeFirstLetter(property);
    const isAsc = orderBy === capitalizedProperty && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(capitalizedProperty);
    // console.log(orderBy);
    // console.log(order);
    // console.log(property);
  };
  const sortedUsers = list?.sort((a, b) => {
    if (order === "asc") {
      return a[orderBy] > b[orderBy] ? 1 : -1;
    } else {
      return a[orderBy] < b[orderBy] ? 1 : -1;
    }
  });
  function lowercaseFirstLetter(val: string) {
    return val.charAt(0).toLowerCase() + String(val).slice(1);
  }
  function capitalizeFirstLetter(val: string) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }
  useEffect(() => {
    if (!session) {
      redirect("/SignIn");
    }
  }, [session]);
  return (
    <Layout>
      <>
        <div className="flex justify-between items-center">
          <div className="flex flex-row items-center">
            <TextField
              className="w-80"
              label="Search field"
              type="search"
              variant="outlined"
              onChange={(e) => setSearch(e.target.value)}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton aria-label="description for action">
                        <Search />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <InputLabel id="demo-simple-select-helper-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={role}
                label="Role"
                onChange={(e) => setRole(e.target.value)}
              >
                <MenuItem value="">
                  <em>Role</em>
                </MenuItem>
                {roles?.map((item: any, index: any) => {
                  return (
                    !item.isDeleted && (
                      <MenuItem key={index} value={item.role}>
                        {item.role}
                      </MenuItem>
                    )
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <Link href="/UserList/Create">
            <Button
              size="small"
              variant="contained"
              sx={{
                backgroundColor: "#4338CA",
                p: 2,
                fontWeight: "600",
                fontSize: 15,
                ":hover": {
                  backgroundColor: "#3e34b6",
                },
                textTransform: "none",
              }}
              startIcon={<AddCircle />}
            >
              Create User
            </Button>
          </Link>
        </div>
        <TableCustom
          totalPageNumber={totalPages}
          headCell={HeadCell}
          dataSource={list}
          handlePageChange={handleChange}
          page={page}
          onSort={handleRequestSort}
          order={order as "asc" | "desc"}
          orderBy={lowercaseFirstLetter(orderBy)}
        />
      </>
    </Layout>
  );
};
export default page;
interface HeadCell {
  id: string;
  label: string;
  render?: (row: any) => React.ReactNode;
  sortable: boolean;
  sx?: SxProps<Theme>;
}
const pagination = {
  pageNumber: 1,
  pageSize: 10,
  totalPages: 11,
  totalNumberOfRecords: 109,
  hasPreviousPage: false,
  hasNextPage: true,
};
const UserList = [
  {
    id: "1",
    firstName: "Bao",
    lastName: "Anh",
    email: "ngobaoanh1324@gmail.com",
    role: "Client",
    isDeleted: false,
  },
  {
    id: "2",
    firstName: "Hoang",
    lastName: "Anh",
    email: "ngohoang1324@gmail.com",
    role: "Client",
    isDeleted: true,
  },
  {
    id: "3",
    firstName: "Huy",
    lastName: "Anh",
    email: "ngohuyanh324@gmail.com",
    role: "Admin",
    isDeleted: false,
  },
  {
    id: "3",
    firstName: "Huy",
    lastName: "Anh",
    email: "ngohuyanh324@gmail.com",
    role: "Developer",
    isDeleted: false,
  },
  {
    id: "3",
    firstName: "Huy",
    lastName: "Anh",
    email: "ngohuyanh324@gmail.com",
    role: "Manager",
    isDeleted: false,
  },
  {
    id: "3",
    firstName: "Huy",
    lastName: "Anh",
    email: "ngohuyanh324@gmail.com",
    role: "Super User",
    isDeleted: false,
  },
  {
    id: "3",
    firstName: "Huy",
    lastName: "Anh",
    email: "ngohuyanh324@gmail.com",
    role: "Testing 2",
    isDeleted: false,
  },
  {
    id: "3",
    firstName: "Huy",
    lastName: "Anh",
    email: "ngohuyanh324@gmail.com",
    role: "Admin",
    isDeleted: false,
  },
  {
    id: "3",
    firstName: "Huy",
    lastName: "Anh",
    email: "ngohuyanh324@gmail.com",
    role: "User",
    isDeleted: false,
  },
  {
    id: "3",
    firstName: "Huy",
    lastName: "Anh",
    email: "ngohuyanh324@gmail.com",
    role: "Auditor",
    isDeleted: false,
  },
];
const HeadCell: HeadCell[] = [
  {
    id: "firstName",
    label: "First Name",
    sortable: true,
  },
  {
    id: "lastName",
    label: "Last Name",
    sortable: true,
  },
  {
    id: "email",
    label: "Email",
    sortable: true,
    sx: { color: "blue", textDecoration: "underline" },
  },
  {
    id: "role",
    label: "Role",
    sortable: true,
    render: (row: any) => <RoleBadge role={row.role} />,
  },
  {
    id: "isDeleted",
    label: "Active",
    sortable: false,
    render: (row: any) => (
      <Box>
        <Switch readOnly checked={!row.isDeleted} color="secondary" />
      </Box>
    ),
  },
  {
    id: "action",
    label: "Action",
    sortable: false,
    render: (row: any) => (
      <Box>
        <Tooltip title="Edit">
          <Link href={`/UserList/${row.userId}`}>
            <IconButton aria-label="edit" size="small">
              <EditIcon fontSize="small" />
            </IconButton>
          </Link>
        </Tooltip>
      </Box>
    ),
  },
];
