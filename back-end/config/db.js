import mongoose from 'mongoose';
import config from './config.js'; 

/* 
  Database Configuration
  - This file handles the connection to the MongoDB database using Mongoose.
  - Uses the connection string from the environment variables for secure configuration.
*/

// Global transformation for all schemas(maps _id to id, and vice versa)
mongoose.set('toJSON', {
    virtuals: true, 
    versionKey: false, 
    transform: (doc, ret) => {
      ret.id = ret._id; 
      delete ret._id; 
    },
  });

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(config.mongoURI);
        console.log(`MongoDB Connected: ${conn.connection.host} to DB: ${conn.connection.name}`); // Logs successful connection and database name
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exits process if the connection fails
    }
};

export default connectDB;
