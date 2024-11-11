const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const testRoute = require('./routes/testroute.js');
const pinRoutes = require('./routes/pinroutes.js');
const authRoutes = require('./routes/authroutes.js');  
const mapRoutes = require('./routes/maproutes.js');
const userRoute = require('./routes/userroutes.js');
const friendRoutes = require('./routes/friends.js');

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5001;

// Middleware setup
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Default test route for root path
app.get('/', (req, res) => {
    res.send('Hello world');
});

// Register routes
app.use('/test', testRoute);

app.use('/api', pinRoutes); 
app.use('/api', mapRoutes); 
app.use('/auth', authRoutes); 
app.use('/user-settings', userRoute);
app.use('/friends', friendRoutes);

// Start the server if this file is run directly
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

module.exports = app;



