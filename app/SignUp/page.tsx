"use client";
import Link from "next/link";
import React, { ReactEventHandler, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import "material-icons/iconfont/material-icons.css";
import axios from "axios";
import { redirect } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import {
  Button,
  FormControl,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import TextFieldCustom from "../components/TextFieldCustom";
import {
  AccountCircle,
  MailOutline,
  Person2Outlined,
  PersonOutlined,
  Lock,
  Visibility,
  VisibilityOff,
  Phone,
} from "@mui/icons-material";
const SignUp = () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    mobilePhone: "",
    role: "Client",
  });
  const [visibility, setVisibility] = useState(false);
  const handleChange = (e: any) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !user.email.trim() ||
      !user.username.trim() ||
      !user.password.trim() ||
      !user.firstName.trim() ||
      !user.lastName.trim() ||
      !user.mobilePhone.trim()
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/auth/sign-up`, {
        email: user.email,
        username: user.username,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        mobilePhone: user.mobilePhone,
        role: user.role,
      });

      if (res.status === 200) {
        toast.success("Sign Up Success");
        // redirect('/Signin'); // Uncomment if needed
      } else {
        toast.error("Sign Up Error");
      }
    } catch (error: any) {
      console.error("Sign Up Error:", error);
      toast.error(
        error.response?.data?.message || "An error occurred during sign-up"
      );
    }
  };
  const signUpData = [
    {
      id: "email",
      label: "Email",
      type: "text",
      iconStart: <MailOutline />,
    },
    {
      id: "username",
      label: "UserName",
      type: "text",
      iconStart: <AccountCircle />,
    },
    {
      id: "firstName",
      label: "First Name",
      type: "text",
      iconStart: <PersonOutlined />,
    },
    {
      id: "lastName",
      label: "Last Name",
      type: "text",
      iconStart: <PersonOutlined />,
    },
    {
      id: "mobilePhone",
      label: "Phone Number",
      type: "number",
      iconStart: <Phone />,
    },
    {
      id: "password",
      label: "Password",
      type: visibility ? "text" : "password",
      iconStart: <Lock />,
      iconEnd: visibility ? (
        <IconButton onClick={() => setVisibility(!visibility)}>
          <Visibility />
        </IconButton>
      ) : (
        <IconButton onClick={() => setVisibility(!visibility)}>
          <VisibilityOff />
        </IconButton>
      ),
    },
  ];
  return (
    <>
      <NavBar />
      <div className="w-full h-screen flex flex-col justify-around items-center">
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            width: 2 / 3,
            backgroundColor: "#DEE1E6",
            padding: 6,
            border: "1px solid",
          }}
          elevation={5}
        >
          <Typography
            sx={{
              fontSize: "2em",
              fontWeight: 600,
              textAlign: "center",
              mb: 4,
            }}
          >
            Sign Up
          </Typography>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ mb: 4 }}
          >
            {signUpData.map((item, index) => {
              return (
                <Grid size={6} key={index} rowSpacing={5}>
                  <TextFieldCustom
                    id={item.id}
                    label={item.label}
                    onChange={handleChange}
                    type={item.type}
                    iconStart={item.iconStart}
                    iconEnd={item?.iconEnd}
                    sx={{ backgroundColor: "white", width: 1 }}
                  />
                </Grid>
              );
            })}
          </Grid>
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              width: 1,
              px: 6,
              py: 1,
              fontSize: 15,
              backgroundColor: "#3949AB",
              "&:hover": { backgroundColor: "#283593", fontWeight: 600 },
            }}
            onClick={(e) => handleSignUp(e)}
            className="items-center w-1/2 mt-6 focus:outline-none text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-md text-sm px-5 py-2.5 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-900 text-lg"
          >
            Sign Up
          </Button>
          <div className="text-center mt-5 col-span-3">
            <p>
              Already have an account ? Click{" "}
              <Link href="/SignIn" className="text-blue-600 hover:underline">
                this
              </Link>{" "}
              to Sign In.
            </p>
          </div>
          <ToastContainer />
        </Paper>
      </div>
    </>
  );
};

export default SignUp;
