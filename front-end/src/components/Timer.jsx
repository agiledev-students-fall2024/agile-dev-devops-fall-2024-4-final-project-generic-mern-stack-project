import React, { useState, useEffect } from "react";
import "./Timer.css";

const Timer = ({ duration }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false); // To track if the timer is paused

  useEffect(() => {
    let interval = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      setIsActive(false); // Stop the timer when it hits zero
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false); // Ensure it's not marked as paused when starting
  };

  const handlePause = () => {
    setIsActive(false); // Pause the timer
    setIsPaused(true); // Mark it as paused
  };

  const handleResume = () => {
    if (isPaused) {
      setIsActive(true); // Resume the timer
      setIsPaused(false); // Clear the paused state
    }
  };

  const handleRestart = () => {
    setTimeLeft(duration); // Reset the timer to the original duration
    setIsActive(true); // Start the timer
    setIsPaused(false); // Clear the paused state
  };

  const progressWidth = (timeLeft / duration) * 100;

  return (
    <div className="timer-container">
      <h2 className= "timer-text">Time Left</h2>
      <div
        className="timer-bar"
        style={{ width: `100%`, backgroundColor: "white" }}
      >
        <div className="timer-bar" style={{ width: `${progressWidth}%` }}></div>
      </div>
      <div className="timer-text">{timeLeft}s</div>
      <div className="timer-controls">
        {!isActive && !isPaused && (
          <button onClick={handleStart} className="timer-button">
            Start
          </button>
        )}
        {isActive && (
          <button
            onClick={handlePause}
            className="timer-button"
            style={{ backgroundColor: "gray" }}
          >
            Pause
          </button>
        )}
        {!isActive && isPaused && (
          <button
            onClick={handleResume}
            className="timer-button"
            style={{ backgroundColor: "green" }}
          >
            Resume
          </button>
        )}
        <button
          onClick={handleRestart}
          className="timer-button"
          style={{ backgroundColor: "orange" }}
        >
          Restart
        </button>
      </div>
    </div>
  );
};

export default Timer;
