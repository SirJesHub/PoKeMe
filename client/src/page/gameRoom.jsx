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
  const [isTurn, setIsTurn] = useState(true);
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

<<<<<<< HEAD
  ) : (
    <div>
      <p>hello</p>
    </div>
=======
>>>>>>> db3344bf48023bb812f0d4c99e7656d55c4c8da1
  );
};

export default GameRoom;
