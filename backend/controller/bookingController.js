import jwt from 'jsonwebtoken';
import BookingModel from "../model/Booking.js"
import RoomModel from '../model/room.js';
import UserModel from '../model/user.js'


export const createBooking = async (req, res) => {
  try {
    // Extract token from header and verify
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { items, bookingInfo, paymentMethod, totalAmount } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'No rooms selected for booking' });
    }

    // Check room availability & update
    for (const item of items) {
      const room = await RoomModel.findById(item.RoomId);
      if (!room) {
        return res.status(404).json({ message: `Room with id ${item.RoomId} not found` });
      }
      if (room.isBooked) {
        return res.status(400).json({ message: `Room ${room._id} is already booked` });
      }
      room.isBooked = true;
      await room.save();
    }

    // Create booking record
    const newBooking = new BookingModel({
      user: user._id,
      items,
      bookingInfo,
      paymentMethod,
      totalAmount,
      status: 'Booked',
      BookingDate: new Date(),
    });

    await newBooking.save();

    await newBooking.populate({
      path: 'items.RoomId',
      model: 'Room',
      select: 'name price', 
    });

    res.status(201).json({
      success: true,
      message: 'Booking placed successfully',
      booking: newBooking,
    });
  } catch (err) {
    console.error('Booking creation error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// GET /api/booking/user/:userID
export const getBookingsByUser = async (req, res) => {
  try {
    const bookings = await BookingModel
      .find({ user: req.params.userID })
      .populate('items.RoomId', 'name price');  // <-- ADD this line!
    res.status(200).json({ bookings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// DELETE /api/booking/:bookingId (Admin removes booking and unbooks room)
export const removeBooking = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    const booking = await BookingModel.findById(bookingId);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    // Unbook associated rooms
    for (const item of booking.items) {
      const room = await RoomModel.findById(item.RoomId);
      if (room) {
        room.isBooked = false;
        await room.save();
      } else {
         console.warn(`Room not found for RoomId: ${item.RoomId}`);
  }
    }

    await BookingModel.findByIdAndDelete(bookingId);
    res.status(200).json({ success: true, message: 'Booking removed and room is now available' });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


export const getAllBookings = async (req, res) => {
  try {
    const bookings = await BookingModel.find().populate('user');
    res.status(200).json({ bookings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


