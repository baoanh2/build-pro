"use client";
import React from "react";
import SideBar from "./SideBarCustom";
import { useAuthStore } from "../store/useAuthStore";
import NavBar from "./NavBar";
import { Box, styled } from "@mui/material";
import { useStore } from "../store/useStore";

interface LayoutProps {
  children: React.ReactNode;
}
const drawerWidth = 240;
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    },
  ],
}));
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const dropDown = useStore((state) => state.isDropDown);
  return (
    <>
      <Box sx={{ display: "flex", height: "100vh" }}>
        <NavBar />
        <Box
          sx={{
            display: "flex",
            width: "100vw",
            position: "relative",
            top: "4.6rem",
          }}
        >
          <Box>
            <SideBar />
          </Box>
          <Main sx={{ width: "100vw" }} open={dropDown}>
            {children}
          </Main>
        </Box>
      </Box>
    </>
  );
};

export default Layout;
