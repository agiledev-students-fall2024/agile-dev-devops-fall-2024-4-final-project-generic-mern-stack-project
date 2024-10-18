import React, { useState } from "react";
import "./InputField.css";
import SubmitButton from "./SubmitButton";
function SearchBar({ SearchBarName }) {
  const [searchInput, setsearchInput] = useState("");
  function handleChange(e) {
    e.preventDefault();
    setsearchInput(e.target.value);
  }
  return (
    <>
      <div>
        <input
          type="text"
          placeholder="example search input"
          onChange={handleChange}
          value={searchInput}
        />
        <SubmitButton placeholder="Search" />
      </div>
    </>
  );
}
export default SearchBar;
