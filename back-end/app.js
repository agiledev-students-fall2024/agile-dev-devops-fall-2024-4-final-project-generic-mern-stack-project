const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const noteRoutes = require('./routes/note'); 
const userRoutes = require('./routes/user'); 
const loginRoutes = require('./routes/login');
require("dotenv").config({ silent: true })

const app = express();
app.use(express.json()); 


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/api/notes', noteRoutes); 
app.use('/api/users', userRoutes); 
app.use('/api/auth/login', loginRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
