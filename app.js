// app.js

import express, { json } from "express";
import dotenv from 'dotenv';
import certificateRoutes from './routes/certificateRoutes.js'
import connectDB from './db/db.js';
import cors from 'cors'; // Import cors middleware

// Load environment variables from .env file
dotenv.config();

// Create an Express app
const app = express();
connectDB()



// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all routes
app.use(certificateRoutes)



// Define a port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
