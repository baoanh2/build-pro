"use client";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";
import { useStore } from "../store/useStore";
import TableCustom from "../components/TableCustom";
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
  InputAdornment,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddCircle from "@mui/icons-material/AddCircle";
import { Search } from "@mui/icons-material";
import { redirect } from "next/navigation";

const page = () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { token, session } = useAuthStore();
  const setShowAction = useStore((state) => state.setShowActionUser);
  const [list, setList] = useState<any>();
  const [search, setSearch] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<any>(1);
  const [pageSize, setPageSize] = useState<number | undefined>();
  const [totalPages, setTotalPages] = useState<number | undefined>();
  const [active, setActive] = useState<any>(false);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string
  ) => {
    const capitalizedProperty = capitalizeFirstLetter(property);
    const isAsc = orderBy === capitalizedProperty && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(capitalizedProperty);
    console.log(orderBy);
  };
  function lowercaseFirstLetter(val: string) {
    return val.charAt(0).toLowerCase() + String(val).slice(1);
  }
  function capitalizeFirstLetter(val: string) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }
  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/roles?pageNumber=${pageNumber}&pageSize=${pageSize}&searchText=${search}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const listOfData = data?.data.results;
      console.log(data?.data);
      setTotalPages(data?.data.totalPages);
      setList(listOfData);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    if (!session) {
      redirect("/SignIn");
    }
  }, [session]);
  useEffect(() => {
    fetchData();
  }, [search, active, pageNumber]);
  return (
    <Layout>
      <>
        <div className="flex justify-between items-center">
          <div className="flex flex-row justify-center items-center">
            <TextField
              className="w-80"
              id="filled-search"
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
              <InputLabel id="demo-simple-select-helper-label">
                Filter
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Filter"
                value={active}
                onChange={(e) => setActive(e.target.value)}
              >
                <MenuItem value="">
                  <em>Filter</em>
                </MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Link href="/RoleList/Create">
            <Button
              size="small"
              variant="contained"
              sx={{
                backgroundColor: "#4338CA",
                p: 2,
                fontWeight: "600",
                ":hover": {
                  backgroundColor: "#3e34b6",
                },
                fontSize: 14,
                textTransform: "none",
              }}
              startIcon={<AddCircle />}
              onClick={() => setShowAction("CreateRole")}
            >
              Create Role
            </Button>
          </Link>
        </div>
        <TableCustom
          dataSource={list}
          headCell={HeadCell}
          onSort={handleRequestSort}
          order={order as "asc" | "desc"}
          orderBy={lowercaseFirstLetter(orderBy as string)}
          totalPageNumber={totalPages}
          handlePageChange={handleChange}
          page={pageNumber}
        />
      </>
    </Layout>
  );
};

export default page;

const RoleList = [
  {
    roleId: "1",
    role: "Admin",
    description: "This is admin role",
    isDeleted: false,
  },
  {
    roleId: "2",
    role: "Client",
    description: "This is Client role",
    isDeleted: true,
  },
  {
    roleId: "3",
    role: "Developer",
    description: "This is developer role",
    isDeleted: false,
  },
  {
    roleId: "3",
    role: "Developer",
    description: "This is developer role",
    isDeleted: false,
  },
  {
    roleId: "3",
    role: "Developer",
    description: "This is developer role",
    isDeleted: false,
  },
  {
    roleId: "3",
    role: "Developer",
    description: "This is developer role",
    isDeleted: false,
  },
  {
    roleId: "3",
    role: "Developer",
    description: "This is developer role",
    isDeleted: false,
  },
  {
    roleId: "3",
    role: "Developer",
    description: "This is developer role",
    isDeleted: false,
  },
  {
    roleId: "3",
    role: "Developer",
    description: "This is developer role",
    isDeleted: false,
  },
  {
    roleId: "3",
    role: "Developer",
    description: "This is developer role",
    isDeleted: false,
  },
];
interface HeadCell {
  id: string;
  label: string;
  render?: (row: any) => React.ReactNode;
  sortable: boolean;
}
const HeadCell: HeadCell[] = [
  {
    id: "roleId",
    label: "Role Id",
    sortable: true,
  },
  {
    id: "role",
    label: "Role",
    sortable: true,
  },
  {
    id: "description",
    sortable: true,
    label: "Description",
  },
  {
    id: "isDeleted",
    sortable: false,
    label: "Active",
    render: (row: any) => (
      <Box>
        <Switch readOnly checked={!row.isDeleted} color="secondary" />
      </Box>
    ),
  },
  {
    id: "action",
    sortable: false,
    label: "Action",
    render: (row: any) => (
      <Box>
        <Tooltip title="Edit">
          <Link href={`/RoleList/${row.roleId}`}>
            <IconButton aria-label="edit" size="small">
              <EditIcon fontSize="small" />
            </IconButton>
          </Link>
        </Tooltip>
      </Box>
    ),
  },
];
