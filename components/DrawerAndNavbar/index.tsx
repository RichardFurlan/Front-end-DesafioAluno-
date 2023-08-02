"use client";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useTheme } from "@mui/material/styles";
import Navbar from "../NavBar";
import CustomDrawer from "../Drawer";
import { CssBaseline, Grid } from "@mui/material";
import CardsMenu from "../CardsMenu";
import api from "@/app/api";

const drawerWidth = 240;
interface Data {
  id: number;
  nome: string;
  cpf: string;
  mensalidade: number;
}


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
  const [data, setData] = useState<Data[]>([]);


  const handleDrawer = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await api.get<Data[]>("/aluno");
      setData(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }

  const receita: number = data
    .map((item) => item.mensalidade)
    .reduce((acc, cur) => acc + cur, 0);

  const qtdeAlunos: number = data.length;

  return (
    <Box sx={{ display: "flex" }}>

      <Navbar handleDrawerOpen={handleDrawer} theme={theme} />
      <CustomDrawer open={open} handleDrawerClose={handleDrawer} />

      <CssBaseline />
      <Main open={open}
        style={{
              display: "flex",
          justifyContent: "center",

              alignItems: "",
            }}>
        <Toolbar>
        <Grid container spacing={6} justifyContent="center">
            <Grid item>
              <CardsMenu receita={receita} />
            </Grid>
            <Grid item>
              <CardsMenu qtdeAlunos={qtdeAlunos} />
            </Grid>
          </Grid>
        </Toolbar>
      </Main>
    </Box>
  );
};

export default PersistentDrawerLeft;
