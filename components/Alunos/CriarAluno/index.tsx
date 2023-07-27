"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import api from "../../../src/app/api";
import { Alert, Button, Checkbox, Input, TextField } from "@mui/material";
import style from "./styles.module.css";
import ReplyIcon from '@mui/icons-material/Reply';
import Link from "next/link";

interface Aluno {
  id: number;
  nome: string;
  temDeficiencia: boolean;
  cpf: string;
}

const MeuComponente: React.FC = () => {
  const [nome, setNome] = useState<string>("");
  const [temDeficiencia, setTemDeficiencia] = useState<boolean>(false);
  const [cpf, setCpf] = useState<string>("");
  const [errorCPF, setErrorCPF] = useState<string | null>(null);
  const [alunoCriadoComSucesso, setAlunoCriadoComSucesso] =
    useState<boolean>(false);

  useEffect(() => {
    if (errorCPF) {
      const timer = setTimeout(() => {
        setErrorCPF(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errorCPF]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Objeto com os dados do novo aluno a serem enviados no POST
    const novoAluno: Aluno = {
      id: 0, // O ID será gerado pelo backend
      nome: nome,
      temDeficiencia: temDeficiencia,
      cpf: cpf,
    };

    // Fazer uma chamada POST para a API para criar um novo aluno
    api
      .post<Aluno>("/Aluno", novoAluno)
      .then((response) => {
        console.log("Novo aluno criado:", response.data);
        // Limpar o formulário após o envio bem-sucedido
        setNome("");
        setTemDeficiencia(false);
        setCpf("");
        setAlunoCriadoComSucesso(true);

        const timer = setTimeout(() => {
          setAlunoCriadoComSucesso(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("Erro ao criar novo aluno:", error.response.data);
        if (error.response.data === "O CPF é inválido.") {
          setErrorCPF("CPF inválido");
        }
      });
  };

  return (
    <div className={style.container}>
      {errorCPF && (
        <Alert
          severity="error"
          onClose={() => setErrorCPF(null)}
          className={style.error}
        >
          {errorCPF}
        </Alert>
      )}

      {alunoCriadoComSucesso && (
        <Alert
          severity="success"
          onClose={() => setAlunoCriadoComSucesso(false)}
          className={style.success}
        >
          Aluno cadastrado com sucesso
        </Alert>
      )}

      <div className={style.modal}>
        <h1>Criar Novo Aluno</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              variant="filled"
              value={nome}
              label={"Nome"}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div>
            <label>Tem deficiência?</label>
            <Checkbox
              checked={temDeficiencia}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTemDeficiencia(e.target.checked)
              }
            />
          </div>
          <div>
            <TextField
              variant="filled"
              type="text"
              label="CPF"
              value={cpf}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCpf(e.target.value)
              }
            />
          </div>
          <br />
          <div className={style.center}>
            <Button type="submit" variant="contained">
              Criar aluno
            </Button>
            <br />
            <Link href = "/ListaAlunos">
            <Button color="success" variant="contained">
              <ReplyIcon />
              Voltar
            </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MeuComponente;
