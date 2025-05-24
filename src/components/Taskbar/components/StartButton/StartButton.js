import React from "react";
// import "../../Taskbar.scss";
import "./StartButton.scss";

const StartButton = () => {
  return (
    <div className="startbutton-left">
      <div className="startbutton-button">
        <button className="start-button">
          <img src="/start-icon.jpg" alt="" className="start-icon" />
        </button>
      </div>
    </div>
  );
};

export default StartButton;
