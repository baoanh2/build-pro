import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuthStore } from "../store/useAuthStore";
import NotificationsIcon from "@mui/icons-material/Notifications";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { Avatar, styled } from "@mui/material";
import Badge from "@mui/material/Badge";
import LogoutIcon from "@mui/icons-material/Logout";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useStore } from "../store/useStore";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
const drawerWidth = 240;

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));
const NavBar = () => {
  const { session } = useAuthStore();
  const logOut = useAuthStore((state) => state.logOut);
  const setDropDown = useStore((state) => state.setIsDropDown);
  const dropDown = useStore((state) => state.isDropDown);

  return (
    <Box sx={{ flexGrow: 1, position: "fixed", width: "100vw", zIndex: "10" }}>
      <AppBar
        sx={{ backgroundColor: "white", color: "black", width: "100vw" }}
        position="static"
      >
        <Toolbar>
          {session && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ ml: 3 }}
              onClick={setDropDown}
            >
              {dropDown ? <MenuOpenIcon /> : <MenuIcon />}
            </IconButton>
          )}
          <Typography
            variant="h4"
            component="div"
            sx={{
              flexGrow: 1,
              color: "#4338CA",
              fontWeight: "600",
              ml: "1em",
              my: "1rem",
            }}
          >
            BuildPro
          </Typography>

          {session && (
            <Box
              component="div"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <IconButton>
                <NotificationsIcon />
              </IconButton>
              <IconButton>
                <QuestionMarkIcon />
              </IconButton>
              <div className="flex gap-3 justify-center items-center">
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                >
                  <Avatar
                    alt={session?.user?.lastName}
                    src={
                      session?.user.image
                        ? session?.user.image
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa7tBFCEp6gP1NhOcGkP1xrcJOkfkhLVCXOA&s"
                    }
                  />
                </StyledBadge>
                <Typography>
                  {session?.user?.name
                    ? session?.user?.name
                    : session?.user?.data?.userInformation?.firstName +
                      " " +
                      session?.user?.data?.userInformation?.lastName}
                  <KeyboardArrowDownIcon />
                </Typography>
              </div>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => logOut()}
              >
                <LogoutIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
