import { useSocket } from "../services/socket-io";
import { useNavigate } from "react-router-dom";
import Board from "../components/Board";
import HStack from "../components/HStack";
import VStack from "../components/VStack";

const WaitingRoom = () => {
  const navigate = useNavigate();
  const { socket } = useSocket();

  socket.on("ready_for_char", () => {
    navigate("/charSel");
  });

  return (
    <div>
      <VStack>
        <HStack>
          <div>
            <h1
              style={{
                fontFamily: "Arial",
                marginTop: "50%",
                textAlign: "center",
              }}
            >
              Waiting For <br />
              Player 2
            </h1>
          </div>
        </HStack>
        <HStack>
          <Board size="big"></Board>
        </HStack>
      </VStack>
    </div>
  );
};

export default WaitingRoom;
