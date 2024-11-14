import PriceRangeFilters from "./PriceRangeFilters";
import FiltersWithSearch from "./FiltersWithSearch";
import RatingFilters from "./RatingFilters";
import { useMyStores } from "@/context/StoresContext";
import type { FiltersType } from "@/types";
import { useState, useEffect } from "react";

type Props = {
  toggleFilterURL: (filterType: string, value: string) => void;
  currentFilter: string;
  handleSearchOrRatingURL: (filter: string, searchValue: string) => void;
  getFilterValuesFromURL: (filterType: string) => string[];
};

export default function Filters({
  currentFilter,
  toggleFilterURL,
  handleSearchOrRatingURL,
  getFilterValuesFromURL,
}: Props) {
  const { toggleFilter } = useMyStores();
  const [brandFilters, setBrandFilters] = useState<string[]>([]);
  const [categoryFilters, setCategoryFilters] = useState<string[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/filters")
      .then((response) => response.json())
      .then((data) => {
        setBrandFilters(data.brands);
        setCategoryFilters(data.categories);
      })
      .catch((error) => console.error("Error fetching filters:", error));
  }, []);

  const handleFilterClick = (
    filter: keyof FiltersType,
    filterValue: string,
  ) => {
    // toggle both the filter context and its search param
    toggleFilter(filter, filterValue);
    toggleFilterURL(filter, filterValue);
  };

  if (currentFilter === "Price Range")
    return <PriceRangeFilters handleFilterClick={handleFilterClick} />;
  else if (currentFilter === "Rating")
    return <RatingFilters handleRatingURL={handleSearchOrRatingURL} />;
  else if (currentFilter === "Brand")
    return (
      <FiltersWithSearch
        handleFilterClick={handleFilterClick}
        handleSearchURL={handleSearchOrRatingURL}
        urlFilterParam="brand"
        urlSearchParam="brandSearch"
        filters={brandFilters}
        savedSearch={getFilterValuesFromURL("brandSearch")[0] || ""}
        placeholder="Search brands..."
      />
    );
  else if (currentFilter === "Category")
    return (
      <FiltersWithSearch
        key={"category"}
        handleFilterClick={handleFilterClick}
        handleSearchURL={handleSearchOrRatingURL}
        urlFilterParam="category"
        urlSearchParam="categorySearch"
        filters={categoryFilters}
        savedSearch={getFilterValuesFromURL("categorySearch")[0] || ""}
        placeholder="Search categories..."
      />
    );
}

