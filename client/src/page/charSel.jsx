import { useState } from "react";
import Button from "../components/Button";
import GameLogo from "../components/GameLogo";
import HStack from "../components/HStack";
import TextInput from "../components/TextInput";
import VStack from "../components/VStack";
import { useSocket } from "../services/socket-io";
import { useNavigate } from "react-router-dom";
import { PICKACHU1 } from "../utils/constants";
import PikachuChar from "../components/PikachuChar";
import CharmanderChar from "../components/CharmanderChar";
import BulbaChar from "../components/BulbasaurChar";

const CharSel = () => {
  const navigate = useNavigate();
  const { socket } = useSocket();
  const [isCharSel, setIsCharSel] = useState(false);

  socket.on("game_start", () => {
    navigate("/gameRoom");
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
    <div>Waiting for char select</div>
  );
};

export default CharSel;
