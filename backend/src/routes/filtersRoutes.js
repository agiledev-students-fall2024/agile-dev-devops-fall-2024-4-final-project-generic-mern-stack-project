import express from "express";
const router = express.Router();

// Hardcoded filters for brands and categories
const brandFilters = [
    "Apple",
    "Aesop",
    "Balenciaga",
    "Burberry",
    "Chanel",
    "Celine",
    "Diesel",
    "Dolce & Gabbana",
    "Gucci",
    "Glossier",
    "Hermès",
    "Isabel Marant",
    "John Varvatos",
    "Kith",
    "Lululemon",
    "Louis Vuitton",
    "Moncler",
    "Nike",
    "Off-White",
    "Prada",
    "Rag & Bone",
    "Ralph Lauren",
    "Saint Laurent",
    "Stüssy",
    "Supreme",
    "The North Face",
    "Tiffany & Co.",
    "Uniqlo",
    "Valentino",
    "Vans",
    "Versace",
    "Zimmermann"
];

const categoryFilters = [
    "Designer Boutiques",
    "Vintage Clothing",
    "Contemporary Art Galleries",
    "Streetwear Shops",
    "High-End Furniture",
    "Trendy Accessories",
    "Luxury Jewelry",
    "Indie Bookstores",
    "Artisanal Coffee Shops",
    "Gourmet Food Markets",
    "Concept Stores",
    "Sustainable Fashion",
    "Beauty & Cosmetics",
    "Home Decor & Design",
    "Specialty Sneaker Stores",
    "Avant-Garde Fashion",
    "Handcrafted Jewelry",
    "Organic Skincare",
    "Pop-Up Shops",
    "Vinyl Record Stores",
    "Athleisure Brands",
    "Lifestyle & Gift Boutiques",
    "Bespoke Tailors",
    "Artisan Chocolatiers",
    "Designer Eyewear",
    "Craft Cocktail Bars",
    "Niche Perfumeries",
    "Curated Vintage Shops",
    "Tech & Gadget Stores",
    "Upscale Consignment Shops"
];

// Define the GET route to fetch filters data
router.get("/", (req, res) => {
  res.json({ brands: brandFilters, categories: categoryFilters });
});

export default router;

