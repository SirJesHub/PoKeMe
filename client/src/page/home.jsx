import Button from "../components/Button";
import GameLogo from "../components/GameLogo";

import { useNavigate } from "react-router-dom";
import VStack from "../components/VStack";
import PikachuChar from "../components/PikachuChar";
import BulbaChar from "../components/BulbasaurChar";
import Board from "../components/Board";

const Home = () => {
  const navigate = useNavigate();
  return (
    <VStack gap={"20px"}>
      <GameLogo />
      <Button
        size={"small"}
        onClick={() => {
          navigate("/setup");
        }}
      >
        START
      </Button>
      <Button>How to play?</Button>
    </VStack>
  );
};

export default Home;
