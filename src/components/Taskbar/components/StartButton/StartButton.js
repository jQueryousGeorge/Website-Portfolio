import React from "react";
import "./StartButton.scss";

const StartButton = () => {
  return (
    <button className="start-button">
      <div className="windows-logo">
        <div className="pane red"></div>
        <div className="pane green"></div>
        <div className="pane blue"></div>
        <div className="pane yellow"></div>
      </div>
      <span className="start-text">Start</span>
    </button>
  );
};

export default StartButton;
