const jwt = require('jsonwebtoken');

// Middleware to validate JWT
const authMiddleware = (req, res, next) => {
    // Retrieve the Authorization header
    const authHeader = req.headers['authorization'];

    // Check if the Authorization header is present
    if (!authHeader) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    // Extract the token from the Authorization header (format: Bearer <token>)
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded payload to the request object
        req.user = decoded;

        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        console.error('JWT verification failed:', err);
        res.status(400).json({ error: 'Invalid token.' });
    }
};

module.exports = authMiddleware;
