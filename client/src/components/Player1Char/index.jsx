import {
  BULBASAURGIF,
  CHARMANDERGIF,
  PIKACHUGIF,
  RAICHUGIF,
  CHARIZARDGIF,
  VENUSAURGIF,
} from "../../utils/constants";

const Player1Char = ({ size }) => {
  return (
    <img
      src={
        size == 1
          ? PIKACHUGIF
          : size == 2
          ? CHARMANDERGIF
          : size == 3
          ? BULBASAURGIF
          : size == 4
          ? RAICHUGIF
          : size == 5
          ? CHARIZARDGIF
          : VENUSAURGIF
      }
      style={{
        width: "8vw",
      }}
    />
  );
};

export default Player1Char;
