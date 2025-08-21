
import mongoose from 'mongoose';

const featuredRoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  hotelService: {
    type: [String],
    required: true,
    
  },
  price: {
    type: Number,
    required: true,
  },

  image: { type: String, required: true }

  });

const HFeatureModel =  mongoose.model('FeaturedRoom', featuredRoomSchema);
export default HFeatureModel;
