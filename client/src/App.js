import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Game from "./Game";

import { SocketProvider } from "./services/socket-io";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import JoinRoom from "./pages/joinRoom";
import WaitingRoom from "./pages/waitingRoom";
import CharacterSelect from "./pages/characterSelect";
import RoomFull from "./pages/roomFull";
import GameRoom from "./pages/GameRoom";

const socket = io.connect("http://localhost:3001");

function App() {
  return (
    <SocketProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<JoinRoom />} />
            <Route path="waitingRoom" element={<WaitingRoom />} />
            <Route path="characterSelect" element={<CharacterSelect />} />
            <Route path="gameRoom" element={<GameRoom />} />
            <Route path="roomFull" element={<RoomFull />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SocketProvider>
  );
}

export default App;
