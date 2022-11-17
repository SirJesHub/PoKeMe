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
      // roomSize = io.sockets.adapter.rooms.get(room).size;
      // console.log(`hi`);
      setGameReady(true);
    }
  };

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
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Game socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
