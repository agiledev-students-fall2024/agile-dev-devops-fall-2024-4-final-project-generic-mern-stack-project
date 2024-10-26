import React, { useState } from "react";
import "./InputField.css";
function InputField({
  imgSrc = "",
  inputfieldName,
  inputType = "text",
  handleChange,
  inputValue,
}) {
  // const [value, setValue] = useState("");
  // const handleChange = (event) => {
  //   setValue(event.target.value);
  //   // if (props.onChange) {
  //   //   props.onChange(event);
  //   // }
  // };
  return (
    <>
      <div className="input-container">
        {/* <div className="input"> */}
        {/* <img src={imgSrc} alt="" /> */}
        <label>{inputfieldName}</label>
        <input
          className="input"
          // className="input-box"
          type={inputType}
          id={inputfieldName}
          // placeholder={inputfieldName}
          onChange={handleChange}
          value={inputValue}
        />
        {/* </div> */}
      </div>
    </>
  );
}

export default InputField;
