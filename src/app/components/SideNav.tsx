import {
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Link } from "react-router-dom";
import { DRAWER_WIDTH } from "../constants";
import { useAppDispatch, useAppSelector } from "../hooks";
import { closeDrawer, selectOpen } from "../../features/drawer/drawerSlice";
import NavBarHeight from "./NavBarHeight";
import { ReactNode } from "react";
import { Home, Settings } from "@mui/icons-material";

const openedMixin = (theme: Theme): CSSObject => ({
  width: DRAWER_WIDTH,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: DRAWER_WIDTH,
  zIndex: theme.zIndex.appBar - 1,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

interface SideNavLinkItem {
  text: string;
  icon: ReactNode;
  to: any;
}

const sideNavLinks: SideNavLinkItem[] = [
  {
    text: "Dashboard",
    icon: <Home />,
    to: "/dashboard",
  },
  {
    text: "Settings",
    icon: <Settings />,
    to: "/dashboard/settings",
  },
];

export default function SideNav() {
  const open = useAppSelector(selectOpen);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(closeDrawer());
  };

  return (
    <Drawer variant="permanent" open={open}>
      <NavBarHeight>
        <IconButton onClick={handleClose}>
          <ChevronLeftIcon />
        </IconButton>
      </NavBarHeight>
      <Divider />
      <List>
        {sideNavLinks.map((link, index) => (
          <ListItem key={link.text} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              component={Link}
              to={link.to}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {link.icon}
              </ListItemIcon>
              <ListItemText
                primary={link.text}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
