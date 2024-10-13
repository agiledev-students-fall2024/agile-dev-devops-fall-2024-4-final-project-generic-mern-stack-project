import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import StoreSearchBar from "./StoresSearchBar";
import type { Store } from "@/types";
import MyStoresButton from "./MyStoresButton";

// sample stores
const stores: Store[] = [
  {
    _id: "1",
    name: "Uniqlo",
    priceRange: "Budget",
    category: "Clothing",
    description: "Japanese casual wear designer, manufacturer and retailer",
    image:
      "https://corporate.target.com/getmedia/d2441ab3-7b0b-4bff-9a6f-15df4690559d/New-Stores_Header_Target.png?width=620",
    brand: "Uniqlo",
  },
  {
    _id: "2",
    name: "Supreme",
    priceRange: "Premium",
    category: "Streetwear",
    description: "Iconic streetwear brand with limited edition drops",
    image:
      "https://corporate.target.com/getmedia/d2441ab3-7b0b-4bff-9a6f-15df4690559d/New-Stores_Header_Target.png?width=620",
    brand: "Supreme",
  },
  {
    _id: "3",
    name: "Apple Store",
    priceRange: "Premium",
    category: "Electronics",
    description: "Flagship store for Apple products and services",
    image:
      "https://corporate.target.com/getmedia/d2441ab3-7b0b-4bff-9a6f-15df4690559d/New-Stores_Header_Target.png?width=620",
    brand: "Apple",
  },
  {
    _id: "4",
    name: "Bloomingdale's",
    priceRange: "Luxury",
    category: "Department Store",
    description: "Upscale department store with designer collections",
    image:
      "https://corporate.target.com/getmedia/d2441ab3-7b0b-4bff-9a6f-15df4690559d/New-Stores_Header_Target.png?width=620",
    brand: "Bloomingdale's",
  },
  {
    _id: "5",
    name: "Aritzia",
    priceRange: "Premium",
    category: "Womenswear",
    description: "Canadian fashion house and retailer of exclusive brands",
    image:
      "https://corporate.target.com/getmedia/d2441ab3-7b0b-4bff-9a6f-15df4690559d/New-Stores_Header_Target.png?width=620",
    brand: "Aritzia",
  },
  {
    _id: "6",
    name: "MoMA Design Store",
    priceRange: "Premium",
    category: "Lifestyle & Gifts",
    description: "Curated collection of modern and contemporary design objects",
    image:
      "https://corporate.target.com/getmedia/d2441ab3-7b0b-4bff-9a6f-15df4690559d/New-Stores_Header_Target.png?width=620",
    brand: "MoMA",
  },
  {
    _id: "7",
    name: "Allsaints",
    priceRange: "Premium",
    category: "Clothing",
    description:
      "British fashion retailer known for its edgy, vintage-inspired designs",
    image:
      "https://corporate.target.com/getmedia/d2441ab3-7b0b-4bff-9a6f-15df4690559d/New-Stores_Header_Target.png?width=620",
    brand: "Allsaints",
  },
  {
    _id: "8",
    name: "Kith",
    priceRange: "Premium",
    category: "Footwear",
    description:
      "Multifunctional lifestyle brand for footwear, apparel and accessories",
    image:
      "https://corporate.target.com/getmedia/d2441ab3-7b0b-4bff-9a6f-15df4690559d/New-Stores_Header_Target.png?width=620",
    brand: "Kith",
  },
  {
    _id: "9",
    name: "Crate & Barrel",
    priceRange: "Premium",
    category: "Home Decor",
    description: "Modern furniture, home decor and kitchenware",
    image:
      "https://corporate.target.com/getmedia/d2441ab3-7b0b-4bff-9a6f-15df4690559d/New-Stores_Header_Target.png?width=620",
    brand: "Crate & Barrel",
  },
  {
    _id: "10",
    name: "Sephora",
    priceRange: "Premium",
    category: "Beauty & Cosmetics",
    description: "Multinational chain of personal care and beauty stores",
    image:
      "https://corporate.target.com/getmedia/d2441ab3-7b0b-4bff-9a6f-15df4690559d/New-Stores_Header_Target.png?width=620",
    brand: "Sephora",
  },
];

export default function Home() {
  const navigate = useNavigate();
  return (
    <main className="flex flex-col gap-10 px-5">
      <div className="flex flex-col gap-5">
        <StoreSearchBar stores={stores} />
        <MyStoresButton />
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
