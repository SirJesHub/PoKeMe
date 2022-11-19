import { BOARD_BIG, BOARD_SMALL } from "../../utils/constants";

const Board = ({ childern, size }) => {
  return (
    <img
      src={size == "small" ? BOARD_SMALL : BOARD_BIG}
      style={{
        width: "70%",
        position: "absolute",
        zIndex: "-4",
      }}
    />
  );
};

export default Board;
