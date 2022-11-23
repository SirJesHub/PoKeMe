import { BOARD_BIG, BOARD_SMALL } from "../../utils/constants";

const GameBoard = ({ childern, size, text }) => {
  return (
    <div
      style={{
        position: "relative",
        padding: "0px",
        margin: "0px",
        border: "none",
        backgroundColor: "transparent",
        cursor: "pointer",
      }}
    >
      <img
        src={BOARD_SMALL}
        style={{
          position: "absolute",
          width: "70%",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
      {childern}
    </div>
  );
};

export default GameBoard;
