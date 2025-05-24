import React from "react";
import "./StartButton.scss";

const StartButton = () => {
  return (
    <button className="start-button">
      <div className="windows-logo">
        <div className="window-pane top-left"></div>
        <div className="window-pane top-right"></div>
        <div className="window-pane bottom-left"></div>
        <div className="window-pane bottom-right"></div>
      </div>
      <span className="start-text">Start</span>
    </button>
  );
};

export default StartButton;
