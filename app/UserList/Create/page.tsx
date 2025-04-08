"use client";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/app/store/useAuthStore";
import { useRoleStore } from "@/app/store/useRoleStore";
import Layout from "@/app/components/Layout";
import CreateLayout from "@/app/components/CreateLayout";
import { Button, Container, SelectChangeEvent } from "@mui/material";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import Loading from "@/app/components/Loading";
interface dataType {
  id: string;
  label: string;
  type: string;
  options?: any[];
}
const CreateUser = () => {
  const { session, token } = useAuthStore();
  const { roles, fetchRole } = useRoleStore();
  const [loading, setLoading] = useState<boolean>(true);
  const data: dataType[] = [
    {
      id: "email",
      label: "Email",
      type: "text",
    },
    {
      id: "roles",
      label: "Roles",
      type: "select",
      options: roles,
    },
    {
      id: "firstName",
      label: "First Name",
      type: "text",
    },
    {
      id: "lastName",
      label: "Last Name",
      type: "text",
    },
  ];
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [userDetail, setUserDetail] = useState<any>({
    email: "",
    roles: "",
    firstName: "",
    lastName: "",
  });
  const handleChange = (
    e: React.ChangeEvent<unknown> | SelectChangeEvent<unknown>
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    setUserDetail((prev: any) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const handleCreate = async (e: React.MouseEvent<unknown>) => {
    e.preventDefault();
    console.log("Create");
    if (
      !userDetail.email.trim() ||
      !userDetail.roles.trim() ||
      !userDetail.firstName.trim() ||
      !userDetail.lastName.trim()
    ) {
      toast.error("Fill in all required");
      return;
    }
    try {
      const res = await axios.post(
        `${API_BASE_URL}/users`,
        {
          email: userDetail.email,
          role: userDetail.roles,
          firstName: userDetail.firstName,
          lastName: userDetail.lastName,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        toast.success("Create User successfull");
        console.log(res);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(
        "Error:",
        error.response?.data?.message
          ? error.response?.data?.message
          : "An error occurred during sign-up"
      );
    }
  };
  useEffect(() => {
    if (token) {
      fetchRole(token);
    }
  }, [token]);
  useEffect(() => {
    console.log(userDetail);
  }, [userDetail]);
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
        <CreateLayout
          createName="User"
          dataSource={data}
          formData={userDetail}
          handleChange={handleChange}
          handleCreate={handleCreate}
        />
      )}
    </Layout>
  );
};

export default CreateUser;
