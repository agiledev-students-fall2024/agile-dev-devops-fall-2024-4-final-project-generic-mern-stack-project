import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { Store } from "@/types";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import StoreItem from "./StoreItem";

function StoreList({
  stores,
  highlightedStores = [],
  heading = undefined,
}: {
  stores: Store[];
  highlightedStores?: Store[];
  heading?: string;
}) {
  return (
    <Command>
      <CommandInput placeholder="Search stores..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {highlightedStores.length > 0 && (
          <CommandGroup heading={heading}>
            {highlightedStores.map((store) => (
              <CommandList key={store._id}>
                <StoreItem type="search" store={store} />
              </CommandList>
            ))}
          </CommandGroup>
        )}
        <CommandGroup heading="All Stores">
          {stores.map((store) => (
            <CommandList key={store._id}>
              <StoreItem type="search" store={store} />
            </CommandList>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

interface StoreSearchBarProps {

  stores: Store[];
}

export default function StoreSearchBar({ stores: initialStores }: StoreSearchBarProps) {
  const [open, setOpen] = useState(false);
  const [stores, setStores] = useState<Store[]>(initialStores);
  const [suggestedStores, setSuggestedStores] = useState<Store[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {  // <-- useEffect to fetch stores from backend
    fetch("http://localhost:3002/stores")
      .then((response) => response.json())
      .then((data) => setStores(data))
      .catch((error) => console.error("Error fetching stores:", error));
  }, []);

  useEffect(() => {
    const openSearchBar = location.state?.openSearchBar || false;
    const newSuggestedStores = location.state?.suggestedStores || [];

    if (openSearchBar) {
      setOpen(true);
      setSuggestedStores(newSuggestedStores);
      // Clear the state after opening the search bar
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, location.pathname]);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className={cn("justify-between w-60 m-auto mt-10")}
          >
            Search Stores
            <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <StoreList
            stores={stores}
            highlightedStores={suggestedStores}
            heading="Suggested Stores"
          />
        </PopoverContent>
      </Popover>
    </>
  );
}
