"use client";
import React, { useEffect, useState } from "react";
import "material-icons/iconfont/material-icons.css";
import Link from "next/link";
import { signIn } from "next-auth/react";
import NavBar from "../components/NavBar";
import { redirect, useParams } from "next/navigation";
import { useAuthStore } from "../store/useAuthStore";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  InputLabel,
  Paper,
  TextField,
} from "@mui/material";
import {
  Image,
  Lock,
  PersonOutline,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import TextFieldCustom from "../components/TextFieldCustom";

const SignIn = () => {
  const router = useRouter();
  const setSession = useAuthStore((state) => state.setSession);
  const [visibility, setVisibility] = useState(false);
  const session = useAuthStore((state) => state.session);
  const [userSignIn, setUserSignIn] = useState({
    username: "",
    password: "",
  });
  if (session) {
    redirect("/");
  }
  useEffect(() => {
    setSession();
  }, []);
  const handleChange = (e: any) => {
    setUserSignIn((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signIn("credentials", {
        username: userSignIn.username,
        password: userSignIn.password,
        redirect: false,
      });
      if (result?.status === 401) {
        toast.error(
          result?.error ? result?.error : "Invalid username or password"
        );
        console.log(result?.error);
      } else {
        router.push("/");
      }
    } catch (error: any) {
      console.log("Error: ", error);
      toast.error(
        error.response?.data?.message || "An error occurred during sign-in"
      );
    }
  };
  return (
    <>
      <NavBar />
      <div className="w-full h-screen flex flex-col justify-around items-center ">
        <Paper
          elevation={4}
          sx={{
            backgroundColor: "#DEE1E6",
            width: 1 / 2,
            border: "1px solid",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 5,
            borderRadius: 3,
          }}
        >
          <p className="text-3xl font-semibold my-2 text-center">Sign In</p>
          <form onSubmit={(e) => handleSignIn(e)} className="w-[70%]">
            <TextFieldCustom
              id="username"
              label="UserName"
              onChange={handleChange}
              type="text"
              sx={{ backgroundColor: "white", width: 1, mb: 2 }}
              iconStart={<PersonOutline />}
            />
            <TextFieldCustom
              id="password"
              label="Password"
              onChange={handleChange}
              type={visibility ? "text" : "password"}
              sx={{ backgroundColor: "white", width: 1, mb: 4 }}
              iconStart={<Lock />}
              iconEnd={
                visibility ? (
                  <IconButton onClick={() => setVisibility(!visibility)}>
                    <Visibility />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => setVisibility(!visibility)}>
                    <VisibilityOff />
                  </IconButton>
                )
              }
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: 1,
              }}
            >
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
                type="submit"
              >
                Sign In
              </Button>
            </Box>
            <div className="inline-flex items-center justify-center w-full">
              <hr className="w-full h-0.5 my-8 bg-gray-400 border-0 rounded-sm dark:bg-gray-700" />
              <div className="absolute px-4 -translate-x-1/2 bg-[#DEE1E6] left-1/2 dark:bg-gray-900">
                OR
              </div>
            </div>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                onClick={() => signIn("github")}
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  width: 1,
                  textTransform: "none",
                  gap: 4,
                  py: 1,
                  "&:hover": { fontWeight: 600 },
                }}
              >
                <Avatar
                  variant={"rounded"}
                  alt="The image"
                  src="/github.svg"
                  style={{
                    width: 33,
                    height: 31,
                  }}
                />
                Sign In with GitHub
              </Button>
            </Box>
            <div className="text-center mt-5">
              <p>
                Have no account yet ? Click{" "}
                <Link href="/SignUp" className="text-blue-600 hover:underline">
                  this
                </Link>{" "}
                to Sign Up
              </p>
            </div>
          </form>
          <ToastContainer />
        </Paper>
      </div>
    </>
  );
};

export default SignIn;
