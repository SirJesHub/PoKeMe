import { useState, useEffect } from "react";
import Timer from "../utils/timer";
import { useNavigate, useLocation } from "react-router-dom";
import { useSocket } from "../services/socket-io";

const GameRoom = () => {
  const { socket } = useSocket();
  const navigate = useNavigate();
  const location = useLocation();
  let username = location.state.username;
  let room = location.state.roomId;
  const [currentInput, setCurrentInput] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [inputList, setInputList] = useState([]);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0); //not used

  socket.on("recieve_input", (data) => {
    setInputList((list) => [...list, data.input]);
  });
  
  const sendInput = async () => {
    if (currentInput !== "") {
      const inputData = {
        room: room,
        author: username,
        input: currentInput,
      };

      await socket.emit("send_input", inputData);
      setInputList((list) => [...list, inputData]);
      setCurrentInput("");
    }
  };

  const checkAnswer = async () => {
    if (currentAnswer !== "") {
      const answerData = {
        room: room,
        author: username,
        answer: currentAnswer,
      };

      if (answerData.answer === inputList[inputList.length - 1]) {
        console.log(`${username} has answer correctly`);
        setScore((prevscore) => prevscore + 1);
      }

      await socket.emit("send_answer", answerData);
      setCurrentAnswer("");
    }
  };

  const goNextRound = () => {
    setRound((round) => round + 1);
  };

  return (
    <div>
      {/* change the number in max to change time limit */}
      <Timer max={20} />
      <br />
      <h1>Score = {score}</h1>
      <h1 id="countdown"></h1>

      {/* send input */}
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
          sendInput();
        }}
      >
        &#9658;
      </button>
      {/* send answer */}
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
          checkAnswer();
        }}
      >
        &#9658;
      </button>
      <button onClick={goNextRound}>{round}</button>
    </div>
  );
};

export default GameRoom;
