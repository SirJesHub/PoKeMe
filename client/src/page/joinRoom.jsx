import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Board from "../components/Board";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import VStack from "../components/VStack";
import { useSocket } from "../services/socket-io";
import { useSearchParams } from "react-router-dom";

const JoinRoom = () => {
  const { socket } = useSocket();
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");

  socket.on("ready_for_char", () => {
    navigate("/charSel");
  });

  const handleSumbit = () => {
    if (!roomId) return;
    socket.emit("join_room", roomId);
  };

  return (
    <VStack gap={"40px"}>
      <TextInput
        value={roomId}
        onChange={setRoomId}
        placeholderVal="Enter Room Code"
      />
      <p>Welcome {name}</p>
      <Button onClick={() => handleSumbit()}>Join Room</Button>
      <Board size="big"></Board>
    </VStack>
  );
};

export default JoinRoom;
