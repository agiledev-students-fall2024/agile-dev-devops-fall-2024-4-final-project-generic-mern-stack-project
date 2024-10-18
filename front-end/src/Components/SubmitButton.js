import React from "react";
import "./SubmitButton.css";
function SubmitButton({ placeholder }) {
  function handleClick() {
    console.log("the button is clicked");
  }
  return <button onClick={handleClick}>{placeholder}</button>;
}
export default SubmitButton;
