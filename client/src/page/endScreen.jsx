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
  const oppName = searchParams.get("oppName");
  const result = searchParams.get("result");
  const receivedScore = searchParams.get("receivedScore");
  const score = searchParams.get("score");

  const startToken =
    receivedScore === score ? "draw" : receivedScore > score ? "lose" : "win";

  const anotherStartToken =
    receivedScore === score ? "draw" : receivedScore > score ? "win" : "lose";

  const winRes = [
    `Congratulations! ${name}`,
    `${name}, You won!`,
    `${name}, you’ve beated ${oppName}!`,
    `You did it! ${name}`,
    `Good job! ${name}`,
    `${name} is the victor!`,
  ];

  const drawRes = [
    `That was a draw game, ${name}`,
    `${name} & ${oppName}, you both did well`,
    `${name} & ${oppName} tied`,
    `Can’t find a winner for you, ${name} & ${oppName}`,
    `The game was tied, ${name}`,
  ];

  const loseRes = [
    `You lost, ${name}`,
    `Try again, ${name}`,
    `You need to improve, ${name}`,
    `${name}, you’ve been defeated`,
    `You can do it better, ${name}`,
  ];

  socket.on("restart_game_for_another", () => {
    navigate({
      pathname: "/gameRoom",
      search: `?roomID=${room}&name=${name}`,
    });
  });

  const handleRestartClick = async () => {
    await socket.emit("restart_game", { startToken, anotherStartToken, room });
    navigate({
      pathname: "/gameRoom",
      search: `?roomID=${room}&name=${name}`,
    });
  };

  if (result === "win") {
    return (
      <div>
        <h1>
          {score}:{receivedScore}
        </h1>
        <h1> {winRes[Math.floor(Math.random() * winRes.length)]}</h1>
        <button onClick={() => handleRestartClick()}>restart</button>
      </div>
    );
  } else if (result === "draw") {
    return (
      <div>
        <h1>
          {score}:{receivedScore}
        </h1>
        <h1> {drawRes[Math.floor(Math.random() * drawRes.length)]}</h1>
        <button onClick={() => handleRestartClick()}>restart</button>
      </div>
    );
  } else if (result === "lose") {
    return (
      <div>
        <h1>
          {score}:{receivedScore}
        </h1>
        <h1>{loseRes[Math.floor(Math.random() * loseRes.length)]}</h1>
        <button onClick={() => handleRestartClick()}>restart</button>
      </div>
    );
  }
};

export default EndScreen;
