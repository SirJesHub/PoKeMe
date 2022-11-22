import { useState } from "react";
import Button from "../components/Button";
import GameLogo from "../components/GameLogo";
import HStack from "../components/HStack";
import TextInput from "../components/TextInput";
import VStack from "../components/VStack";
import { useSocket } from "../services/socket-io";
import { useNavigate } from "react-router-dom";
import PikachuChar from "../components/PikachuChar";
import BulbaChar from "../components/BulbasaurChar";
import GameBoard from "../components/GameBoard";
import { BGMUSIC } from "../utils/constants";

//      <GameBoard childern={"Vinze"}></GameBoard>

const Home = () => {
  const navigate = useNavigate();
  const { socket } = useSocket();

  return (
    <VStack gap={"20px"}>
      <embed
        src={BGMUSIC}
        loop="true"
        autostart="true"
        width="2"
        height="0"
      ></embed>
      <GameLogo />
      <Button
        size={"small"}
        onClick={() => {
          navigate("/setup");
        }}
      >
        <p className="texts">START</p>
      </Button>
      <Button>
        <p className="texts">How to Play</p>
      </Button>
    </VStack>
  );
};

export default Home;
