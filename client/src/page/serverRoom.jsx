import { useState } from "react";
import Button from "../components/Button";
import GameLogo from "../components/GameLogo";
import HStack from "../components/HStack";
import TextInput from "../components/TextInput";
import VStack from "../components/VStack";
import { useSocket } from "../services/socket-io";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ServerRoom = () => {
  const { socket } = useSocket();
  const resetServer = () => {
    socket.emit("reset_server");
  };

  return (
    <Button
      onClick={() => {
        resetServer();
      }}
    >
      Reset
    </Button>
  );
};

export default ServerRoom;
