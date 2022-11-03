import React, { useEffect, useState } from "react";

function Game({ socket, username, room }) {
  const [currentInput, setCurrentInput] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [inputList, setInputList] = useState([]);
  const [score, setScore] = useState(0);

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

  useEffect(() => {
    socket.on("recieve_input", (data) => {
      setInputList((list) => [...list, data.input]);
    });
  });

  return (
    <div>
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
      <button onClick={sendInput}>&#9658;</button>
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
      <button onClick={checkAnswer}>&#9658;</button>
      <h1>Score = {score}</h1>
    </div>
  );
}
export default Game;
