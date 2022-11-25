import { useSocket } from "../services/socket-io";
import { useNavigate } from "react-router-dom";
import Board from "../components/Board";
import HStack from "../components/HStack";
import VStack from "../components/VStack";
import { useSearchParams } from "react-router-dom";
import { COPY } from "../utils/constants";
import "../components/Button/home.css";

const WaitingRoom = () => {
  const navigate = useNavigate();
  const { socket } = useSocket();
  const [searchParams] = useSearchParams();
  const roomCode = searchParams.get("roomID");
  const name = searchParams.get("name");

  socket.on("ready_for_char", () => {
    navigate({
      pathname: "/charSel",
      search: `?roomID=${roomCode}&name=${name}`,
    });
  });

  socket.on("resetting_server", () => {
    navigate("/");
  });

  //let x = Math.floor((Math.random() * 1000) + 1);

  return (
    <VStack>
      <Board size="big">
        <VStack gap={"40px"}>
          <p
            className="texts"
            style={{
              fontSize: "1.5vw",
              lineHeight: "35px",
              textAlign: "center",
            }}
          >
            Welcome <br />
            <span style={{ fontSize: "2.5vw", color: "orange" }}> {name} </span>
            <br />
            Code: {roomCode}
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
                  width: "1.5vw",
                  cursor: "pointer",
                }}
              />
            </button>
            <br />
            <span style={{ fontSize: "1.5vw", color: "gray" }}>
              {" "}
              Please Wait For <br /> a 2nd Player
            </span>
          </p>
        </VStack>
      </Board>
    </VStack>
  );
};

export default WaitingRoom;
