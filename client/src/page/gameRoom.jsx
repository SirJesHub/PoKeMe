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
  const [round, setRound] = useState(1);
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
      // await switchIsTyping();
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

      let answerMatched = answerData.answer === inputList[inputList.length - 1];

      if (answerMatched) {
        console.log(`${username} has answer correctly`);
        setScore((prevscore) => prevscore + 1);
      }

      await socket.emit("send_answer", answerData);
      setCurrentAnswer("");
      // await switchIsTurn();
      return answerMatched ? score + 1 : score;
    }
  };

  socket.on("recieve_answer", (data) => {
    console.log("answer recieved" + data.round);
    // setRound((prevRound) => prevRound + 1);
  });

  const begin = async () => {
    let setPlayer1 = Math.random() < 0.5;
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

  const switchIsTyping = async () => {
    await sendInput();
    setIsTyping((currentState) => !currentState);
    const turn = {
      room: room,
      round: round,
      score: score,
      isTurn: isTurn,
      isTyping: isTyping,
    };
    await socket.emit("switch_isTyping", turn);
  };

  socket.on("switching_isTyping", (data) => {
    setIsTurn(!data.isTurn);
    setIsTyping(data.isTyping);
  });

  const switchIsTurn = async () => {
    const tempScore = await checkAnswer();
    if (round > 3) {
      endGame(tempScore);
      return;
    }
    setIsTurn((currentState) => !currentState);
    const turn = {
      room: room,
      round: round,
      score: score,
      isTurn: isTurn,
      isTyping: isTyping,
    };
    setRound((round) => round + 1);
    await socket.emit("switch_isTurn", turn);
  };

  socket.on("switching_isTurn", (data) => {
    setRound((round) => (round = data.round + 1));
    setIsTurn(data.isTurn);
    setIsTyping(!data.isTyping);
  });

  const compareScore = (recievedScore, score) => {
    let res;
    if (recievedScore > score) {
      res = "lose";
    } else if (recievedScore === score) {
      res = "draw";
    } else if (recievedScore < score) {
      res = "win";
    }
    return res;
  };

  const endGame = async (tempScore) => {
    const payload = {
      score: tempScore,
      room: room,
      author: username,
    };
    await socket.emit("end_game", payload);
  };

  socket.off("ending_game").on("ending_game", async (payload) => {
    const recievedScore = payload.score;
    const result = compareScore(recievedScore, score);
    const p2Payload = {
      score: score,
      room: room,
    };
    await socket.emit("end_game_for_another", p2Payload);
    navigate({
      pathname: "/endScreen",
      search: `?roomID=${room}&name=${username}&result=${result}`,
    });
  });

  socket.on("ending_game_for_another", (payload) => {
    const foo = score;
    const recievedScore = payload.score;
    const result = compareScore(recievedScore, foo);
    navigate({
      pathname: "/endScreen",
      search: `?roomID=${room}&name=${username}&result=${result}`,
    });
  });

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
        <p>Round {round}</p>
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
          onClick={async () => {
            // await sendInput();
            await switchIsTyping();
          }}
        >
          &#9658;
        </button>
      </div>
    ) : (
      <div>
        <p>I am waiting for answer</p>
        <p>Score = {score}</p>
        <p>Round {round}</p>
      </div>
    )
  ) : isTyping ? (
    <div>
      <p>I am answering</p>
      <p>Score = {score}</p>
      <p>Round {round}</p>
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
        onClick={async () => {
          // await checkAnswer();
          await switchIsTurn();
        }}
      >
        &#9658;
      </button>
    </div>
  ) : (
    <div>
      <p>i am waiting for attacker</p>
      <p>Score = {score}</p>
      <p>Round {round}</p>
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
