import { useState } from "react";
import Button from "../components/Button";
import GameLogo from "../components/GameLogo";
import HStack from "../components/HStack";
import TextInput from "../components/TextInput";
import VStack from "../components/VStack";
import { useSocket } from "../services/socket-io";
import { useNavigate } from "react-router-dom";
import PikachuChar from "../components/PikachuChar";
import BulbaChar from "../components/BulbasaurChar";
import GameBoard from "../components/GameBoard";
import { BGMUSIC } from "../utils/constants";
import React from "react";

//      <GameBoard childern={"Vinze"}></GameBoard>

const Home = ({ playSound }) => {
  const navigate = useNavigate();
  const { socket } = useSocket();
  const [isAlertVisible, setIsAlertVisible] = React.useState(false);

  const handleButtonClick = () => {
    setIsAlertVisible(true);
  };

  setTimeout(() => {
    setIsAlertVisible(false);
  }, 3000);

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <VStack gap={"20px"}>
      <button onClick={handleButtonClick}>Show alert</button>
      {isAlertVisible && (
        <div className="alert-container">
          <div className="alert-inner">Alert! Alert!</div>
        </div>
      )}
      <GameLogo />
      <Button
        size={"small"}
        onClick={() => {
          navigate("/setup");
        }}
      >
        <p className="texts">START</p>
      </Button>
      <Button>
        <p className="texts">How to Play</p>
      </Button>
    </VStack>
  );
};

export default Home;
