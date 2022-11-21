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
import Board from "../components/Board";

const Home = () => {
  const navigate = useNavigate();
  const { socket } = useSocket();

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
