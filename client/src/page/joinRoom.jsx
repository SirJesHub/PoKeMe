import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import VStack from "../components/VStack";
import { useSocket } from "../services/socket-io";

const JoinRoom = () => {
  const { socket } = useSocket();
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");

  socket.on("ready_for_char", () => {
    navigate("/charSel");
  });

  const handleSumbit = () => {
    if (!roomId) return;
    socket.emit("join_room", roomId);
  };

  return (
    <VStack>
      <TextInput value={roomId} onChange={setRoomId} />
      <Button onClick={() => handleSumbit()}>Join Room</Button>
    </VStack>
  );
};

export default JoinRoom;
