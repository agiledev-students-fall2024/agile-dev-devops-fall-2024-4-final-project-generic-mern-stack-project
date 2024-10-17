import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMyStores } from "@/context/StoresContext";
import { FiltersType } from "@/types";
import { FilterStringTypes } from "@/types";

const filterDescriptions: Record<FilterStringTypes, string> = {
  Brand: "brand desc",
  "Price Range": "price range desc",
  Category: "category desc",
};

const filterToCamelCase: Record<FilterStringTypes, keyof FiltersType> = {
  Brand: "brand",
  "Price Range": "priceRange",
  Category: "category",
};

const filterNames: FilterStringTypes[] = ["Brand", "Price Range", "Category"];

export default function FilterPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentFilter, setCurrentFilter] =
    useState<FilterStringTypes>("Brand");
  const { clearFilters, toggleFilter, filters } = useMyStores();

  const navigate = useNavigate();

  const handleClearFilters = () => {
    clearFilters(currentFilter);
    const currentParams = new URLSearchParams(searchParams);
    // delete the filter in the URL
    currentParams.delete(filterToCamelCase[currentFilter]);
    setSearchParams(currentParams);
  };

  return (
    <div className="flex">
      <nav className="w-32 bg-blue-400 overflow-y-auto h-[calc(100vh-68px)]">
        <ul className="divide-y divide-black">
          {filterNames.map((filter) => (
            <li
              key={filter}
              onClick={() => setCurrentFilter(filter)}
              className={`${filter === currentFilter ? "bg-green-600 font-extrabold text-2xl" : "hover:bg-blue-500 text-xl"} p-4 py-8 font-bold cursor-pointer`}
            >
              {filter}
            </li>
          ))}
        </ul>
      </nav>
      <main className="flex-1 p-6 overflow-y-auto h-fit max-h-[calc(100vh-68px)]">
        <h1 className="text-3xl font-bold mb-4">{currentFilter}</h1>
        <p className="text-gray-600 mb-6">
          {filterDescriptions[currentFilter]}
        </p>
        <Button
          onClick={handleClearFilters}
          className="mb-5"
          variant={"destructive"}
        >
          Clear Filters
        </Button>

        <div className="my-8">
          <Button variant={"secondary"} onClick={() => navigate("/")}>
            Go Back
          </Button>
        </div>
      </main>
    </div>
  );
}
