import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import { W } from "./utils/constants";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
    }
  };
  return (
    <div className="App">
      <h1>PoKeME</h1>
      <h3> Join room </h3>
      <img src={W} alt="Pickachu" />
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
  );
}

export default App;
