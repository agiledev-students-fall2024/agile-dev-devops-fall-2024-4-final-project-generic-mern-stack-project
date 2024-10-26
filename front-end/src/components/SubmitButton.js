import React from "react";
//import "./SubmitButton.css";
import { Link } from "react-router-dom";
function SubmitButton({ placeholder, link, handleClick }) {
  // function handleClick() {
  //   console.log("the button is clicked");
  // }
  return (
    <div className="w-[80%] my-2">
      {/* <Link to={link}> */}
      <button className="w-[100%] bg-ebony border-ebony rounded-lg text-rose font-semibold hover:bg-rose hover:text-ebony hover:border-rose" onClick={handleClick}>
        {placeholder}
      </button>
      {/* </Link> */}
    </div>
  );
}
export default SubmitButton;
