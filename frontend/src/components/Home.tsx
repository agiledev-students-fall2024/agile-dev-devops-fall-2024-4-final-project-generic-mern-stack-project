import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import StoreSearchBar from "./StoresSearchBar";
import type { Store } from "@/types";

// sample stores
const stores: Store[] = Array.from({ length: 10 }, () => ({
  _id: "1",
  name: "Store A",
  priceRange: "Budget",
  category: "A",
  description: "a desc",
  image:
    "https://corporate.target.com/getmedia/d2441ab3-7b0b-4bff-9a6f-15df4690559d/New-Stores_Header_Target.png?width=620",
  brand: "Brand A",
}));

export default function Home() {
  const navigate = useNavigate();
  return (
    <main className="flex flex-col gap-10 px-5">
      <div className="flex flex-col gap-5">
        <StoreSearchBar stores={stores} />
        <div>my stores button</div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="w-full h-[300px] border-2 border-black">
          map placeholder
        </div>
        <Button
          className="rounded-3xl bg-blue-400 hover:bg-blue-600 border-blue-500 h-12 font-extrabold text-lg text-white"
          onClick={() => navigate("/suggest")}
        >
          Suggest Stores For Me
        </Button>
      </div>
    </main>
  );
}
