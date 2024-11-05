import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import StoreSearchBar from "./StoresSearchBar";
import MyStoresButton from "./MyStoresButton";
import sampleStores from "@/stores";
import SoHoMap from "./SoHoMap";
import { useMyStores } from "@/context/StoresContext";

export default function Home() {
  const navigate = useNavigate();
  const { stores: userStores } = useMyStores();

  return (
    <main className="flex flex-col gap-10 px-5">
      <div className="flex flex-col gap-5">
        <StoreSearchBar stores={sampleStores} />
        <MyStoresButton />
      </div>

      <div className="flex flex-col gap-6">
        <div className="w-full h-[300px] border-2 border-black">
          <SoHoMap stores={sampleStores} type="Home" />
        </div>
        <Button
          className="rounded-3xl h-12 font-extrabold text-lg"
          onClick={() => navigate("/suggest")}
        >
          Suggest Stores For Me
        </Button>
        <Button
          className="rounded-3xl h-12 font-extrabold text-lg"
          onClick={() => navigate("/route")}
          disabled={userStores.length === 0}
        >
          Generate Route
        </Button>
        <Button
          className="rounded-3xl h-12 font-extrabold text-lg"
          onClick={() => navigate("/saved-routes")}
        >
          Saved Routes
        </Button>
        <Button
          className="rounded-3xl bg-red-400 hover:bg-red-600 border-red-500 h-12 font-extrabold text-lg text-white"
          onClick={() => navigate("/help")}
        >
          Help
        </Button>
      </div>
    </main>
  );
}
