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
    // toggle filter in react context and its query parameter
    toggleFilter(filter, filterValue);
    toggleFilterURL(filter, filterValue);
  };

  if (currentFilter === "Price Range") return <div>price range filters</div>;
  else if (currentFilter === "Brand") return <div>brand filters</div>;
  else if (currentFilter === "Category") return <div>category filters</div>;
}
