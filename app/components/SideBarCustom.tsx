"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import {
  Home,
  Dashboard,
  Apartment,
  Person,
  Settings,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Assessment,
} from "@mui/icons-material";
import { useStore } from "../store/useStore";
import { useSideBarStore } from "../store/useSideBarStore";
const drawerWidth = 265;

const Sidebar = () => {
  const pathname = usePathname();
  const dropDown = useStore((state) => state.isDropDown);
  const { sideBarDrop, setSideBarDrop } = useSideBarStore();
  const menuItems = [
    { text: "Home", icon: <Home />, path: "/", isDropDown: false },
    {
      text: "Dashboards",
      icon: <Dashboard />,
      isDropDown: true,
      iconDropDown: <KeyboardArrowDown />,
    },
    {
      text: "Reports",
      icon: <Assessment />,
      isDropDown: true,
      iconDropDown: <KeyboardArrowDown />,
    },
    {
      text: "Admin",
      icon: <Apartment />,
      isDropDown: true,
      subMenu1: [
        {
          text: "User Account",
          iconSub: <Person />,
          isDropDown: false,
          subMenu2: [
            { text: "Users", path: "/UserList" },
            { text: "Roles", path: "/RoleList" },
          ],
        },
        { text: "Settings", iconSub: <Settings /> },
        { text: "Dashboard", iconSub: <Dashboard /> },
      ],
    },
  ];
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        display: "flex",
        zIndex: "7",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          zIndex: "7",
          top: "4.7rem",
        },
      }}
      variant="persistent"
      anchor="left"
      open={dropDown}
    >
      {dropDown && (
        <List>
          {menuItems.map((menuItem, index) => (
            <div key={index}>
              {menuItem.isDropDown ? (
                <>
                  <ListItemButton
                    component="button"
                    onClick={() => setSideBarDrop(menuItem.text)}
                    sx={{ width: "100%" }}
                  >
                    <ListItemIcon>{menuItem.icon}</ListItemIcon>
                    <ListItemText primary={menuItem.text} />
                    {sideBarDrop[menuItem.text] ? (
                      <KeyboardArrowUp />
                    ) : (
                      <KeyboardArrowDown />
                    )}
                  </ListItemButton>
                  {/* SubMenu1 */}
                  <Collapse
                    in={sideBarDrop[menuItem.text]}
                    timeout="auto"
                    unmountOnExit
                    sx={{ p: 0 }}
                  >
                    <List component="div">
                      {menuItem.subMenu1?.map((submenu1, childIndex) => (
                        <div key={childIndex}>
                          <ListItemButton
                            component="button"
                            sx={{ width: "100%", pl: 4 }}
                            onClick={() => setSideBarDrop(submenu1.text)}
                          >
                            <ListItemIcon>{submenu1.iconSub}</ListItemIcon>
                            <ListItemText primary={submenu1.text} />
                            {sideBarDrop[submenu1.text] ? (
                              <KeyboardArrowUp />
                            ) : (
                              <KeyboardArrowDown />
                            )}
                          </ListItemButton>
                          {/* SubMenu2 */}
                          {submenu1.subMenu2 && (
                            <Collapse
                              in={sideBarDrop[submenu1.text]}
                              timeout="auto"
                              unmountOnExit
                              sx={{ p: 0 }}
                            >
                              <List component="div">
                                {submenu1.subMenu2?.map(
                                  (submenu2, childIndex) => (
                                    <div key={childIndex}>
                                      <Link
                                        href={submenu2?.path}
                                        passHref
                                        legacyBehavior
                                      >
                                        <ListItemButton
                                          sx={{
                                            pl: 11,
                                          }}
                                          selected={pathname === submenu2.path}
                                        >
                                          <ListItemText
                                            primary={submenu2.text}
                                          />
                                        </ListItemButton>
                                      </Link>
                                    </div>
                                  )
                                )}
                              </List>
                            </Collapse>
                          )}
                        </div>
                      ))}
                    </List>
                  </Collapse>
                </>
              ) : (
                <Link
                  href={menuItem.path ? menuItem.path : ""}
                  passHref
                  legacyBehavior
                >
                  <ListItemButton
                    sx={{
                      "&.Mui-selected": {
                        fontWeight: "bold",
                      },
                    }}
                    selected={pathname === menuItem.path}
                  >
                    <ListItemIcon>{menuItem.icon}</ListItemIcon>
                    <ListItemText primary={menuItem.text} />
                  </ListItemButton>
                </Link>
              )}
            </div>
          ))}
        </List>
      )}
    </Drawer>
  );
};

export default Sidebar;
