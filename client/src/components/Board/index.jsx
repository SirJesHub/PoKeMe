import { BOARD_BIG, BOARD_SMALL } from "../../utils/constants";

const Board = ({ childern, size }) => {
  return (
    <div>
      <img
        src={size == "small" ? BOARD_SMALL : BOARD_BIG}
        style={{
          width: "70%",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: "-4",
        }}
      />
      {childern}
    </div>
  );
};

export default Board;
