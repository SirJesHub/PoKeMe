import Board from "../components/Board";
import VStack from "../components/VStack";
import { useSocket } from "../services/socket-io";
import { useNavigate } from "react-router-dom";

const RoomFull = () => {
  const { socket } = useSocket();
  const navigate = useNavigate();

  socket.on("resetting_server", () => {
    navigate("/");
  });

  return (
    <VStack gap={"0px"}>
      <Board size="big">
        The Room <br />
        is FULL!
      </Board>
    </VStack>
  );
};

export default RoomFull;
