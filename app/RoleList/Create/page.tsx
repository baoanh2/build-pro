"use client";
import axios from "axios";
import React, { FormEventHandler, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useAuthStore } from "@/app/store/useAuthStore";
import Layout from "@/app/components/Layout";
import CreateLayout from "@/app/components/CreateLayout";
import { SelectChangeEvent } from "@mui/material";
import { redirect } from "next/navigation";

const CreateRole = () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { token, session } = useAuthStore();
  const [roleDetail, setRoleDetail] = useState<any>({
    name: "",
    description: "",
  });
  const handleChange = (
    e: React.ChangeEvent<unknown> | SelectChangeEvent<unknown>
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    setRoleDetail((prev: any) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };
  const handleCreate = async (e: React.MouseEvent<unknown>) => {
    e.preventDefault();
    if (!roleDetail.name.trim() || !roleDetail.description.trim()) {
      toast.error("Please fill in all required");
      return;
    }
    try {
      const res = await axios.post(
        `${API_BASE_URL}/roles`,
        {
          name: roleDetail.name,
          description: roleDetail.description,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      if (res.status === 200) {
        toast.success("Create Role Success");
      } else if (res.status === 400) {
        toast.error(`Error:${res.request.statusText}`);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  useEffect(() => {
    if (!session) {
      redirect("/SignIn");
    }
  }, [session]);
  return (
    <Layout>
      <CreateLayout
        createName="Role"
        dataSource={data}
        formData={roleDetail}
        handleChange={handleChange}
        handleCreate={handleCreate}
      />
    </Layout>
  );
};

export default CreateRole;
interface dataType {
  id: string;
  label: string;
  type: string;
  options?: any[];
}
const data: dataType[] = [
  {
    id: "name",
    label: "Name",
    type: "text",
  },
  {
    id: "description",
    label: "Description",
    type: "text",
  },
];
