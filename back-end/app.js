const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')

const noteRoutes = require('./routes/note'); 
const userRoutes = require('./routes/user'); 
const loginRoutes = require('./routes/login');
const aiFeaturesRoute = require('./routes/aiFeaturesRoute');
require("dotenv").config({ silent: true })

const app = express();
app.use(express.json()); 

// for database part: sprint 3
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
     .then(() => console.log('MongoDB connected'))
     .catch(err => console.log(err));

app.use(cors({
        origin: [
            'https://easynote-aivlj.ondigitalocean.app', 
            'http://localhost:3000'
        ],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
}));     
app.use('/notes', noteRoutes); 
app.use('/users', userRoutes); 
app.use('/auth/login', loginRoutes); 
app.use('/api/aiFeaturesRoute', aiFeaturesRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
