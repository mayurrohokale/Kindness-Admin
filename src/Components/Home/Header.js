import React, { useState } from "react";
import {
  useTheme,
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import { Link, Outlet } from "react-router-dom";
import { IoReceipt } from "react-icons/io5";
import { FaDonate } from "react-icons/fa";
import { ImBlog } from "react-icons/im";
import { FaUsers } from "react-icons/fa";
import { MdVolunteerActivism } from "react-icons/md";
import { useAppState } from "../utils/appState";
import Button from "../Button/reu_Button";

const drawerWidth = 240;

const MainLayout = () => {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, setUser } = useAppState();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const drawer = (
    <div>
      <Divider />
      <List>
        {[
          { text: "Dashboard", icon: <DashboardIcon />, to: "/" },
          { text: "Transactions", icon: <IoReceipt />, to: "/transactions" },
          { text: "Donationform", icon: <FaDonate />, to: "/donationform" },
          { text: "blogs", icon: <ImBlog />, to: "/blog" },
          { text: "Users", icon: <FaUsers />, to: "/users" },
          {
            text: "Volunteers",
            icon: <MdVolunteerActivism />,
            to: "/volunteers",
          },
        ].map((item) => (
          <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              component={Link}
              to={item.to}
              sx={{
                minHeight: 48,
                justifyContent: "initial",
                px: 2.5,
                "&.active": {
                  backgroundColor: theme.palette.action.selected,
                  color: theme.palette.primary.main,
                },
              }}
              onClick={() => setMobileOpen(false)}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0
                  ,
                  mr: 3,
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Kindness Corner Admin
          </Typography>
          <div className="flex-col justify-end hidden md:flex ">
            {user && user.email ? (
              <div>
                <span className="font-semibold font-sans px-2">Admin: {user.email}</span>
                <Button onClick={handleLogout} label="Logout"/>
              </div>
              
              
            ) : (
              <Button label="Login" to="/signin" />
            )}
          </div>
         
        </Toolbar>
      </AppBar>
      <Box sx={{ display: "flex", flex: 1 }}>
        <Box
          component="nav"
          sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", md: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                mt: "11vh",
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 1,
            width: { md: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
