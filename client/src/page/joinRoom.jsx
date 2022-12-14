import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Board from "../components/Board";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import VStack from "../components/VStack";
import { useSocket } from "../services/socket-io";
import { useSearchParams } from "react-router-dom";
import { BOARD_BIG } from "../utils/constants";
import { io } from "socket.io-client";
const JoinRoom = () => {
  const { socket } = useSocket();
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");

  socket.on("ready_for_char", () => {
    navigate({
      pathname: "/charSel",
      search: `?roomID=${roomId}&name=${name}`,
    });
  });

  socket.on("resetting_server", () => {
    navigate("/");
  });

  const handleSumbit = () => {
    if (!roomId) return;
    socket.emit("join_room", roomId);
  };

  return (
    <VStack>
      <Board size="big">
        <VStack gap={"20px"}>
          <p
            style={{
              fontSize: "1.5vw",
              margin: "0px",
              lineHeight: "4vw",
              textAlign: "center",
            }}
          >
            Welcome <br />{" "}
            <span style={{ color: "orange", fontSize: "3vw" }}> {name} </span>
          </p>
          <TextInput
            value={roomId}
            onChange={setRoomId}
            placeholderVal="Enter Room Code"
          />

          <Button onClick={() => handleSumbit()}>
            <p className="texts">Join Room</p>
          </Button>
        </VStack>
      </Board>
    </VStack>
  );
};

export default JoinRoom;
