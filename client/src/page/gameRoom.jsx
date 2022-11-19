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

const GameRoom = () => {
  const { socket } = useSocket();
  const navigate = useNavigate();
  const [myCharId, setMyCharId] = useState();
  const [otherCharId, setOtherCharId] = useState();
  const [isReady, setIsReady] = useState(false);
  const [isTurn, setIsTurn] = useState(true);
  const [isTyping, setIsTyping] = useState(true);
  const [currentInput, setCurrentInput] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [inputList, setInputList] = useState([]);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [searchParams] = useSearchParams();
  let username = searchParams.get("name");
  let room = searchParams.get("roomID");

  const sendInput = async () => {
    if (currentInput !== "") {
      const inputData = {
        room: room,
        author: username,
        input: currentInput,
        round: round,
      };

      await socket.emit("send_input", inputData);
      setInputList((list) => [...list, inputData]);
      setCurrentInput("");
    }
  };

  socket.on("recieve_input", (data) => {
    console.log("input recieved" + data.round);
    // setRound((prevRound) => prevRound + 1);
    setInputList((list) => [...list, data.input]);
  });

  const checkAnswer = async () => {
    if (currentAnswer !== "") {
      const answerData = {
        room: room,
        author: username,
        answer: currentAnswer,
        round: round,
      };

      if (answerData.answer === inputList[inputList.length - 1]) {
        console.log(`${username} has answer correctly`);
        setScore((prevscore) => prevscore + 1);
      }

      await socket.emit("send_answer", answerData);
      setCurrentAnswer("");
    }
  };

  socket.on("recieve_answer", (data) => {
    console.log("answer recieved" + data.round);
    // setRound((prevRound) => prevRound + 1);
  });

  const begin = async () => {
    var setPlayer1 = Math.random() < 0.5;
    const readyData = {
      room: room,
      author: username,
      p1: !setPlayer1,
    };
    await socket.emit("set_ready", readyData);
    setIsTurn(setPlayer1);
    setIsTyping(setPlayer1);
    setIsReady(true);
  };

  socket.on("get_ready", (data) => {
    setIsTurn(data.p1);
    setIsTyping(data.p1);
    setIsReady(true);
  });

  const switchSide = async () => {
    if (round > 3) {
      endGame();
    }
    setIsTurn(!isTurn);
    const turn = {
      room: room,
      round: round,
      isTurn: !isTurn,
      isTyping: isTyping,
    };
    await socket.emit("switch_side", turn);
  };

  socket.on("switching_side", (data) => {
    setIsTurn((isTurn) => data.isTurn);
    setIsTyping(!isTyping);
  });

  const goNextRound = () => {
    console.log("going next round: " + round);
    setRound((round) => round + 1);
  };

  const endGame = () => {
    //use socket request to compare score then set victory to true if win and false if lose
    var victory = true;
    navigate({
      pathname: "/endScreen",
      search: `?roomID=${room}&name=${username}&${victory}`,
    });
  };

  useEffect(() => {
    socketRequest(socket, ["get_both_charID"], "get_both_charID_response").then(
      (data) => {
        setMyCharId(data.myCharID);
        setOtherCharId(data.otherCharID);
      }
    );
  }, []);

  // socket.on("your_turn", (data) => {
  //   turn = turn + 1;
  // });

  // //when timer ends your turn
  // socket.emit("turn_end", turn);

  // socket.on("game_ends");

  console.log("my", myCharId);

  console.log("other", otherCharId);

  return !isReady ? (
    <div>
      <h3>press to begin</h3>
      <button
        onClick={() => {
          begin();
        }}
      >
        &#9658;
      </button>
    </div>
  ) : isTurn ? (
    isTyping ? (
      <div>
        <p> I am attacking</p>
        <p>Score = {score}</p>
        <p>Round Counter = {round}</p>
        <input
          type="text"
          value={currentInput}
          placeholder="input"
          onChange={(event) => {
            setCurrentInput(event.target.value);
          }}
          onKeyDown={(event) => {
            event.key === "Enter" && sendInput();
          }}
        />
        <button
          onClick={() => {
            goNextRound();
            switchSide();
            sendInput();
          }}
        >
          &#9658;
        </button>
      </div>
    ) : (
      <div>
        <p>I am waiting for attacker</p>
        <p>Score = {score}</p>
        <p>Round Counter = {round}</p>
      </div>
    )
  ) : isTyping ? (
    <div>
      <p>I am answering</p>
      <p>Score = {score}</p>
      <p>Round Counter = {round}</p>
      <input
        type="text"
        value={currentAnswer}
        placeholder="answer"
        onChange={(event) => {
          setCurrentAnswer(event.target.value);
        }}
        onKeyDown={(event) => {
          event.key === "Enter" && checkAnswer();
        }}
      />
      <button
        onClick={() => {
          goNextRound();
          switchSide();
          checkAnswer();
        }}
      >
        &#9658;
      </button>
    </div>
  ) : (
    <div>
      <p>i am waiting for answer</p>
      <p>Score = {score}</p>
      <p>Round Counter = {round}</p>
    </div>
  );
  // return !isTurn ? (
  //   <VStack>
  //     <HStack>
  //       <GameLogo />
  //       <Timer max={20} />
  //     </HStack>

  //     <HStack>
  //       <Player1Char size={myCharId}></Player1Char>

  //       <Player2Char size={otherCharId}></Player2Char>
  //     </HStack>
  //     <HStack>
  //       <Board size="small"></Board>
  //     </HStack>
  //   </VStack>
  // ) : (
  //   <VStack>
  //     <HStack>
  //       <GameLogo />
  //       <Timer max={20} />
  //     </HStack>

  //     <HStack>
  //       <VStack gap={"16px"}>
  //         <Player1Char size={myCharId}></Player1Char>
  //       </VStack>
  //       <VStack gap={"16px"}>
  //         <Player2Char size={otherCharId}></Player2Char>
  //       </VStack>
  //     </HStack>
  //     <HStack>
  //       <Board size="small" text="yes"></Board>
  //     </HStack>
  //   </VStack>
  // );
};

export default GameRoom;
