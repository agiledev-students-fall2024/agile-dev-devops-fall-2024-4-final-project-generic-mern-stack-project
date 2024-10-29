import sampleStores from "@/stores";
import { SavedRoute } from "@/types";
import UpdateSavedRouteButton from "./UpdateSavedRouteButton";
import CopyLinkButton from "./CopyLinkButton";
import DeleteRouteButton from "./DeleteRouteButton";

const sampleSavedRoutes: SavedRoute[] = [
  {
    id: "1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit at alias natus nostrum quas assumenda inventore animi perferendis sequi. Quos eligendi sapiente error alias aspernatur dolores eum, voluptas possimus quaerat!",
    name: "saved route 1",
    stores: sampleStores,
  },
  {
    id: "2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit at alias natus nostrum quas assumenda inventore animi perferendis sequi. Quos eligendi sapiente error alias aspernatur dolores eum, voluptas possimus quaerat!",
    name: "saved route 2",
    stores: sampleStores,
  },
];

export default function SavedRoutesPage() {
  const savedRoutes = sampleSavedRoutes.map((route) => (
    <div
      key={route.id}
      className="flex justify-between border-2 bg-green-200 hover:bg-green-300  border-green-400 rounded-sm p-2"
    >
      <div className="flex flex-col gap-2">
        <span className="text-2xl font-semibold">{route.name}</span>
        <div className="text-sm">{route.description}</div>
        <div className="text-xs text-wrap">
          {route.stores.slice(0, 3).map((store, i) => (
            <span key={store._id} className=" font-light">
              {store.name}, {i === 2 && route.stores.length > 3 ? "..." : ""}
            </span>
          ))}
        </div>
      </div>
      <div className="flex gap-2 my-auto">
        <CopyLinkButton routeId={route.id} />
        <UpdateSavedRouteButton route={route} />
        <DeleteRouteButton route={route} />
      </div>
    </div>
  ));

  return (
    <div className="p-5">
      <div className="text-3xl font-bold mb-8">Your Saved Routes</div>
      <div className="flex flex-col gap-5">{savedRoutes}</div>
    </div>
  );
}
