import jwt from 'jsonwebtoken';
 
let tokenBlacklist = []; // Blacklist for logout functionality
 
export const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  console.log('Token received:', token);
  if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  if (tokenBlacklist.includes(token)) {
      return res.status(401).json({ message: 'Token is blacklisted. Please log in again.' });
  }

  try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Token verified for user:', verified.id);
      req.user = verified;
      next();
  } catch (error) {
      console.error('Error verifying token:', error.message);
      res.status(400).json({ message: 'Invalid token.' });
  }
};

 