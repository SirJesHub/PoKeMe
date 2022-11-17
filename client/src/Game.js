import React, { useEffect, useState } from "react";

function Game({ socket, username, room }) {
  const [currentInput, setCurrentInput] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [inputList, setInputList] = useState([]);
  const [score, setScore] = useState(0);
  const [counter, setCounter] = useState(10);

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

  //   const startTimer = () => {
  //     //setCounter(10);
  //     counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  //     // while (counter > 0) {
  //     //   setTimeout(() => setCounter(counter - 1), 1000);
  //     // }
  //   };
  function startTimer(duration, display) {
    var timer = duration,
      minutes,
      seconds;
    setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
        timer = duration;
      }
    }, 1000);
  }

  window.onload = function () {
    var fiveMinutes = 60 * 5,
      display = document.querySelector("#time");
    startTimer(fiveMinutes, display);
  };

  return (
    <div>
      <div>
        <body></body>

        <h1>Score = {score}</h1>
        <h1>Time = {counter} </h1>
        <div>
          Registration closes in <span id="time">05:00</span> minutes!
        </div>

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
            startTimer();
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
      </div>
    </div>
  );
}
export default Game;
