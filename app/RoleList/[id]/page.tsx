"use client";
import Layout from "@/app/components/Layout";
import Loading from "@/app/components/Loading";
import TextFieldCustom from "@/app/components/TextFieldCustom";
import { useAuthStore } from "@/app/store/useAuthStore";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Box, Button, Grid2 } from "@mui/material";
import axios from "axios";
import { redirect, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const RoleListById = () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { id } = useParams();
  const { token, session } = useAuthStore();
  const [list, setList] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [updatedData, setUpdatedData] = useState({
    name: "",
    description: "",
    isDeleted: false,
  });
  // const getRolebyId = async () => {
  //   try {
  //     const { data } = await axios.get(`${API_BASE_URL}/roles/${id}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     setList(data.data);
  //     setUpdatedData({
  //       name: data.data.name,
  //       description: data.data.description,
  //       isDeleted: data.data.isDeleted,
  //     });
  //   } catch (error) {
  //     console.log("Error:", error);
  //   }
  // };
  const handleChange = (e: any) => {
    setUpdatedData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleUpdate = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${API_BASE_URL}/roles`,
        {
          roleId: id,
          name: updatedData.name,
          description: updatedData.description,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        toast.success("Update role success");
      } else {
        toast.error("Error in update role");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  useEffect(() => {
    const getRolebyId = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/roles/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setList(data.data);
        setUpdatedData({
          name: data.data.name,
          description: data.data.description,
          isDeleted: data.data.isDeleted,
        });
      } catch (error) {
        console.log("Error:", error);
      }
    };
    getRolebyId();
  }, [id]);
  useEffect(() => {
    if (!session) {
      redirect("/SignIn");
    }
  }, [session]);
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
              <div className="border-2 ">
                <div className="flex flex-row justify-between bg-indigo-700 text-white p-5">
                  <p className="font-semibold text-xl">
                    Role Details (Required)
                  </p>
                  <KeyboardArrowUp />
                </div>
                <div className="w-full p-5">
                  <div className="w-full flex flex-col justify-start">
                    <div className="flex flex-row">
                      <Grid2 container spacing={2}>
                        <Grid2 size={8}>
                          <TextFieldCustom
                            label="Name"
                            type="text"
                            id="name"
                            value={updatedData.name}
                            onChange={handleChange}
                            sx={{ width: 1, backgroundColor: "#F3F6F9" }}
                          />
                        </Grid2>
                        <Grid2
                          size="auto"
                          sx={{ display: "flex", alignItems: "center" }}
                        >
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
                        </Grid2>
                        <Grid2 size={8}>
                          <TextFieldCustom
                            label="Description"
                            type="text"
                            id="description"
                            multiline={true}
                            value={updatedData.description}
                            onChange={handleChange}
                            sx={{ width: 1, backgroundColor: "#F3F6F9" }}
                          />
                        </Grid2>
                      </Grid2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-rows gap-2">
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

export default RoleListById;
