import { Outlet } from "react-router-dom";
import { BGMUSIC, BG_GAME, JOY_IMAGE } from "../../utils/constants";
import PlayPauseButton from "../playPause";
import "./Layout.css";
let audio = new Audio("bg/PokemonCenter.mp3");

const Layout = () => {
  return (
    <div>
      <div
        style={{
          position: "absolute",
          zIndex: "-100",
          backgroundImage: "url(/bg/synth-bg.jpg)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100vw",
          height: "100vh",
        }}
      />
      <PlayPauseButton>&#10003;</PlayPauseButton>
      <div className="joy-image">
        <img src={JOY_IMAGE} width="100%" />
        <div className="game">
          <img
            src={BG_GAME}
            width="100%"
            style={{ position: "absolute", zIndex: -100 }}
          />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
