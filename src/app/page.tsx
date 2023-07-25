import Lista from "../../components/Alunos/Lista";
import api from "./api";
import './globals.css'
import HomeComponent from "../../components/HomeComponent";

export default function Home() {
  console.log(api);
  return (
    <div>
      <h1>Home</h1>

      <HomeComponent></HomeComponent>


      {/* <Lista />
      <CriarAluno></CriarAluno> */}

    </div>
  )
}
