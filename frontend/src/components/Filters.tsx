import PriceRangeFilters from "./PriceRangeFilters";
import { useMyStores } from "@/context/StoresContext";
import type { FiltersType } from "@/types";

type Props = {
  toggleFilterURL: (filterType: string, value: string) => void;
  currentFilter: string;
  handleSearchURL: (filter: string, searchValue: string) => void;
  getFilterValuesFromURL: (filterType: string) => string[];
};

export default function Filters({ currentFilter, toggleFilterURL }: Props) {
  const { toggleFilter } = useMyStores();

  const handleFilterClick = (
    filter: keyof FiltersType,
    filterValue: string,
  ) => {
    toggleFilter(filter, filterValue);
    toggleFilterURL(filter, filterValue);
  };

  if (currentFilter === "Price Range")
    return <PriceRangeFilters handleFilterClick={handleFilterClick} />;
  else if (currentFilter === "Brand") return <div>brand filters</div>;
  else if (currentFilter === "Category") return <div>category filters</div>;
}
