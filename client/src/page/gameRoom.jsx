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
import Timer from "../components/Timer";

const GameRoom = () => {
  const { socket } = useSocket();
  const [myCharId, setMyCharId] = useState();
  const [otherCharId, setOtherCharId] = useState();
  const [isTurn, setIsTurn] = useState(false);
  let turn = 0;

  useEffect(() => {
    socketRequest(socket, ["get_both_charID"], "get_both_charID_response").then(
      (data) => {
        setMyCharId(data.myCharID);
        setOtherCharId(data.otherCharID);
      }
    );
  }, []);

  socket.on("your_turn", (data) => {
    turn = turn + 1;
  });

  //when timer ends your turn
  socket.emit("turn_end", turn);

  socket.on("game_ends");

  console.log("my", myCharId);

  console.log("other", otherCharId);

  return !isTurn ? (
    <VStack>
      <HStack>
        <GameLogo />
        <Timer max={20} />
      </HStack>

      <HStack>
        <Player1Char size={myCharId}></Player1Char>

        <Player2Char size={otherCharId}></Player2Char>
      </HStack>
      <HStack>
        <Board size="small"></Board>
      </HStack>
    </VStack>
  ) : (
    <VStack>
      <HStack>
        <GameLogo />
        <Timer max={20} />
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
        <Board size="small" text="yes"></Board>
      </HStack>
    </VStack>
  );
};

export default GameRoom;
