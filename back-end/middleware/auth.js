const jwt = require('jsonwebtoken');

const USER_SECRET = 'test_jwt_secret'; 

function verifyToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    // console.log('Hardcoded FakeToken', token); 
    if (!token) return res.status(403).json({ error: 'No token provided' });

    jwt.verify(token, USER_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ error: 'Failed to authenticate token' });

        req.userId = decoded.id; 
        next();
    });
}

module.exports = { verifyToken };
