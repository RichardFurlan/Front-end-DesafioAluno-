"use client";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Navbar from "../NavBar";
import CustomDrawer from "../Drawer";
import AppBar from "@mui/material/AppBar";
import { CssBaseline } from "@mui/material";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: open ? 0 : `-${drawerWidth}px`, // Ajuste o marginLeft com base no estado do drawer
}));

const PersistentDrawerLeft: React.FC = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawer = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>

      <Navbar handleDrawerOpen={handleDrawer} theme={theme} />
      <CustomDrawer open={open} handleDrawerClose={handleDrawer} />

      <Main open={open}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Persistent drawer
          </Typography>
        </Toolbar>
      </Main>
    </Box>
  );
};

export default PersistentDrawerLeft;
