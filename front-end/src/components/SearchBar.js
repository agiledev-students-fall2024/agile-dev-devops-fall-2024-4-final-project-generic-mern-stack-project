import React, { useState } from "react";
//import "./SearchBar.css";
import SubmitButton from "./SubmitButton";
import { BsSearchHeart } from "react-icons/bs";
import SearchResults from "../pages/SearchResults";

//searchItems is the data provided by mockaroo (for community)
const SearchBar = ({ searchItems }) => {
  const [searchInput, setsearchInput] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setsearchInput(e.target.value);
  }

  return (
    <div className="flex flex-row justify-center w-[85%] grow">
      <input
        className="px-3 py-2 grow-0 w-[90%] bg-lavender_blush-900 text-ebony font-bold rounded-md placeholder-rose-600 rounded-r-none"
        type="text"
        placeholder="Search Communities..."
        onChange={handleChange}
        value={searchInput}
      />
      <button className="rounded-md bg-ebony-700 text-rose-700 hover:text-ebony-700 hover:bg-rose-700 font-bold px-2 w-[8%] flex flex-col justify-center items-center rounded-l-none">
        <BsSearchHeart size={24}/>
      </button>
      <SearchResults input={searchInput} items={searchItems}/>
    </div>
  )
}
export default SearchBar;
