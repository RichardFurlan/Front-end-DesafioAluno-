import React from "react";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { Box, Toolbar } from "@mui/material";
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
