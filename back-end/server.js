// server.js
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import usersRoutes from './routes/users.js';
import tripsRoutes from './routes/trips.js';
import locationsRoutes from './routes/locations.js';
import activitiesRoutes from './routes/activities.js';
import commentsRoutes from './routes/comments.js';

dotenv.config(); // Load environment variables from .env

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Middleware
app.use(express.json());

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/users', usersRoutes);
app.use('/trips', tripsRoutes);
app.use('/locations', locationsRoutes);
app.use('/activities', activitiesRoutes);
app.use('/comments', commentsRoutes);

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
