import { BUTTON2, BUTTON_BIG, BUTTON_SMALL } from "../../utils/constants";
import "./home.css";

let audio = new Audio("bg/fart-03.mp3");

const start = () => {
  console.log("playsound");
  audio.play();
};

const Button = ({ children, size, onClick }) => {
  return (
    <button
      style={{
        position: "relative",
        padding: "0px",
        margin: "0px",
        border: "none",
        backgroundColor: "transparent",
        cursor: "pointer",
        fontFamily: "Press Start 2P",
      }}
      onClick={() => {
        start();
        onClick(); //Start the audio when button is clicked
      }}
    >
      <img
        src={size == "small" ? BUTTON_SMALL : BUTTON_BIG}
        style={{ width: "75%" }}
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "50%",
        }}
      >
        <p>{children}</p>
      </div>
    </button>
  );
};

export default Button;
