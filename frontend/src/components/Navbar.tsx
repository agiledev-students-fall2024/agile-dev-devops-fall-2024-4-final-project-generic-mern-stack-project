import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="w-1/3"></div>

        <div className="w-1/3 flex justify-center">
          <div className="text-white text-2xl font-bold">LOGO</div>
        </div>

        <div className="w-1/3 flex justify-end">
          <Button
            variant={"destructive"}
            onClick={() => console.log("logging out")}
          >
            Log Out
          </Button>
        </div>
      </div>
    </nav>
  );
}
