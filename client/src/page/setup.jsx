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
  const [playerOnline, setPlayerOnline] = useState(420);

  socket.on("get_player_count", (data) => {
    console.log(`player online: ${data.playerCount}`);
    setPlayerOnline((prevOnline) => prevOnline + data.playerCount);
  });

  window.onload = function playerRequest() {
    console.log("function ran");
    setPlayerOnline((prevOnline) => 70);
    // return reqPlayerOnline();
  };

  const reqPlayerOnline = async () => {
    let playerCount = 69;
    const reqData = {
      playerCount: playerCount,
    };
    await socket.emit("req_player_count", reqData);
  };

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
      <div>
        <br></br>
        <p> player online = {playerOnline}</p>
      </div>
      <GameLogo />
      <HStack style={{ justifyContent: "space-around" }}>
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
//export const roomCode = roomCode;
