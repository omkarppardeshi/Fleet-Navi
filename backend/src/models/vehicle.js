import mongoose from 'mongoose';

const vehicleSchema = mongoose.Schema({
  name: { type: String, required: true },
  capacityKg: { type: Number, required: true },
  type: {type: String, required: true},
  tyres: { type: Number, required: true },
  status: { type: Number, required: false}
}, { timestamps: true });

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
export default Vehicle;
