// Import express and axios
import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get("/api/home", async (req, res) => {
    try {
        
        const mockAPIUrl = 'https://my.api.mockaroo.com/posts.json?key=3ac6ebb0';

        // Fetch data from Mockaroo
        const response = await axios.get(mockAPIUrl);

        // Send the data as a JSON response
        res.json(response.data);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message,
            status: "Failed to retrieve posts from Mockaroo."
        });
    }
});

export default router;
