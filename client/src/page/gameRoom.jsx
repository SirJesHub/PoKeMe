import { useEffect, useState } from "react";
import Character from "../components/Player1Char";
import PikachuChar from "../components/PikachuChar";
import { useSocket, socketRequest } from "../services/socket-io";
import Player1Char from "../components/Player1Char";
import VStack from "../components/VStack";
import Player2Char from "../components/Player2Char";
import HStack from "../components/HStack";
import GameLogo from "../components/GameLogo";

const GameRoom = () => {
  const { socket } = useSocket();
  const [myCharId, setMyCharId] = useState();
  const [otherCharId, setOtherCharId] = useState();

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

  return (
    <VStack>
      <GameLogo />
      <HStack style={{ justifyContent: "space-around" }}>
        <VStack gap={"16px"}>
          <Player1Char size={myCharId}></Player1Char>
        </VStack>
        <VStack gap={"16px"}>
          <Player2Char size={otherCharId}></Player2Char>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default GameRoom;
