import { useSocket } from "../services/socket-io";
import { useNavigate } from "react-router-dom";
import Board from "../components/Board";
import HStack from "../components/HStack";
import VStack from "../components/VStack";
import { useSearchParams } from "react-router-dom";

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
              {roomCode}
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
