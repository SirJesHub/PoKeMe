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

  socket.on("room_full", () => {
    navigate("/roomFull");
    socket.disconnect();
  });

  const handleJoinRoom = () => {
    if (!name) return;
    navigate("/joinRoom");
    navigate({
      pathname: "/joinRoom",
      search: `?name=${name}`,
    });
  };

  const handleCreateRoom = () => {
    if (!name) return;
    var randNumber = Math.round(Math.random() * 999999999);
    const roomCode = randNumber.toString().substr(0, 4);
    socket.emit("join_room", `${roomCode}`);
    navigate({
      pathname: "/waitingRoom",
      search: `?roomID=${roomCode}&name=${name}`,
    });
  };

  return (
    <VStack>
      <GameLogo />
      <HStack style={{ justifyContent: "space-around" }}>
        <VStack gap={"16px"}>
          <Button size="small">
            {" "}
            <p className="texts">Name</p>
          </Button>
          <TextInput value={name} onChange={setName} />
        </VStack>
        <VStack gap={"16px"}>
          <Button onClick={handleJoinRoom}>
            <p className="texts">Join Room</p>
          </Button>
          <Button onClick={handleCreateRoom}>
            <p className="texts">Create Room</p>
          </Button>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default Setup;
//export const roomCode = roomCode;
