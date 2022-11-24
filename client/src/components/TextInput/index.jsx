import { BUTTON2 } from "../../utils/constants";

const TextInput = ({ value, onChange, placeholderVal }) => {
  return (
    <div style={{ position: "relative" }}>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="texts"
        style={{
          width: "80%",
          position: "absolute",
          zIndex: "2",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          borderColor: "transparent",
          outline: "none",
          fontFamily: "Press Start 2P",
        }}
        placeholder={placeholderVal}
      />
      <img src={BUTTON2} style={{ width: "120px" }} />
    </div>
  );
};

export default TextInput;
