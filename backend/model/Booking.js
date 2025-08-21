
import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // links to UserModel
    required: true
  },
  items: [
    {
      RoomId: { type: String, required: true }
    }
  ],
  bookingInfo: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    checkInDate: Date,      
    checkOutDate: Date     
  },
  paymentMethod: String,
  totalAmount: Number,
  status: { type: String, default: 'Booked' },
  BookingDate: { type: Date, default: Date.now },
});

const BookingModel = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
export default BookingModel;
