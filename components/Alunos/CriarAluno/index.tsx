"use client";
import React, { useEffect, useState } from "react";
import api from "../../../src/app/api"
import { Alert } from "@mui/material";
import style from "./styles.module.css";

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
      })
      .catch((error) => {
        console.error("Erro ao criar novo aluno:", error.response.data);
        if (error.response.data === "O CPF é inválido.") {
          setErrorCPF("CPF inválido")
        }

      });
  };


  return (
    <div>
      <h1>Criar Novo Aluno</h1>
      {errorCPF && (<Alert severity="error" onClose={() => setErrorCPF(null)}
      className={style.error}
      >{errorCPF}</Alert>)}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div>
          <label>Tem deficiência?</label>
          <input
            type="checkbox"
            checked={temDeficiencia}
            onChange={(e) => setTemDeficiencia(e.target.checked)}
          />
        </div>
        <div>
          <label>CPF:</label>
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
        </div>
        <button type="submit">Criar Aluno</button>
      </form>
    </div>
  );
};

export default MeuComponente;
