// Import express
import express from 'express';

const router = express.Router();

router.get("/api/home", async (req, res) => {
    try {
        // Hardcoded mock data structured to match the BlogPost component
        const posts = [
            {
                id: 1,
                profilePic: "https://picsum.photos/201",
                name: "Jane Doe",
                userName: "jane_doe",
                text: "Exploring ways to live sustainably in urban environments.",
                likes: 152,
                images: ["https://picsum.photos/202"]
            },
            {
                id: 2,
                profilePic: "https://picsum.photos/203",
                name: "John Smith",
                userName: "john_smith",
                text: "Building trust and support within your local community.",
                likes: 89,
                images: ["https://picsum.photos/204", "https://picsum.photos/205"]
            },
            {
                id: 3,
                profilePic: "https://picsum.photos/206",
                name: "Emily Chen",
                userName: "emily_chen",
                text: "Sharing my favorite recipes from around the world!",
                likes: 47,
                images: []
            }
        ];
        
        res.json(posts);  // Send the hardcoded posts as JSON response
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message,
            status: "Failed to retrieve posts from hardcoded data."
        });
    }
});

export default router;
