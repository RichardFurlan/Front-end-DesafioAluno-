import React from "react";
import { styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Divider from "@mui/material/Divider";
import { Box, IconButton, Toolbar } from "@mui/material";
import ListMenuDrawer from "../ListMenuDrawer";


interface CustomDrawerProps {
  open: boolean;
  handleDrawerClose: () => void;
}

const drawerWidth = 240;


const CustomDrawer: React.FC<CustomDrawerProps> = ({ open }) => {
    return (

        <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box"
          }
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
            <Divider />
          <ListMenuDrawer />
        </Box>
      </Drawer>
  );
};

export default CustomDrawer;
