const express = require('express');
const router = express.Router();

// routes or middleware

router.get('/json-example', (req, res) => {
    const body = {
      title: 'Hello!',
      heading: 'Hello!',
      message: 'Welcome to this JSON document, served up by Express',
      imagePath: '/static/images/donkey.jpg',
    }
  
    res.json(body)
})

module.exports = router;
