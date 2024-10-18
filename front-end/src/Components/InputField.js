import React from "react";
import "./InputField.css";
function InputField({ imgSrc = "", inputfieldName, inputType = "text" }) {
  return (
    <div className="input">
      <img src={imgSrc} alt="" />
      <div>{inputfieldName}</div>
      <input type={inputType} />
    </div>
  );
}

export default InputField;
