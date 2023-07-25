import Collapse from "@mui/material/Collapse";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import { StarBorder } from "@mui/icons-material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Link from "next/link";
import { Typography } from "@mui/material";

export default function ListMenuDrawer() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <PeopleAltIcon sx={{ color: "#1e88e5" }} />
        </ListItemIcon>
        <ListItemText primary="Alunos" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <li>
          <Link href="/ListaAlunos" passHref style={{ textDecoration: 'none' }}>
            <List component="div" disablePadding >
              <ListItemButton sx={{ pl: 4}} component="button">
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                  <ListItemText sx={{color: '#000'}} primary="Lista de alunos"/>
              </ListItemButton>
            </List>
          </Link>
        </li>
      </Collapse>
    </List>
  );
}
