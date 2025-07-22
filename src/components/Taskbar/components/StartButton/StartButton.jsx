import React from "react";
import "./StartButton.scss";
import windows95Logo from "../../../../assets/images/windows-95-logo.png";

const StartButton = () => {
  return (
    <button className="start-button">
      <img src={windows95Logo} alt="Windows 95 Logo" className="windows-logo" />
      <span className="start-text">Start</span>
    </button>
  );
};

export default StartButton;