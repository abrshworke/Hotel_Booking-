
// models/Room.js
import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  aboutRoom: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["single", "double", "suite", "deluxe"],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  amenities: {
    type: [String],
    enum: ["wifi", "pool", "gym", "parking"],
    default: [],
  },
  image: {
    type: [String],
    default: [],
  },
  maxGuests: {
    type: Number,
    required: true,
  },
  isBooked: {
  type: Boolean,
  default: false
}

}, { timestamps: true });

const RoomModel = mongoose.model("Room", RoomSchema);
export default RoomModel;
