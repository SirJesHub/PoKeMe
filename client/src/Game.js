import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

function Game({ socket, username, room }) {
  const [currentInput, setCurrentInput] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [inputList, setInputList] = useState([]);
  const [score, setScore] = useState(0);
  const [waitForP2, setwaitForP2] = useState(false);

  //send input
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
  //send input finish

  //send answer
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
  //send answer finish

  //check connection
  // window.onload = async (event) => {
  //   await socket.emit("req_player_count", room);
  //   socket.on("send_player_count", (data) => {
  //     if (data > 1) {
  //       setwaitForP2(true);
  //     }
  //   });
  // };
  useEffect(() => {
    socket.on("player_count", (data) => {
      if (data > 1) {
        setwaitForP2(true);
      }
    });
  });

  useEffect(() => {
    socket.on("recieve_input", (data) => {
      setInputList((list) => [...list, data.input]);
      resetTimer();
    });
  });

  //timer
  const startingSecond = 20; //change this to change timer
  let time = startingSecond;
  let refreshIntervalId = setInterval(updateCountdown, 1000);

  function updateCountdown() {
    let seconds = time;
    const countdownEl = document.getElementById("countdown");
    countdownEl.innerHTML = `${seconds}`;
    time--;

    if (time < 0) clearInterval(refreshIntervalId);
  }

  function resetTimer() {
    time = startingSecond;
  }
  //timer finish

  return (
    <div>
      {!waitForP2 ? (
        <div>
          <h1>Waiting for Player 2</h1>
          <button onClick={() => {}}></button>
        </div>
      ) : (
        <div>
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
              resetTimer();
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
              resetTimer();
            }}
          >
            &#9658;
          </button>
        </div>
      )}
    </div>
  );
}
export default Game;
