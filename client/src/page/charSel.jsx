import { useState } from "react";
import Button from "../components/Button";
import GameLogo from "../components/GameLogo";
import HStack from "../components/HStack";
import TextInput from "../components/TextInput";
import VStack from "../components/VStack";
import { useSocket } from "../services/socket-io";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PICKACHU1 } from "../utils/constants";
import PikachuChar from "../components/PikachuChar";
import CharmanderChar from "../components/CharmanderChar";
import BulbaChar from "../components/BulbasaurChar";
import Board from "../components/Board";

const CharSel = () => {
  const navigate = useNavigate();
  const { socket } = useSocket();
  const [isCharSel, setIsCharSel] = useState(false);
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const roomCode = searchParams.get("roomID");

  socket.on("game_start", () => {
    navigate({
      pathname: "/gameRoom",
      search: `?roomID=${roomCode}&name=${name}`,
    });
  });

  const handleCharSel = (charID) => {
    setIsCharSel(true);
    socket.emit("select_char", charID);
  };

  return !isCharSel ? (
    <VStack>
      <GameLogo />

      <HStack>
        <VStack gap={"16px"}>
          <Button
            size="small"
            onClick={() => {
              handleCharSel(1);
            }}
          >
            Pikachu
          </Button>
          <PikachuChar></PikachuChar>
        </VStack>
        <VStack gap={"16px"}>
          <Button
            size="small"
            onClick={() => {
              handleCharSel(2);
            }}
          >
            Charmander
          </Button>
          <CharmanderChar></CharmanderChar>
        </VStack>
        <VStack gap={"16px"}>
          <Button
            size="small"
            onClick={() => {
              handleCharSel(3);
            }}
          >
            Bulbasaur
          </Button>
          <BulbaChar></BulbaChar>
        </VStack>
      </HStack>
    </VStack>
  ) : (
    <VStack>
      <Board size="big">
        <VStack>
          <p
            style={{
              width: "80%",
              alignContent: "center",
              justifyContent: "center",
              lineHeight: "30px",
            }}
          >
            Waiting for the 2nd Player to select a character...
          </p>
        </VStack>
      </Board>
    </VStack>
  );
};

export default CharSel;
