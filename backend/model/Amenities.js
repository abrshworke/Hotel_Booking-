
import mongoose from 'mongoose';

const amenitySchema = new mongoose.Schema({
  title: String,
  description: String,
  icon: String, 
});

const AmenitiesModel =  mongoose.model('Amenity', amenitySchema);
export default AmenitiesModel;

