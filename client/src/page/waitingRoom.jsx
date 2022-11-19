import { useSocket } from "../services/socket-io";
import { useNavigate } from "react-router-dom";
import Board from "../components/Board";
import HStack from "../components/HStack";
import VStack from "../components/VStack";
import { useSearchParams } from "react-router-dom";
import { COPY } from "../utils/constants";

const WaitingRoom = () => {
  const navigate = useNavigate();
  const { socket } = useSocket();
  const [searchParams] = useSearchParams();
  const roomCode = searchParams.get("roomID");

  socket.on("ready_for_char", () => {
    navigate("/charSel");
  });

  //let x = Math.floor((Math.random() * 1000) + 1);

  return (
    <VStack gap={"40px"}>
      <h1
        style={{
          fontFamily: "Arial",
          fontSize: "30px",
          textAlign: "center",
        }}
      >
        {roomCode}
        <button
          onClick={() => {
            navigator.clipboard.writeText(roomCode);
          }}
          style={{
            borderColor: "transparent",
            backgroundColor: "transparent",
          }}
        >
          <img
            src={COPY}
            style={{
              width: "30px",
            }}
          />
        </button>
        <br />
        Waiting For <br />
        Player 2
      </h1>
      <Board size="big"></Board>
    </VStack>
  );
};

export default WaitingRoom;
