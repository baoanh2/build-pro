"use client";
import Layout from "@/app/components/Layout";
import Loading from "@/app/components/Loading";
import TextFieldCustom from "@/app/components/TextFieldCustom";
import { useAuthStore } from "@/app/store/useAuthStore";
import { useRoleStore } from "@/app/store/useRoleStore";
import { KeyboardArrowUp } from "@mui/icons-material";
import { Box, Button, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { redirect, useParams } from "next/navigation";
import React, { useState, useEffect, use } from "react";
import { toast, ToastContainer } from "react-toastify";
const UserListById = () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { id } = useParams();
  const session = useAuthStore((state) => state.session);
  const token = session?.accessToken;
  const { roles, fetchRole } = useRoleStore();
  const [loading, setLoading] = useState<boolean>(true);
  const [updatedData, setUpdatedData] = useState({
    email: "",
    roles: "",
    firstName: "",
    lastName: "",
    isDeleted: false,
  });

  //   try {
  //     const { data } = await axios.get(`${API_BASE_URL}/roles`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     setRoles(data.data.results);
  //   } catch (error) {
  //     console.log("Error:", error);
  //   }
  // };
  const handleChange = (e: any) => {
    setUpdatedData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  // const getUserData = async () => {
  //   try {
  //     const { data } = await axios.get(`${API_BASE_URL}/users/${id}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     setUpdatedData({
  //       email: data.data.email,
  //       firstName: data.data.firstName,
  //       lastName: data.data.lastName,
  //       isDeleted: data.data.isDeleted,
  //       roles: data.data.roleId,
  //     });
  //   } catch (error) {
  //     console.log("Error:", error);
  //   }
  // };
  const handleUpdate = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${API_BASE_URL}/users/${id}`,
        {
          email: updatedData.email,
          firstName: updatedData.firstName,
          lastName: updatedData.lastName,
          role:
            typeof updatedData.roles === "number"
              ? roles.find((item: any) => item.roleId === updatedData.roles)
                  ?.role
              : updatedData.roles,
          isDeleted: updatedData.isDeleted,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        toast.success("Update user successful");
      } else {
        toast.error("Error in updating user");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!session) {
      redirect("/SignIn");
    }
  }, [session]);
  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/users/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setUpdatedData({
          email: data.data.email,
          firstName: data.data.firstName,
          lastName: data.data.lastName,
          isDeleted: data.data.isDeleted,
          roles: data.data.roleId,
        });
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchRole(token);
    getUserData();
  }, [token]);
  useEffect(() => {
    const loadingState = async () => {
      setTimeout(() => setLoading(false), 1000);
    };
    loadingState();
  }, [loading]);
  return (
    <Layout>
      {loading ? (
        <Loading />
      ) : (
        <>
          <form onSubmit={(e) => handleUpdate(e)} action="">
            <div className="w-full h-screen">
              <div className="border-2">
                <div className="flex flex-row justify-between bg-indigo-700 text-white p-5">
                  <p className="font-semibold text-xl">
                    User Details (Required)
                  </p>
                  <KeyboardArrowUp />
                </div>
                <div className="w-full p-5">
                  <div className="w-full flex flex-rows justify-start">
                    <div className="flex flex-col mr-3 w-1/3">
                      <TextFieldCustom
                        label="Email"
                        type="text"
                        id="email"
                        value={updatedData.email}
                        onChange={handleChange}
                        sx={{ width: 1, backgroundColor: "#F3F6F9" }}
                      />
                    </div>
                    <Box sx={{ gap: "10px", width: 1 / 3, mr: 5 }}>
                      <InputLabel sx={{ fontSize: 20 }} shrink>
                        Role
                      </InputLabel>
                      <Select
                        value={
                          roles.find(
                            (item: any) => item.roleId === updatedData.roles
                          )?.role || ""
                        }
                        name="roles"
                        id="roles"
                        displayEmpty
                        onChange={(e) => {
                          const selectedRole = roles.find(
                            (item: any) => item.role === e.target.value
                          );
                          if (selectedRole) {
                            handleChange({
                              target: {
                                name: "roles",
                                value: selectedRole.roleId,
                              },
                            });
                          }
                        }}
                        sx={{
                          border: "1px solid",
                          borderColor: "#E0E3E7",
                          borderRadius: 1,
                          backgroundColor: "#F3F6F9",
                          width: 1,
                          mr: 5,
                        }}
                      >
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
                    </Box>
                    <div className="flex flex-col mt-2 relative mr-3">
                      <div className="flex h-full justify-center items-center">
                        <input
                          readOnly
                          checked={!updatedData.isDeleted}
                          name="isDeleted"
                          id="purple-checkbox"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="purple-checkbox"
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Active
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex flex-rows justify-start mt-4">
                    <div className="flex flex-col mr-3 w-1/3">
                      <TextFieldCustom
                        label="First Name"
                        type="text"
                        id="firstName"
                        value={updatedData.firstName}
                        onChange={handleChange}
                        sx={{ width: 1, backgroundColor: "#F3F6F9" }}
                      />
                    </div>
                    <div className="flex flex-col mr-3 w-1/3">
                      <TextFieldCustom
                        label="Last Name"
                        type="text"
                        id="lastName"
                        value={updatedData.lastName}
                        onChange={handleChange}
                        sx={{ width: 1, backgroundColor: "#F3F6F9" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-rows gap-2  ">
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    mt: 3,
                    backgroundColor: "#4338CA",
                    width: "7rem",
                    fontWeight: "600",
                    ":hover": {
                      backgroundColor: "#3e34b6",
                    },
                  }}
                  type="submit"
                >
                  Update
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    mt: 3,
                    backgroundColor: "#4338CA",
                    width: "12rem",
                    fontWeight: "600",
                    ":hover": {
                      backgroundColor: "#3e34b6",
                    },
                  }}
                >
                  Change Password
                </Button>
              </div>
            </div>
            <ToastContainer />
          </form>
        </>
      )}
    </Layout>
  );
};

export default UserListById;
