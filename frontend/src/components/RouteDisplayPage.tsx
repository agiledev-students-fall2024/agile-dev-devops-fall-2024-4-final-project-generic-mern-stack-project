import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import StoreSearchBar from "./StoresSearchBar";
import MyStoresButton from "./MyStoresButton";
import sampleStores from "@/stores";
import SoHoMap from "./SoHoMap";

export default function RouteDisplayPage() {
  const navigate = useNavigate();

  const routeDisplay = sampleStores.map((route, index) => (
    <div
      key={route.id}
      className="flex justify-center items-center text-center border-2 border-gray-300 bg-gray-100 hover:bg-gray-200 rounded-md p-2 mb-1"
    >
      <span className="text-sm font-medium">{index + 1}. {route.name}</span>
    </div>
  ));

  const SaveButton = (
    <Button
      className="bg-green-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-600"
      onClick={() => console.log("To the save list modal")}
    >
      Save This List
    </Button>
  );

  const BackButton = (
    <Button
      className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-400"
      onClick={() => navigate("/")}
    >
      Back to Start
    </Button>
  );

  return (
    <div className="p-5">
      <div className="text-3xl font-bold mb-6 text-center">Your Shopping Route</div>

      <div className="mb-6">
        {routeDisplay}
      </div>

      <div className="flex justify-between">
        {SaveButton}
        {BackButton}
      </div>
    </div>
  );
}
