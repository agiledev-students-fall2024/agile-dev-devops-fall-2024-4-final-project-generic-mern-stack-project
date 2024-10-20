import React from "react";
import "./SubmitButton.css";
function SubmitButton({ placeholder }) {
  function handleClick() {
    console.log("the button is clicked");
  }
  return (
    <div className="submit-btn-div">
      <button className="submit-btn" onClick={handleClick}>
        {placeholder}
      </button>
    </div>
  );
}
export default SubmitButton;
