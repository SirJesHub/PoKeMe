import "./App.css";
import io from "socket.io-client";
import { useState } from "react";

import Game from "./Game";
import Popup from './Popup';
import { W } from "./utils/constants";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [gameReady, setGameReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false); //Pop-up Boolean
 
  //Pop-up condition check
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
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
      <div> 
      <input type="button" value="How to play" onClick={togglePopup}/>
      {isOpen && <Popup
        content={<>
          <b>How to play DUPME</b>
          <p>Have computer</p>
        </>}
        handleClose={togglePopup}
      />}
      </div>
    </div>
  );
}

export default App;
