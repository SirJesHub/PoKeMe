import { BUTTON2, BUTTON_BIG, BUTTON_SMALL } from "../../utils/constants";

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
      }}
      onClick={onClick}
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
        }}
      >
        {children}
      </div>
    </button>
  );
};

export default Button;
