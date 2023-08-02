import { Card, CardContent, CardHeader } from "@mui/material";
import styled from "./style.module.css";

interface CardsMenuProps {
    receita?: number;
    qtdeAlunos?: number;
}

const CardsMenu: React.FC<CardsMenuProps> = ({ receita, qtdeAlunos }) => {

        const getTitle = () => {
          if (receita !== undefined) {
            return "Receita";
          } else if (qtdeAlunos !== undefined) {
            return "Quantidade de aluno cadastrados";
          } else {
            return "Título padrão"; // Se nenhuma prop for passada, você pode definir um título padrão aqui
          }
        };

    const getValue = () => {
        if (receita !== undefined) {
            return `R$ ${receita}`;
        }
        else if (qtdeAlunos !== undefined) {
            return `${qtdeAlunos}`;
        }
     };

  return (
    <>
      <div>
        <Card
          sx={{
            width: 275,
            backgroundColor: "#f5f5f5",
            height: 275,
            textAlign: "center",
          }}
        >
          <CardHeader title={getTitle()} />
          <CardContent>
                      <h3 className={styled.value}
                      >{getValue()}</h3>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default CardsMenu;
