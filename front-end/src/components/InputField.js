import React, { useState } from "react";
//import "./InputField.css";
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
      <div className="flex flex-col gap-1 w-full">
        {/* <div className="input"> */}
        {/* <img src={imgSrc} alt="" /> */}
        <label className="text-sm text-ebony-700 font-bold">
          {inputfieldName}
        </label>
        <input
          className="bg-lavender_blush-900 rounded-md px-2 py-1 text-md text-ebony w-full"
          // className="input-box"
          type={inputType}
          id={inputfieldName}
          // placeholder={inputfieldName}
          onChange={handleChange}
          value={inputValue}
        />
        {/* </div> */}
      </div>
  );
}

export default InputField;
