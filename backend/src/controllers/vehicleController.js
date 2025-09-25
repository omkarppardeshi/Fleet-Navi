import Vehicle from '../models/vehicle.js'
import Booking from "../models/booking.js"
import { calculateRideDuration } from "../utils/rideDuration.js";

export const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find(); // get all vehicles
    res.status(200).json(vehicles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addVehicle = async (req, res) => {
  console.log("Body", req.body);
  
  try {
    const { name, capacityKg, type, tyres, status } = req.body;
    if (!name || !capacityKg || !tyres || !type) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const vehicle = await Vehicle.create({ name, capacityKg, type, tyres, status });
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const remVehicle = async (req, res) => {
  try {
    const { _id } = req.body;
    
    if (!_id) {
      return res.status(400).json({ error: 'Name field is required' });
    }

    const vehicle = await Vehicle.findOneAndDelete({ _id });
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    res.status(200).json({ message: 'Vehicle deleted successfully', vehicle });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAvailableVehicles = async (req, res) => {
  try {
    const { capacityRequired, fromPincode, toPincode, startTime } = req.query;
    if (!capacityRequired || !fromPincode || !toPincode || !startTime) {
      return res.status(400).json({ error: "Missing query parameters" });
    }

    const rideDuration = calculateRideDuration(fromPincode, toPincode);
    const start = new Date(startTime);
    const end = new Date(start.getTime() + rideDuration * 60 * 60 * 1000);

    const vehicles = await Vehicle.find({ capacityKg: { $gte: capacityRequired } });

    // Filter out booked vehicles
    const available = [];
    for (let v of vehicles) {
      const overlap = await Booking.findOne({
        vehicleId: v._id,
        $or: [
          { startTime: { $lt: end }, endTime: { $gt: start } }
        ]
      });
      if (!overlap) {
        available.push({ ...v.toObject(), estimatedRideDurationHours: rideDuration });
      }
    }

    res.status(200).json(available);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
