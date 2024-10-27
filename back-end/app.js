const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const noteRoutes = require('./routes/note'); 
const userRoutes = require('./routes/user'); 
const loginRoutes = require('./routes/login');

const app = express();
app.use(express.json()); 



const uri = 'mongodb+srv://zq2076:bNhyzzyDk1JZg1dt@full-mern-stack-web-app.s8yum.mongodb.net/?retryWrites=true&w=majority&appName=Full-MERN-Stack-Web-App';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/api/notes', noteRoutes); 
app.use('/api/users', userRoutes); 
app.use('/api/auth/login', loginRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
