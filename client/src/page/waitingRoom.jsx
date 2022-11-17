import { useSocket } from "../services/socket-io";
import { useNavigate } from "react-router-dom";

const WaitingRoom = () => {
  const navigate = useNavigate();
  const { socket } = useSocket();

  socket.on("ready_for_char", () => {
    navigate("/charSel");
  });

  return <>waiting Room</>;
};

export default WaitingRoom;
