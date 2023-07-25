"use client";
import { useEffect, useState } from "react";
import api from "../../src/app/api";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { getInitials } from "../../Utils/get-initials";
import styled from "./styles.module.css";
import IosShareIcon from '@mui/icons-material/IosShare';
import DeleteIcon from '@mui/icons-material/Delete';

interface Data {
  id: number;
  nome: string;
  cpf: string;
  // Adicione mais campos conforme necessário
}

const Lista: React.FC = () => {
  const [data, setData] = useState<Data[]>([]);

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
    }
    catch (error) {
      console.error("Erro ao deletar aluno:", error);
    }
  }


  return (
    <div>
      <Card>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableBody>
              {data.map((item) => {

                return(
                <TableRow key={item.id}>
                  <TableCell>
                      <Stack alignItems="center" direction="row" spacing={3}>
                        <Avatar>{getInitials(item.nome)}</Avatar>
                      <Typography variant="subtitle2">{item.nome}</Typography>
                    </Stack>
                    </TableCell>
                    <TableCell>
                      <IosShareIcon />
                      </TableCell >
                    <TableCell>
                      <DeleteIcon onClick={ () => handleDeleteAluno(item.id) } />
                    </TableCell>
                </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Card>
    </div>
  );
};

// Marca a página como Client Component utilizando o hook useEffect
export default function ClientSideRenderedPage() {
  return <Lista />;
}
