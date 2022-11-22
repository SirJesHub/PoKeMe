import { BOARD_BIG, BOARD_SMALL } from "../../utils/constants";

const Board = ({ children, size, text }) => {
  return (
    <div style={{ position: "relative", width: "75%" }}>
      <img
        src={size == "small" ? BOARD_SMALL : BOARD_BIG}
        style={{
          width: "100%",
          zIndex: "-50",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "100%",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "20px",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Board;
