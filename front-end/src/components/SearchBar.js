import React, { useState } from "react";
//import "./SearchBar.css";
import SubmitButton from "./SubmitButton";
import { BsSearchHeart } from "react-icons/bs";

function SearchBar({ SearchBarName }) {
  const [searchInput, setsearchInput] = useState("");
  function handleChange(e) {
    e.preventDefault();
    setsearchInput(e.target.value);
  }
  return (
    <div className="flex flex-row justify-center w-[85%]">
      <input
        className="h-10 px-3 py-2 grow-0 w-[90%] bg-lavender_blush-900 text-ebony font-bold rounded-md placeholder-rose-600 rounded-r-none"
        type="text"
        placeholder="Search..."
        onChange={handleChange}
        value={searchInput}
      />
      <button className="h-10 rounded-md bg-ebony-700 text-rose-700 hover:text-ebony-700 hover:bg-rose-700 font-bold px-2 w-[8%] flex flex-col justify-center items-center rounded-l-none">
        <BsSearchHeart size={24}/>
      </button>
    </div>
  );
}
export default SearchBar;
