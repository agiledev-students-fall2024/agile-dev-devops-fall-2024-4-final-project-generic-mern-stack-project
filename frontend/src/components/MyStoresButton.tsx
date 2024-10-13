import { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Store } from "@/types";
import { StoreIcon, Trash } from "lucide-react";

function StatusList({ stores }: { stores: Store[] }) {
  return (
    <Command>
      <CommandInput placeholder="Search stores..." />
      <CommandList>
        {/* TODO: add confirm button */}
        {stores.length > 0 && (
          <Button variant={"destructive"} className="my-2 font-light">
            <Trash className="w-[15px] mr-1" />
            Clear
          </Button>
        )}
        <CommandEmpty>You have not added any stores.</CommandEmpty>
        <CommandGroup>
          {stores.map((store) => (
            <CommandList key={store._id}></CommandList>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export default function MyStoresButton() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            role="combobox"
            className={cn(
              "m-auto rounded-3xl bg-green-600 border-green-700 text-white hover:bg-green-700 hover:text-slate-200",
            )}
          >
            <StoreIcon />
            <span className="ml-2 text-lg py-[2px] font-extrabold">
              no. of stores
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          {isDesktop ? (
            <StatusList stores={[]} />
          ) : (
            <Drawer open={open} onOpenChange={setOpen}>
              <DrawerContent>
                <div className="mt-4 border-t">
                  <StatusList stores={[]} />
                </div>
              </DrawerContent>
            </Drawer>
          )}
        </PopoverContent>
      </Popover>
    </>
  );
}
