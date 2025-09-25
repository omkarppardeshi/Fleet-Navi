import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());



// Routes
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/bookings", bookingRoutes);

// MongoDB connection
mongoose.connect("mongodb+srv://omkar17pardeshi_db_user:AEW0hK1Og05WIoBH@navicluster.gx09bms.mongodb.net/?retryWrites=true&w=majority&appName=NaviCluster", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Error:", err));

export default app;
