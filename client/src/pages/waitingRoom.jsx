import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSocket } from "../services/socket-io";

const WaitingRoom = () => {
  const { socket } = useSocket();
  const navigate = useNavigate();
  const location = useLocation();
  let username = location.state.username;
  let roomId = location.state.roomId;
  const [playerCount, setPlayerCount] = useState(0);

  socket.on("send_player_count", (playerCount) => {
    setPlayerCount(playerCount);
    navigate("/characterSelect", { state: { username, roomId } });
  });

  socket.on("room_full", () => {
    navigate("/roomFull");
    socket.disconnect();
  });

  return (
    <div>
      <h1>Waiting for Player 2</h1>
      <button onClick={() => {}}></button>
      <h3>{playerCount}</h3>
    </div>
  );
};

export default WaitingRoom;
