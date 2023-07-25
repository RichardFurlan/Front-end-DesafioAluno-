import React from "react";
import { styled, useTheme } from "@mui/material/styles"; // Importe useTheme aqui
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Theme } from "@mui/material/styles"; // Importe Theme aqui
import CustomDrawer from "../Drawer";
// import AppBar from "@mui/material/AppBar";
import { AppBar, Box } from "@mui/material";

interface NavbarProps {
  handleDrawerOpen: () => void;
  theme: Theme;
}





const Navbar: React.FC<NavbarProps> = ({handleDrawerOpen, theme }) => {
  return (
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme: Theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Persistent drawer
          </Typography>
        </Toolbar>

      </AppBar>
  );
};

export default Navbar;
