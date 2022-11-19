import { useEffect, useState } from "react";
import Character from "../components/Player1Char";
import PikachuChar from "../components/PikachuChar";
import { useSocket, socketRequest } from "../services/socket-io";
import Player1Char from "../components/Player1Char";
import VStack from "../components/VStack";
import Player2Char from "../components/Player2Char";
import HStack from "../components/HStack";
import GameLogo from "../components/GameLogo";
import { BOARD_SMALL } from "../utils/constants";
import Board from "../components/Board";

const GameRoom = () => {
  const { socket } = useSocket();
  const [myCharId, setMyCharId] = useState();
  const [otherCharId, setOtherCharId] = useState();
  const [isTurn, setIsTurn] = useState(false);

  useEffect(() => {
    socketRequest(socket, ["get_both_charID"], "get_both_charID_response").then(
      (data) => {
        setMyCharId(data.myCharID);
        setOtherCharId(data.otherCharID);
      }
    );
  }, []);

  console.log("my", myCharId);

  console.log("other", otherCharId);

  return !isTurn ? (
    <VStack>
      <HStack>
        <GameLogo />
      </HStack>

      <HStack>
        <VStack gap={"16px"}>
          <Player1Char size={myCharId}></Player1Char>
        </VStack>
        <VStack gap={"16px"}>
          <Player2Char size={otherCharId}></Player2Char>
        </VStack>
      </HStack>
      <HStack>
        <Board size="small"></Board>
      </HStack>
    </VStack>
  ) : (
    <div></div>
  );
};

export default GameRoom;
