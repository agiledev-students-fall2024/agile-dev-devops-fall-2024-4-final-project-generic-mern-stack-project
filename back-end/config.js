require('dotenv').config();

if (!process.env.JWT_SECRET || !process.env.DSN) {
    throw new Error('Missing critical environment variables. Please check your .env file.');
}