import { Margin } from "@mui/icons-material";
import CriarAluno from "../../../components/Alunos/CriarAluno";
import Lista from "../../../components/Alunos/Lista";
import { Box, Button } from "@mui/material";
import Link from "next/link";

export default function Home() {
    return (
        <div>
            {/* <CriarAluno></CriarAluno> */}
            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                <Link href="/CriarAluno">
                    <Button variant="contained" sx={{ margin: 4 }}>Criar Aluno</Button>
                </Link>
                <Lista></Lista>
            </Box>
        </div>
    )
}
