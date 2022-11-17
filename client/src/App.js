import "./App.css";
import io from "socket.io-client";
import { useState } from "react";

import Game from "./Game";
import { W } from "./utils/constants";


const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [gameReady, setGameReady] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setGameReady(true);
    }
  };

  const copyRoomID = async () => {
    try {
      await navigator.clipboard.writeText(room);
      console.log('Content copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

  return (
    <div className="App">
      {!gameReady ? (
        <div>
          <h1>PoKeME</h1>
          <h3> Join room </h3>
          <input
            type="text"
            placeholder="name..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID"
            id="RoomID"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
          <button onClick={copyRoomID}>Copy</button>
        </div>
      ) : (
        <Game socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
