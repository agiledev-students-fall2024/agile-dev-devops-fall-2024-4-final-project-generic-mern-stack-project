const express = require('express');
const router = express.Router();

// TODO: create routes for map view once friends and currentuser routes are complete

router.get('/map'), (req, res) => {
    const { view } = req.query;
    try {
        if (view.includes('personal')) {
            
        }
        if (view.includes('friends')) {
            
        }
        
    } catch (error) {
        
    }
}

module.exports = router;