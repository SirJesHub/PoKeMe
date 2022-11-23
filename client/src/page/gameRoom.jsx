import { useEffect, useState, useRef } from "react";
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
import Timer2 from "../utils/timer";
import { useNavigate, useSearchParams } from "react-router-dom";
import { forwardRef } from "react";
import { useImperativeHandle } from "react";
import Button from "../components/Button";
import TextInput from "../components/TextInput";

const Timer = forwardRef(
  ({ max, switchIsTyping, switchIsTurn, switchRole, stopDisplay }, ref) => {
    const Ref = useRef(null);
    const { socket } = useSocket();
    const [timer, setTimer] = useState(max);
    const [resetTimer, setResetTimer] = useState(false);
    const [searchParams] = useSearchParams();
    let room = searchParams.get("roomID");

    const getTimeRemaining = (e) => {
      const total = Date.parse(e) - Date.parse(new Date());
      const seconds = Math.floor((total / 1000) % 60);
      return {
        total,
        seconds,
      };
    };

    const startTimer = (e) => {
      let { total, seconds } = getTimeRemaining(e);
      if (total >= 0) {
        setTimer(seconds);
      }
    };

    const clearTimer = (e) => {
      setTimer(max);

      if (Ref.current) clearInterval(Ref.current);
      const id = setInterval(() => {
        startTimer(e);
      }, 1000);
      Ref.current = id;
    };

    const getDeadTime = () => {
      let deadline = new Date();

      deadline.setSeconds(deadline.getSeconds() + max);
      return deadline;
    };

    useEffect(() => {
      clearTimer(getDeadTime());
    }, []);

    //reset timer when time is up
    useEffect(() => {
      if (timer === 0) {
        if (max === 10) {
          switchRole();
          max = 20;
        } else if (max === 15 || 20) {
          switchIsTurn();
          max = 10;
        }
        clearTimer(getDeadTime());
      }
    }, [timer]);

    useEffect(() => {
      if (timer === 15) {
        max = 15;
        stopDisplay();
      }
    }, [timer]);

    useEffect(() => {}, [timer]);

    useImperativeHandle(ref, () => ({
      resetTimerFunc,
    }));

    const resetTimerFunc = () => {
      socket.emit("update_timer2", room);
      max = 10;
      clearTimer(getDeadTime());
    };

    useEffect(() => {
      if (resetTimer) {
        clearTimer(getDeadTime());
        setResetTimer(false);
      }
    }, [resetTimer]);

    return (
      <div
        className="App"
        style={{
          color: "red",
          fontSize: "10px",
          lineHeight: "10px",
        }}
      >
        <h2>{timer}</h2>
        {/* <button
        onClick={async () => {
          // await switchIsTyping();
          // await switchIsTurn();
          switchRole();
        }}
      >
        Reset
      </button> */}
      </div>
    );
  }
);

const GameRoom = () => {
  const { socket } = useSocket();
  const navigate = useNavigate();
  const [myCharId, setMyCharId] = useState();
  const [otherCharId, setOtherCharId] = useState();
  const [isReady, setIsReady] = useState(false);
  const [isTurn, setIsTurn] = useState(true);
  const [isTyping, setIsTyping] = useState(true);
  const [displayAns, setDisplayAns] = useState(true);
  const [currentInput, setCurrentInput] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [inputList, setInputList] = useState([]);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [searchParams] = useSearchParams();
  const [resetTimer, setResetTimer] = useState(false);
  let username = searchParams.get("name");
  let room = searchParams.get("roomID");
  const childRef = useRef(null);

  //----------------------------------------input sending/checking----------------------------------------------//
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
    setInput((prevInput) => data.input);
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

      let lastAns = inputList[inputList.length - 1];
      let tempScore = 0;
      for (let i = 0; i < lastAns.length; i++) {
        if (currentAnswer.charAt(i) != null) {
          if (lastAns.charAt(i) === currentAnswer.charAt(i)) {
            tempScore++;
          }
        }
      }

      if (tempScore > 0) {
        console.log(`${username} has answer correctly`);
        setScore((prevscore) => prevscore + tempScore);
      }

      await socket.emit("send_answer", answerData);
      setCurrentAnswer("");
      // await switchIsTurn();
      return tempScore > 0 ? score + tempScore : score;
    }
  };

  socket.on("recieve_answer", (data) => {
    console.log("answer recieved" + data.round);
    // setRound((prevRound) => prevRound + 1);
  });

  function stopDisplay() {
    setDisplayAns(false);
    setInput("");
    return;
  }
  //--------------------------------------------------input sending/checking---------------------------------//

  //-----------------------------------------round logic----------------------------------------------------//
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

  const switchRole = async () => {
    setCurrentInput("");
    setIsTyping((currentState) => !currentState);
    setIsTurn((currentState) => !currentState);
    setRound((round) => round + 1);
    const payload = {
      room,
      round,
      isTurn: isTurn,
      isTyping: isTyping,
    };
    socket.emit("switch_role", payload);
  };

  socket.on("switching_role", (data) => {
    if (round > 3) {
      endGame(score);
      return;
    }
    setIsTurn(data.isTurn);
    setIsTyping(data.isTyping);
    setRound((round) => (round = data.round + 1));
  });

  const switchIsTyping = async () => {
    if (currentInput === "") return;
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
    setDisplayAns(true);
    if (currentAnswer === "") return;
    const tempScore = await checkAnswer();
    if (round > 3) {
      endGame(tempScore);
      return;
    }
    childRef.current.resetTimerFunc();
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
    setDisplayAns(true);
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
      username: username,
    };
    await socket.emit("end_game", payload);
  };

  socket.off("ending_game").on("ending_game", async (payload) => {
    const oppName = payload.username;
    const recievedScore = payload.score;
    const result = compareScore(recievedScore, score);
    const p2Payload = {
      score: score,
      room: room,
      username: username,
    };
    await socket.emit("end_game_for_another", p2Payload);
    navigate({
      pathname: "/endScreen",
      search: `?roomID=${room}&name=${username}&result=${result}&receivedScore=${recievedScore}&score=${score}&oppName=${oppName}`,
    });
  });

  socket.on("ending_game_for_another", (payload) => {
    const oppName = payload.username;
    const foo = score;
    const recievedScore = payload.score;
    const result = compareScore(recievedScore, foo);
    navigate({
      pathname: "/endScreen",
      search: `?roomID=${room}&name=${username}&result=${result}&receivedScore=${recievedScore}&score=${score}&oppName=${oppName}`,
    });
  });

  socket.on("restarting_game", async (data) => {
    setCurrentInput("");
    setScore(0);
    setRound(1);
    let setPlayer1;
    if (data === "win") {
      setPlayer1 = true;
    } else if (data === "lose") {
      setPlayer1 = false;
    } else if (data === "draw") {
      setPlayer1 = Math.random() < 0.5;
    }
    const readyData = {
      room: room,
      author: username,
      p1: !setPlayer1,
    };
    await socket.emit("set_ready", readyData);
    setIsTurn(setPlayer1);
    setIsTyping(setPlayer1);
    setIsReady(true);
  });
  //------------------------------------------------round logic----------------------------------------//

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

  const test = () => {
    alert("it work");
  };

  return !isReady ? (
    <VStack>
      <Button
        size="small"
        onClick={() => {
          begin();
        }}
      >
        Start!
      </Button>
    </VStack>
  ) : isTurn ? (
    isTyping ? (
      <VStack>
        <HStack style={{ fontSize: "10px" }}>
          <VStack gap={"0px"}>
            <p style={{ lineHeight: "0px" }}>Time</p>
            <Timer
              max={10}
              switchIsTyping={switchIsTyping}
              switchIsTurn={switchIsTurn}
              switchRole={switchRole}
              stopDisplay={stopDisplay}
              ref={childRef}
              style={{
                color: "rgb(123,123,123)",
                fontSize: "10px",
                lineHeight: "0px",
              }}
            />
          </VStack>
          <VStack gap={"0px"}>
            <p style={{ lineHeight: "0px" }}>Score</p>
            {score}
          </VStack>
          <VStack gap={"0px"}>
            <p style={{ lineHeight: "0px" }}>Round</p>
            {round}
          </VStack>
        </HStack>

        <HStack style={{ justifyContent: "center" }}>
          <Player1Char size={myCharId}></Player1Char>
          <Player2Char size={otherCharId}></Player2Char>
        </HStack>
        <HStack>
          <TextInput
            value={currentInput}
            onChange={setCurrentInput}
            onKeyDown={(event) => {
              event.key === "Enter" && sendInput();
            }}
            placeholderVal="Attack!"
          />
          <Button
            size="small"
            onClick={async () => {
              // await sendInput();
              await switchIsTyping();
            }}
          >
            Answer
          </Button>
        </HStack>
      </VStack>
    ) : (
      <VStack gap={"0px"}>
        <Board size="big" gap={"0px"}>
          <VStack gap={"0px"}>
            <Timer2
              max={20}
              style={{
                color: "rgb(123,123,123)",
                fontSize: "10px",
                lineHeight: "0px",
              }}
            />
            <p style={{ textAlign: "center", margin: "10px" }}>
              I am waiting for answer
            </p>

            <HStack>
              <VStack gap={"0px"}>
                <p style={{ lineHeight: "0px" }}>Score</p>
                {score}
              </VStack>
              <VStack gap={"0px"}>
                <p style={{ lineHeight: "0px" }}>Round</p>
                {round}
              </VStack>
            </HStack>
          </VStack>
        </Board>
      </VStack>
    )
  ) : isTyping ? (
    displayAns ? (
      <div>
        <VStack>
          <Timer
            max={20}
            switchIsTyping={switchIsTyping}
            switchIsTurn={switchIsTurn}
            switchRole={switchRole}
            stopDisplay={stopDisplay}
            ref={childRef}
            style={{
              color: "rgb(123,123,123)",
              fontSize: "10px",
              lineHeight: "10px",
            }}
          />
          <p>{input}</p>
        </VStack>
      </div>
    ) : (
      <VStack>
        <HStack style={{ fontSize: "10px" }}>
          <VStack gap={"0px"}>
            <p style={{ lineHeight: "0px" }}>Time</p>
            <Timer
              max={15}
              switchIsTyping={switchIsTyping}
              switchIsTurn={switchIsTurn}
              switchRole={switchRole}
              stopDisplay={stopDisplay}
              ref={childRef}
              style={{
                color: "rgb(123,123,123)",
                fontSize: "10px",
                lineHeight: "10px",
              }}
            />
          </VStack>
          <VStack gap={"0px"}>
            <p style={{ lineHeight: "0px" }}>Score</p>
            {score}
          </VStack>
          <VStack gap={"0px"}>
            <p style={{ lineHeight: "0px" }}>Round</p>
            {round}
          </VStack>
        </HStack>

        <HStack style={{ justifyContent: "center" }}>
          <Player1Char size={myCharId}></Player1Char>
          <Player2Char size={otherCharId}></Player2Char>
        </HStack>
        <HStack>
          <TextInput
            value={currentAnswer}
            onChange={setCurrentAnswer}
            onKeyDown={(event) => {
              event.key === "Enter" && sendInput();
            }}
            placeholderVal="Type Away!"
          />
          <Button
            size="small"
            onClick={async () => {
              // await checkAnswer();
              await switchIsTurn();
            }}
          >
            Answer
          </Button>
        </HStack>
      </VStack>
    )
  ) : (
    <VStack gap={"0px"}>
      <Board size="big" gap={"0px"}>
        <VStack gap={"0px"}>
          <Timer2
            max={10}
            style={{
              color: "rgb(123,123,123)",
              fontSize: "10px",
              lineHeight: "10px",
            }}
          />
          <p style={{ textAlign: "center", margin: "10px" }}>
            Waiting for their input...
          </p>

          <HStack>
            <VStack gap={"0px"}>
              <p style={{ lineHeight: "0px" }}>Score</p>
              {score}
            </VStack>
            <VStack gap={"0px"}>
              <p style={{ lineHeight: "0px" }}>Round</p>
              {round}
            </VStack>
          </HStack>
        </VStack>
      </Board>
    </VStack>
  );
};

export default GameRoom;
