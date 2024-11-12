import React, { useState, useEffect } from "react";
import "./Timer.css";

const Timer = ({ duration }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleStart = () => {
    setIsActive(true);
    setTimeLeft(duration);
  };

  const progressWidth = (timeLeft / duration) * 100;

  return (
    <div className="timer-container">
      <div className="timer-bar" style={{ width: `${progressWidth}%` }}></div>
      <div className="timer-text">{timeLeft}s</div>
      <button onClick={handleStart} className="timer-button">
        Start
      </button>
    </div>
  );
};

export default Timer;
