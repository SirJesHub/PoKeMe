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
import Button from "../components/Button";
import { VENUSAURGIF } from "../utils/constants";
import { CHARIZARDGIF } from "../utils/constants";
import { RAICHUGIF } from "../utils/constants";
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
  const charId = searchParams.get("charId");

  const character = { 1: RAICHUGIF, 2: CHARIZARDGIF, 3: VENUSAURGIF };
  let myCharacter;

  if (result === "win") myCharacter = character[charId];

  const startToken =
    receivedScore === score ? "draw" : receivedScore > score ? "lose" : "win";

  const anotherStartToken =
    receivedScore === score ? "draw" : receivedScore > score ? "win" : "lose";

  const winRes = [
    `Congrats! ${name}`,
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

  socket.on("resetting_server", () => {
    navigate("/");
  });

  if (result === "win") {
    return (
      <VStack>
        <Board size="big">
          <p
            className="texts"
            style={{
              lineHeight: "1.5vw",
              textAlign: "center",
              wordWrap: "break-word",
              fontSizeAdjust: "0.7",
            }}
          >
            <VStack gap={"10px"}>
              <p>
                {score}:{receivedScore}
              </p>
              {winRes[Math.floor(Math.random() * winRes.length)]} <br />
              {oppName} loses
              <img src={myCharacter} style={{ width: "8vw" }} />
              <Button onClick={() => handleRestartClick()}>
                <p className="texts">Restart</p>
              </Button>
            </VStack>
          </p>
        </Board>
      </VStack>
    );
  } else if (result === "draw") {
    return (
      <VStack>
        <Board size="big">
          <p
            className="texts"
            style={{
              lineHeight: "2vw",
              textAlign: "center",
              fontSize: "2vw",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <VStack gap={"20px"}>
              <p>
                {score}:{receivedScore}
              </p>
              {drawRes[Math.floor(Math.random() * drawRes.length)]} <br />
              <Button onClick={() => handleRestartClick()}>
                <p className="texts">Restart</p>
              </Button>
            </VStack>
          </p>
        </Board>
      </VStack>
    );
  } else if (result === "lose") {
    return (
      <VStack>
        <Board size="big">
          <p
            className="texts"
            style={{
              lineHeight: "1.5vw",
              textAlign: "center",
              wordWrap: "break-word",
              fontSizeAdjust: "0.7",
            }}
          >
            <VStack gap={"20px"}>
              <p>
                {score}:{receivedScore}
              </p>
              {loseRes[Math.floor(Math.random() * loseRes.length)]}
              <br />
              {oppName} won :(
              <Button onClick={() => handleRestartClick()}>
                <p className="texts">Restart</p>
              </Button>
            </VStack>
          </p>
        </Board>
      </VStack>
    );
  }
};

export default EndScreen;
