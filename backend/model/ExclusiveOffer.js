
import mongoose from 'mongoose';

const exclusiveOfferSchema = new mongoose.Schema({
  title: String,
  description: String,
  icon: String
});

const  ExclusiveModel=  mongoose.model('ExclusiveOffer', exclusiveOfferSchema);
export default ExclusiveModel;
