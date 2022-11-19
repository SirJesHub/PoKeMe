import { BULBASAURGIF, CHARMANDERGIF, PIKACHUGIF } from "../../utils/constants";

const Player1Char = ({ size }) => {
  return (
    <img
      src={size == 1 ? PIKACHUGIF : size == 2 ? CHARMANDERGIF : BULBASAURGIF}
      style={{
        width: "30px",
        justifyContent: "center",
        alignContent: "center",
      }}
    />
  );
};

export default Player1Char;
