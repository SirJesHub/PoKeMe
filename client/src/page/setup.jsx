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
  const [playerOnline, setPlayerOnline] = useState(1);
  const [playerInGame, setPlayerInGame] = useState(420);

  socket.on("get_player_count", (data) => {
    console.log(`player online: ${data.playerCount}`);
    setPlayerInGame((prevIngame) => data.playerPlaying);
    setPlayerOnline((prevOnline) => data.playerCount);
  });

  const reqPlayerOnline = async () => {
    let playerCount = 69;
    let playerPlaying = 69;
    const reqData = {
      playerCount: playerCount,
      playerPlaying: playerPlaying,
    };
    await socket.emit("req_player_count", reqData);
  };

  document.addEventListener("DOMContentLoaded", (event) => {
    reqPlayerOnline();
  });

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
    var randNumber = Math.round(Math.random() * 77777777);
    const roomCode = randNumber.toString().substr(0, 4);
    socket.emit("join_room", `${roomCode}`);
    navigate({
      pathname: "/waitingRoom",
      search: `?roomID=${roomCode}&name=${name}`,
    });
  };

  return (
    <div>
      <Button
        onClick={reqPlayerOnline}
        size="small"
        style={{ margin: "none", width: "10px", position: "relative" }}
      >
        <span style={{ margin: "none", fontSize: "10px" }}>
          &#129001; {playerOnline}
        </span>
      </Button>
      <VStack gap={"1vw"}>
        <HStack>
          <GameLogo />
        </HStack>

        <HStack style={{ justifyContent: "space-around" }}>
          <VStack gap={"1vw"}>
            <Button size="small">
              <p className="texts">Name</p>
            </Button>
            <TextInput value={name} onChange={setName} />
          </VStack>
          <VStack gap={"1vw"}>
            <Button onClick={handleJoinRoom}>
              <p className="texts">Join Room</p>
            </Button>
            <Button onClick={handleCreateRoom}>
              <p className="texts">Create Room</p>
            </Button>
          </VStack>
        </HStack>
      </VStack>
    </div>
  );
};

export default Setup;
