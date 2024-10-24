import React from "react";
import "./InputField.css";
function InputField({
  imgSrc = "",
  inputfieldName,
  inputType = "text",
  handleChange,
}) {
  return (
    <>
      <div className="container">
        <div className="input">
          <img src={imgSrc} alt="" />

          <input
            className="input-box"
            type={inputType}
            placeholder={inputfieldName}
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );
}

export default InputField;
