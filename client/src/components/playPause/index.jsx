import React, { Component } from "react";
import { BUTTON_SMALL } from "../../utils/constants";
import Button from "../Button";

// Import your audio file
import song from "./PokemonCenter.mp3";

class PlayPauseButton extends Component {
  // Create state
  state = {
    // Get audio file in a variable
    audio: new Audio(song),

    // Set initial state of song
    isPlaying: false,
  };

  // Main function to handle both play and pause operations
  playPause = () => {
    // Get state of song
    let isPlaying = this.state.isPlaying;

    if (isPlaying) {
      // Pause the song if it is playing
      this.state.audio.pause();
    } else {
      // Play the song if it is paused
      this.state.audio.play();
    }

    // Change the state of song
    this.setState({ isPlaying: !isPlaying });
  };

  render() {
    return (
      <Button size="small" onClick={this.playPause}>
        Music &#128266;
      </Button>
    );
  }
}

export default PlayPauseButton;
