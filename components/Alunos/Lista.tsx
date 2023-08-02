"use client";
import { useEffect, useState } from "react";
import api from "../../src/app/api";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { getInitials } from "../../Utils/get-initials";
import styled from "./styles.module.css";
import IosShareIcon from "@mui/icons-material/IosShare";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import ReplyIcon from "@mui/icons-material/Reply";

interface Data {
  id: number;
  nome: string;
  cpf: string;
  // Adicione mais campos conforme necessário
}

const Lista: React.FC = () => {
  const [data, setData] = useState<Data[]>([]);
  const [deleteMensagem, setDeleteMensagem] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await api.get<Data[]>("/aluno"); // Substitua pelo endpoint da sua API
      setData(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }

  async function handleDeleteAluno(id: number) {
    try {
      await api.delete(`/Aluno/${id}`);
      fetchData();
      setDeleteMensagem(true);
      setTimeout(() => {
        setDeleteMensagem(false);
      }, 3000);
    } catch (error) {
      console.error("Erro ao deletar aluno:", error);
    }
  }

  return (
    <div>
      {deleteMensagem && (
        <Alert className={styled.success} severity="success">
          Aluno deletado com sucesso!
        </Alert>
      )}
      <Card>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableBody>
              {data.map((item) => {
                return (
                  <TableRow key={item.id} className= {styled.cards}>
                    <TableCell>
                    <Link
                      href={{
                        pathname: "/EditarAluno",
                        query: { id: item.id },
                      }}
                      style={{ textDecoration: "none", color: "#005" }}
                    >
                        <Stack alignItems="center" direction="row" spacing={3}>
                          <Avatar>{getInitials(item.nome)}</Avatar>
                          <Typography variant="subtitle2">
                            {item.nome}
                          </Typography>
                        </Stack>

                      </Link>
                    </TableCell>
                    <TableCell style={{ marginLeft: 0 }}>
                      <Link
                        href={{
                          pathname: "/EditarAluno",
                          query: { id: item.id },
                        }}
                        style={{ textDecoration: "none", color: "#005" }}
                      >
                        <IosShareIcon />
                      </Link>
                    </TableCell>
                    <TableCell>
                      <DeleteIcon onClick={() => handleDeleteAluno(item.id)} />
                    </TableCell>
                    </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Card>
      <Link href="/">
      <Button className={styled.voltar}
            variant="contained"
        >
          <ReplyIcon />
        Voltar
      </Button>
          </Link>
    </div>
  );
};

// Marca a página como Client Component utilizando o hook useEffect
export default function ClientSideRenderedPage() {
  return <Lista />;
}
