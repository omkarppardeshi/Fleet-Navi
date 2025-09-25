import express from "express";
import { addVehicle, getAvailableVehicles, remVehicle, getVehicles } from "../controllers/vehicleController.js";

const router = express.Router();

// Vehicle CRUD routes
router.post("/add", addVehicle);             // create
router.post("/remove", remVehicle);       // delete
router.get("/vehicles", getVehicles);     // fetch all vehicles
router.get("/available", getAvailableVehicles); // available

export default router;
