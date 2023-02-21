import React from "react";
import {
  Toolbar,
  Typography,
  Button,
  useMediaQuery,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { DRAWER_WIDTH } from "../constants";
import { MoreVert } from "@mui/icons-material";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface NavigationBarProps {
  children?: ReactNode;
  drawerOpen?: boolean;
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export default function NavigationBar(props: NavigationBarProps) {
  const isMobile = useMediaQuery("(max-width: 600px)");

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const menuOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar open={props.drawerOpen || false} elevation={0} position="fixed">
      <Toolbar>
        {props.children}
        <Typography variant="h6" component={"div"} sx={{ flexGrow: 1 }}>
          Enterprise App
        </Typography>
        {!isMobile && (
          <>
            <Button component={Link} to="/" color="inherit">
              Home
            </Button>
            <Button component={Link} to="/about" color="inherit">
              About
            </Button>
            <Button component={Link} to="/dashboard" color="inherit">
              Dashboard
            </Button>
          </>
        )}
        {isMobile && (
          <>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleClick}
              edge="start"
            >
              <MoreVert />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem component={Link} to="/" onClick={handleClose}>
                Home
              </MenuItem>
              <MenuItem component={Link} to="/about" onClick={handleClose}>
                About
              </MenuItem>
              <MenuItem component={Link} to="/dashboard" onClick={handleClose}>
                Dashboard
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
