import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./error/error.js";
import reservationRouter from './routes/reservationRoute.js';

// Initialize express app
const app = express();

// Load environment variables from .env file
dotenv.config({ path: "./config/config.env" });

// Set up CORS to allow requests from the frontend
app.use(
    cors({
        origin: process.env.FRONTEND_URL, // Ensure this is correctly set in your .env file
        methods: ["POST", "PUT", "DELETE"], // Add any other methods if necessary (e.g., GET, PUT, DELETE)
        credentials: true, // This allows cookies and authentication credentials to be sent across domains
    })
);

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes for reservation
app.use('/api/v1/reservation', reservationRouter);

// Connect to the database
dbConnection();

// Error handling middleware
app.use(errorMiddleware);

// Export the app
export default app;
