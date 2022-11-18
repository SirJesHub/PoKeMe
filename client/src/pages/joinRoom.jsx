import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../services/socket-io";

const JoinRoom = () => {
  const { socket } = useSocket();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");

  const joinRoom = () => {
    if (username !== "" && roomId !== "") {
      socket.emit("join_room", roomId);
    }
  };

  return (
    <div>
      <div>
        <h1>PoKeME</h1>
        <h3> Join room </h3>
        <input
          type="text"
          placeholder="name..."
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Room ID"
          onChange={(event) => {
            setRoomId(event.target.value);
          }}
        />
        <button
          onClick={() => {
            joinRoom();
            navigate("/waitingRoom", { state: { username, roomId } });
          }}
        >
          Join A Room
        </button>
      </div>
    </div>
  );
};

export default JoinRoom;
