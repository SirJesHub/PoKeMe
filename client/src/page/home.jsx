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
import Popup from "../components/H2P";
import Board from "../components/Board";

const Home = ({ playSound }) => {
  const navigate = useNavigate();
  const { socket } = useSocket();
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

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <VStack>
      <div>
        {isAlertVisible && (
          <span
            style={{
              position: "fixed",
              width: "30vw",
              top: "20%",
              left: "50%",
              zIndex: "110",
              transform: "translate(-50%, -50%)",
              overflow: "scroll",
              fontSize: "10%",
              lineHeight: "200%",
              textAlign: "center",
              backgroundColor: "white",
              borderColor: "black",
              borderStyle: "solid",
              borderWidth: "300%",
            }}
          >
            <p>
              One player must create a room, while the other player join the
              created room. Both Player can choose a character. After that the
              first player will be selected at random. When the input box says
              Attack, the player can type a word, then the other player has to
              rember the word and try to copy it in their round.
            </p>
          </span>
        )}
        <VStack gap={"20px"}>
          <GameLogo />
          <Button
            size={"small"}
            onClick={() => {
              navigate("/setup");
            }}
          >
            START
          </Button>
          <span style={{ zIndex: "150" }}>
            <Button onClick={handleButtonClick}> How to Play</Button>
          </span>
        </VStack>
      </div>
    </VStack>
  );
};

export default Home;
