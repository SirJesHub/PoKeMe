import { useState } from "react";
import { useEffect } from "react";
import React from "react";
import { BUTTON_SMALL } from "../../utils/constants";

const Popup = ({ children, onClick }) => {
  const [isAlertVisible, setIsAlertVisible] = React.useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    if (isOpen) {
      setIsAlertVisible(false);
      setIsOpen(false);
    } else {
      setIsAlertVisible(true);
      setIsOpen(true);
    }
  };

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
        margin: "0px",
      }}
      onClick={() => {
        handleButtonClick(); //Start the audio when button is clicked
      }}
    >
      <img src={BUTTON_SMALL} style={{ width: "75%", margin: "0px" }} />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",

          margin: "0px",
        }}
      >
        <p style={{ margin: "none", fontSize: "0.8vw" }}>{children}</p>
      </div>
    </button>
  );
};
export default Popup;
