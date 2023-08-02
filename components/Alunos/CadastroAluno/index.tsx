"use client";
import api from "@/app/api";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import style from "./styles.module.css";
import ReplyIcon from "@mui/icons-material/Reply";
import Link from "next/link";

const enum Sexo {
  Masculino = 1,
  Feminino = 2,
}

const enum EscolhaContato {
  Telefone,
  Email,
  Instagram,
  Facebook,
  Twitter,
  Linkedln,
  Telegram,
}

const enum StatusAvaliacao {
  EmCriacao,
  Concluida,
}

interface Data {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  sexo: Sexo;
  temDeficiencia: boolean;
  mensalidade: number;
  contato: Contato[];
  avaliacaoFisica: AvaliacaoFisica[];
}

interface Contato {
  id: number;
  escolhaContato: EscolhaContato;
  descricao: string;
}

interface AvaliacaoFisica {
  id: number;
  peso: number;
  altura: number;
  tamanhoDoBraco: number;
  statusAvaliacao: StatusAvaliacao;
}

export function ComponenteCadastrar() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [data, setData] = useState<Data[]>([]);
  const [AtualizarRetorno, setAtualizarRetorno] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await api.get<Data[]>(`/Aluno/${id}`); // Substitua pelo endpoint da sua API
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }
  const prepareDataForUpdate = () => {
    const updateData = { ...data };
    if (updateData.idContato === 0) {
      updateData.idContato = null;
      delete updateData.idContato;
    }
    if (updateData.idAvaliacaoFisica === 0) {
      updateData.idAvaliacaoFisica = null;
      delete updateData.idAvaliacaoFisica;
    }
    return updateData;
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault(); // Evita o comportamento padrão de envio do formulário

    try {
      const updateData = prepareDataForUpdate();
      await AtualizarDados(updateData);
    } catch (error) {
      console.error("Erro ao atualizar dados:", error);
    }
  };

  async function AtualizarDados() {
    try {
      const response = await api.put<Data>(`/Aluno/${id}`, data); // Substitua pelo endpoint da sua API
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao enviar dados", error.message);
    }
  }

  const handleSubmitClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setTimeout(() => {
      window.location.reload();
    }, 5000);

    setAtualizarRetorno(true);
  };

  const alunoNome = data.nome;

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: Sexo
  ) => {
    setData({ ...data, sexo: value });
  };

  return (
    <div className={style.center}>
      {AtualizarRetorno && (
        <Alert
          severity="success"
          onClose={() => setAtualizarRetorno(false)}
          className={style.success}
        >
          Aluno atualizado com sucesso
        </Alert>
      )}

      <Card
        sx={{
          width: 900,
          height: 800,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <CardHeader title="Cadastro do Aluno" subheader={alunoNome} />

        <CardContent>
          <Box
            className={style.center}
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <TextField
              id="nome"
              label="Nome"
              value={data.nome}
              onChange={(event) =>
                setData({ ...data, nome: event.target.value })
              }
              InputLabelProps={{ shrink: !!data.nome }} // Encolhe o label quando o valor está preenchido
            />
            <TextField
              id="CPF"
              label="CPF"
              value={data.cpf}
              onChange={(event) =>
                setData({ ...data, cpf: event.target.value })
              }
              InputLabelProps={{ shrink: !!data.cpf }} // Encolhe o label quando o valor está preenchido
            />
            <TextField
              id="Email"
              label="email"
              value={data.email}
              onChange={(event) =>
                setData({ ...data, email: event.target.value })
              }
              InputLabelProps={{ shrink: !!data.email }} // Encolhe o label quando o valor está preenchido
            />

            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.sexo === Sexo.Masculino}
                    onChange={(event) =>
                      handleCheckboxChange(event, Sexo.Masculino)
                    }
                    value="1"
                  />
                }
                label="Masculino"
              />
              <FormControlLabel
                className={style.formControlLabelLeft}
                control={
                  <Checkbox
                    checked={data.sexo === Sexo.Feminino}
                    onChange={(event) =>
                      handleCheckboxChange(event, Sexo.Feminino)
                    }
                    value="2"
                  />
                }
                label="Feminino"
              />
            </FormGroup>

            <TextField
              className={style.formControlLabelLeft}
              id="mensalidade"
              label="mensalidade"
              value={data.mensalidade}
              onChange={(event) =>
                setData({ ...data, mensalidade: event.target.value })
              }
              InputLabelProps={{
                shrink: !data.mensalidade || !!data.mensalidade,
              }} // Encolhe o label quando o valor está preenchido
            />

            <FormGroup>
              <FormControlLabel
                className={style.formControlLabelLeft}
                control={
                  <Checkbox
                    checked={data.temDeficiencia == true}
                    onChange={(event) =>
                      setData({ ...data, temDeficiencia: event.target.checked })
                    }
                  />
                }
                label="Tem deficiência?"
              />
            </FormGroup>
            <Link href="/PaginaConstrucao">
              <Button variant="contained" >
                Contatos
              </Button>
            </Link>
            <Link href="/PaginaConstrucao">
              <Button variant="contained">Avaliação Física</Button>
            </Link>
            <Button
              color="success"
              variant="contained"
              type="submit"
              onClick={handleSubmitClick}
            >
              Salvar
            </Button>
          </Box>
        </CardContent>
        <Link href="/ListaAlunos">
          <Button className={style.voltar} variant="contained">
            <ReplyIcon />
            Voltar
          </Button>
        </Link>
      </Card>
    </div>
  );
}

export default ComponenteCadastrar;
