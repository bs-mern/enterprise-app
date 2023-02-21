import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet } from "react-router-dom";
import SideNav from "../SideNav";
import NavigationBar from "../NavigationBar";
import {
  closeDrawer,
  openDrawer,
  selectOpen,
} from "../../../features/drawer/drawerSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import NavBarHeight from "../NavBarHeight";
import { useEffect } from "react";

export default function DashboardLayout() {
  const open = useAppSelector(selectOpen);
  const dispatch = useAppDispatch();

  const handleDrawerOpen = () => {
    dispatch(openDrawer());
  };

  return (
    <Box sx={{ display: "flex" }}>
      <NavigationBar drawerOpen={open}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            mr: 5,
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
      </NavigationBar>
      <SideNav />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <NavBarHeight />
        <Outlet />
      </Box>
    </Box>
  );
}
