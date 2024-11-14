import React from "react";

function InputField({
  imgSrc = "",
  inputfieldName,
  inputType = "text",
  handleChange,
  inputValue,
  name
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
          type={inputType}
          id={inputfieldName}
          onChange={handleChange}
          value={inputValue}
          name={name} 
        />
        {/* </div> */}
      </div>
  );
}

export default InputField;
