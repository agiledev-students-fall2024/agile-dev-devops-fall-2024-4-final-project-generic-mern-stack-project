// import and instantiate express
import express from 'express';
const router = express.Router();

router.post("/api/post", async (req, res) => {
    try {
        const { postContent, selectedOption } = req.body;
        // Log the received data for debugging
        console.log("Post Content:", postContent);
        console.log("Selected Community:", selectedOption);

        res.status(200).json({
            message: "Post received successfully",
            data: {
                postContent,
                selectedOption
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message,
            status: "Failed to handle post submission."
        });
    }
});

export default router;
