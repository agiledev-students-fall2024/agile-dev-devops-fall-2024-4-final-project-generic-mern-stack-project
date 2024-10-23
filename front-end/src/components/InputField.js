import React from "react";
import "./InputField.css";
function InputField({ imgSrc = "", inputfieldName, inputType = "text" }) {
  return (
    <>
      <div className="container">
        <div className="input">
          <img src={imgSrc} alt="" />

          <input
            className="input-box"
            type={inputType}
            placeholder={inputfieldName}
          />
        </div>
      </div>
    </>
  );
}

export default InputField;
