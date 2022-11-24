import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Socket } from "socket.io-client";
import { useSocket } from "../services/socket-io";

const CharacterSelect = () => {
  const { socket } = useSocket();
  const navigate = useNavigate();
  const location = useLocation();
  let username = location.state.username;
  let roomId = location.state.roomId;

  return (
    <div>
      <h1>Character Select</h1>
      <button
        onClick={() => navigate("/gameRoom", { state: { username, roomId } })}
      >
        Select character aka go to the actual game
      </button>
    </div>
  );
};

export default CharacterSelect;
