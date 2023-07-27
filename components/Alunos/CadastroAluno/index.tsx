"use client";
import api from "@/app/api";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import style from "./styles.module.css";

const enum Sexo {
  Masculino,
  Feminino,
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
    const [contato, setContato] = useState<Contato[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await api.get<Data[]>(`/Aluno/${id}`); // Substitua pelo endpoint da sua API
      const contato = response.data;
        setData(contato);
        console.log(contato);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }

  async function fetchDataContato() {
    try {
      const response = await api.get<Data[]>(`/Contato/${id}`); // Substitua pelo endpoint da sua API
      const aluno = response.data;
        setData(aluno);
        console.log(aluno);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }

  return (
    <div className={style.container}>
      <div className={style.modal}>
      <h1>Cadastro de Aluno</h1>

      <div className={style.grid}>
      {data && (
        <div>
          {Object.keys(data).map((key: any) => {
            if (key !== "id" && key !== "contatos" && key !== "avaliacaoFisica" && key !== "idAvaliacaoFisica" && key !== "idContato") {
              return (
                <div key={key} style={{margin: 10}} className={style["input-group"]}>
                  <TextField
                    label={key}
                    variant="filled"
                    value={
                      key === "sexo"
                        ? data[key] === Sexo.Masculino
                          ? "Masculino"
                          : "Feminino"
                        : data[key]
                    }
                  />
                </div>
              );
              }
              console.log(typeof key);
            return null;
          })}
        </div>
      )}
      <Button variant = "contained">
          Contatos
      </Button>
      <Button variant = "contained">
          Avaliação Física
        </Button>
        <Button color="success" variant = "contained">
          Salvar
          </Button>
          </div>
      </div>
    </div>
  );
}

export default ComponenteCadastrar;
