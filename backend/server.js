import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import vehicleRoutes from './src/routes/vehicleRoutes.js';
import bookingRoutes from './src/routes/bookingRoutes.js'
import cors from "cors";


dotenv.config();
connectDB();

const app = express();

app.use(cors())

// Middleware to parse JSON
app.use(express.json());

// Mount routes
app.use('/api', vehicleRoutes);

app.use('/api/bookings', bookingRoutes); // <- this is needed


// Optional root route
app.get('/', (req, res) => res.send('API running'));

// Start server

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
