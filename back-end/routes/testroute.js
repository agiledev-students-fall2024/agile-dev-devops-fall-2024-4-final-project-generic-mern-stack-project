const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // hardcoded message
    const data = {
        message: 'Hello World!'
    };
    res.json(data);
});

module.exports = router;

