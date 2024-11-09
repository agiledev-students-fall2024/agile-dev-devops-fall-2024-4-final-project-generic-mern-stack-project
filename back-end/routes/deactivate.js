// import and instantiate express
import express from 'express'
const router = express.Router();

router.post("/api/deactivate", async (req, res) => {
    console.log('User deactivated successfully')

    // find user based on id in database and drop
    // search all collections and drop if id = deactivated user id
});

export default router