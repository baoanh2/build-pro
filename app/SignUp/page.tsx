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
    // console.log(user);
  };
  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure all required fields are filled
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

      console.log(res);

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
  useEffect(() => {
    console.log(user);
  }, [user]);
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
      {/* <div className="w-full h-screen flex flex-col justify-around items-center">
        <div className="border border-black rounded-md p-5 bg-[#DEE1E6] w-1/2">
          <p className="text-3xl font-semibold my-2 text-center">Sign Up</p>
          <form
            onSubmit={(e) => handleSignUp(e)}
            className="max-w-md mx-auto grid grid-cols-3 grid-rows-2 gap-4 mt-10"
          >
            <label
              htmlFor="email-address-icon"
              className="block mt-3 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <div className="relative col-span-2">
              <div className="absolute inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none">
                <span className="material-icons-outlined text-sm">mail</span>
              </div>
              <input
                onChange={(e) => handleChange(e)}
                name="email"
                type="text"
                id="email-address-icon"
                className=" bg-gray-50 border border-gray-900 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <label
              htmlFor="userName"
              className="block mt-3 text-sm font-medium text-gray-900 dark:text-white"
            >
              UserName
            </label>
            <div className="relative col-span-2">
              <div className="absolute inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none">
                <span className="material-icons-outlined text-sm">person</span>
              </div>
              <input
                onChange={(e) => handleChange(e)}
                name="username"
                type="text"
                id="userName"
                className="bg-gray-50 border border-gray-900 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your username"
              />
            </div>
            <label
              htmlFor="firstName"
              className="block mt-3 text-sm font-medium text-gray-900 dark:text-white"
            >
              First Name
            </label>
            <div className="relative col-span-2">
              <div className="absolute inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none">
                <span className="material-icons-outlined text-sm">
                  account_circle
                </span>
              </div>
              <input
                onChange={(e) => handleChange(e)}
                name="firstName"
                type="text"
                id="firstName"
                className="bg-gray-50 border border-gray-900 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your first name"
              />
            </div>
            <label
              htmlFor="lastName"
              className="block mt-3 text-sm font-medium text-gray-900 dark:text-white"
            >
              Last Name
            </label>
            <div className="relative col-span-2">
              <div className="absolute inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none">
                <span className="material-icons-outlined text-sm">
                  account_circle
                </span>
              </div>
              <input
                onChange={(e) => handleChange(e)}
                name="lastName"
                type="text"
                id="lastName"
                className="bg-gray-50 border border-gray-900 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your last name"
              />
            </div>
            <label
              htmlFor="phoneNumber"
              className="block mt-3 text-sm font-medium text-gray-900 dark:text-white"
            >
              Phone Number
            </label>
            <div className="relative col-span-2">
              <div className="absolute inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none">
                <span className="material-icons-outlined text-sm">call</span>
              </div>
              <input
                onChange={(e) => handleChange(e)}
                name="mobilePhone"
                type="number"
                id="phoneNumber"
                className="bg-gray-50 border border-gray-900 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your phone number"
              />
            </div>
            <label
              htmlFor="password-icon"
              className="block mt-3 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password*
            </label>
            <div className="relative col-span-2">
              <div className="absolute inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none">
                <span className="material-icons-outlined text-sm">lock</span>
              </div>
              <input
                onChange={(e) => handleChange(e)}
                name="password"
                type={visibility ? "text" : "password"}
                id="password-icon"
                className="bg-gray-50 border border-gray-900 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your password"
              />
              <div className="absolute inset-y-0 end-0 flex items-center pe-2.5 cursor-pointer">
                <span
                  onClick={() => setVisibility(!visibility)}
                  className="material-icons-outlined text-sm"
                >
                  {visibility ? "visibility" : "visibility_off"}
                </span>
              </div>
            </div>
            <div className="text-center mt-5 col-span-3">
              <p>
                Already have an account ? Click{" "}
                <Link href="/SignIn" className="text-blue-600 hover:underline">
                  this
                </Link>{" "}
                to Sign In.
              </p>
            </div>
            <div className="flex flex-col justify-center items-center w-full col-span-3">
              <button
                type="submit"
                className="items-center w-2/5 mt-5 focus:outline-none text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-md text-sm px-5 py-2.5 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-900"
              >
                Sign Up
              </button>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div> */}
    </>
  );
};

export default SignUp;
