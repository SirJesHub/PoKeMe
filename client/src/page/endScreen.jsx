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
import { useNavigate, useSearchParams } from "react-router-dom";

const EndScreen = () => {
  const { socket } = useSocket();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const room = searchParams.get("roomID");
  const name = searchParams.get("name");
  const result = searchParams.get("result");

  const winRes = [
    `Congrats ${name}!!! You won`,
    `Props to ${name} for prevailing a strong opponent`,
    `It's your victory!${name}`,
    `${name} is the king of room ${room}`,
  ];

  if (result === "win") {
    return (
      <div>
        <h1> {winRes[Math.floor(Math.random() * winRes.length)]}</h1>
      </div>
    );
  } else if (result === "draw") {
    return (
      <div>
        <h1> In the end, it is a tie for {name}</h1>
      </div>
    );
  } else if (result === "lose") {
    return (
      <div>
        <h1> Better luck next time! {name}</h1>
      </div>
    );
  }
};

export default EndScreen;
