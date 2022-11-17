import { useState } from "react";
import Button from "../components/Button";
import GameLogo from "../components/GameLogo";
import HStack from "../components/HStack";
import TextInput from "../components/TextInput";
import VStack from "../components/VStack";
import { useSocket } from "../services/socket-io";
import { useNavigate } from "react-router-dom";

const Setup = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { socket } = useSocket();
  const handleJoinRoom = () => {
    if (!name) return;
    navigate("/joinRoom");
  };

  const handleCreateRoom = () => {
    if (!name) return;
    socket.emit("join_room", "123456");
    navigate("/waitingRoom");
  };

  return (
    <VStack>
      <GameLogo />
      <HStack>
        <VStack gap={"16px"}>
          <Button size="small">Name</Button>
          <TextInput value={name} onChange={setName} />
        </VStack>
        <VStack gap={"16px"}>
          <Button onClick={handleJoinRoom}>Join Room</Button>
          <Button onClick={handleCreateRoom}>Create Room</Button>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default Setup;
