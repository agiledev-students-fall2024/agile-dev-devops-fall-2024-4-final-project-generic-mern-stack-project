// import and instantiate express
import express from 'express';
const router = express.Router();

router.get("/api/home", async (req, res) => {
    try {
        // Mock data structured to match the BlogPost component
        const posts = [
            {
                id: 1,
                profilePic: "https://via.placeholder.com/150",
                name: "Jane Doe",
                userName: "jane_doe",
                text: "Exploring ways to live sustainably in urban environments.",
                likes: 152,
                images: ["https://via.placeholder.com/400"]
            },
            {
                id: 2,
                profilePic: "https://via.placeholder.com/150",
                name: "John Smith",
                userName: "john_smith",
                text: "Building trust and support within your local community.",
                likes: 89,
                images: ["https://via.placeholder.com/400", "https://via.placeholder.com/400"]
            },
            // Add more mock posts?
        ];
        res.json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message,
            status: "Failed to retrieve posts for the home page."
        });
    }
});

export default router;
