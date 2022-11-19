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

  return (
    <div>
      <h1> yay project almost done</h1>
    </div>
  );
};

export default EndScreen;
