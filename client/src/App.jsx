import "./App.css";
import useSound from "use-sound";
import io from "socket.io-client";
import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./page/home";
import Setup from "./page/setup";
import { SocketProvider } from "./services/socket-io";
import JoinRoom from "./page/joinRoom";
import CharSel from "./page/charSel";
import WaitingRoom from "./page/waitingRoom";
import GameRoom from "./page/gameRoom";
import RoomFull from "./page/roomFull";
import EndScreen from "./page/endScreen";
import { useEffect } from "react";
//import BGMUSIC from "../public/bg/PokemonCenter.mp3";

// const socket = io.connect("http://localhost:3001");
//let audio = new Audio(BGMUSIC);

function App() {
  //const [play] = useSound(BGMUSIC);

  // useEffect(() => {
  //   play();
  // }, []);

  return (
    <SocketProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path={"setup"} element={<Setup />} />
            <Route path={"joinRoom"} element={<JoinRoom />} />
            <Route path={"charSel"} element={<CharSel />} />
            <Route path={"waitingRoom"} element={<WaitingRoom />} />
            <Route path={"gameRoom"} element={<GameRoom />} />
            <Route path={"roomFull"} element={<RoomFull />} />
            <Route path={"endScreen"} element={<EndScreen />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SocketProvider>
  );
  // return (
  //   <div className="App">
  //     <body>
  //       <img class='gameboy' src={JOY} alt="Joy" />
  //       <img class='gameBG' src={BG_JOY} alt="BG Joy" />
  //       <img class='button2' src={BUTTON2} alt="Button2" />
  //       <div>
  //         <img class='button3' src={BUTTON3} alt="Button3" />
  //         <h3 class='button3-text' >Join Room</h3>
  //       </div>
  //       <img class='button3' src={BUTTON3} alt="Button3" />
  //       <img class='button3' src={BUTTON3} alt="Button3" />

  //       {!gameReady ? (
  //         <div>
  //           <h1>PoKeME</h1>
  //           <h3> Join room </h3>
  //           <input

  //             type="text"
  //             placeholder="name..."
  //             onChange={(event) => {
  //               setUsername(event.target.value);
  //             }}
  //           />
  //           <input
  //             class='input'
  //             type="text"
  //             placeholder="Room ID"
  //             onChange={(event) => {
  //               setRoom(event.target.value);
  //             }}
  //           />
  //           <button onClick={joinRoom}>Join A Room</button>
  //         </div>
  //       ) : (
  //         <Game socket={socket} username={username} room={room} />
  //       )}
  //     </body>
  //   </div>
  // );
}

export default App;
