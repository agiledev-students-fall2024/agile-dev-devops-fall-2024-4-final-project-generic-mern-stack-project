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
    address: "123 Fashion St, New York, NY 10001",
    reviews: [
      "5_Excellent quality basics at affordable prices. The store layout is clean and easy to navigate._Fashion Enthusiast",
      "4_Great for essentials, but sometimes sizes run out quickly._Casual Shopper",
    ],
    categories: ["Clothing", "Accessories"],
    priceRange: "Budget",
    description: "Japanese casual wear designer, manufacturer and retailer",
    photos: Array(5).fill(
      "https://corporate.target.com/getmedia/d2441ab3-7b0b-4bff-9a6f-15df4690559d/New-Stores_Header_Target.png?width=620",
    ),
    brand: "Uniqlo",
    rating: 4.5,
    googleMapsURI: "https://www.google.com",
    phoneNumber: "+1 (212) 555-1234",
    paymentOptions: {
      acceptsCashOnly: "false",
      acceptsCreditCards: "true",
      acceptsDebitCards: "true",
      acceptsNFC: "true",
    },
    openingHours:
      "Monday: 9:30 AM – 5:00 PM\nTuesday: 9:30 AM – 5:00 PM\nWednesday: 9:30 AM – 5:00 PM\nThursday: 9:30 AM – 5:00 PM\nFriday: 9:30 AM – 5:00 PM\nSaturday: 9:30 AM – 5:00 PM\nSunday: 9:30 AM – 5:00 PM",
    ratingCount: 1000,
    websiteURI: "https://www.google.com",
  },
  {
    _id: "2",
    name: "Supreme",
    address: "456 Hype Ave, New York, NY 10002",
    reviews: [
      "5_The ultimate streetwear destination. Limited drops are always exciting._Streetwear Fanatic",
      "3_Cool products but the hype can be overwhelming._Casual Observer",
    ],
    categories: ["Streetwear", "Accessories"],
    priceRange: "Premium",
    description: "Iconic streetwear brand with limited edition drops",
    photos: Array(5).fill(
      "https://corporate.target.com/getmedia/d2441ab3-7b0b-4bff-9a6f-15df4690559d/New-Stores_Header_Target.png?width=620",
    ),
    brand: "Supreme",
    rating: 4.2,
    googleMapsURI: "https://www.google.com",
    phoneNumber: "+1 (212) 555-5678",
    paymentOptions: {
      acceptsCashOnly: "false",
      acceptsCreditCards: "true",
      acceptsDebitCards: "true",
      acceptsNFC: "true",
    },
    openingHours:
      "Monday: 9:30 AM – 5:00 PM\nTuesday: 9:30 AM – 5:00 PM\nWednesday: 9:30 AM – 5:00 PM\nThursday: 9:30 AM – 5:00 PM\nFriday: 9:30 AM – 5:00 PM\nSaturday: 9:30 AM – 5:00 PM\nSunday: 9:30 AM – 5:00 PM",
    ratingCount: 800,
    websiteURI: "https://www.google.com",
  },
  // ... (Similarly update the remaining stores)
  {
    _id: "10",
    name: "Sephora",
    address: "789 Beauty Blvd, New York, NY 10010",
    reviews: [
      "5_Heaven for beauty lovers! Great selection and helpful staff._Makeup Enthusiast",
      "4_Good variety but can be pricey. Love the samples though!_Beauty Novice",
    ],
    categories: ["Beauty", "Cosmetics", "Skincare"],
    priceRange: "Premium",
    description: "Multinational chain of personal care and beauty stores",
    photos: Array(5).fill(
      "https://corporate.target.com/getmedia/d2441ab3-7b0b-4bff-9a6f-15df4690559d/New-Stores_Header_Target.png?width=620",
    ),
    brand: "Sephora",
    rating: 4.7,
    googleMapsURI: "https://www.google.com",
    phoneNumber: "+1 (212) 555-9012",
    paymentOptions: {
      acceptsCashOnly: "false",
      acceptsCreditCards: "true",
      acceptsDebitCards: "true",
      acceptsNFC: "true",
    },
    openingHours:
      "Monday: 9:30 AM – 5:00 PM\nTuesday: 9:30 AM – 5:00 PM\nWednesday: 9:30 AM – 5:00 PM\nThursday: 9:30 AM – 5:00 PM\nFriday: 9:30 AM – 5:00 PM\nSaturday: 9:30 AM – 5:00 PM\nSunday: 9:30 AM – 5:00 PM",
    ratingCount: 1200,
    websiteURI: "https://www.google.com",
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
