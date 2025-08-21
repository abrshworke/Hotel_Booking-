
import { Router } from "express";
import { createBooking, getAllBookings, getBookingsByUser, removeBooking } from "../controller/bookingController.js";

const BookingRouter = Router();

BookingRouter.post('/book' , createBooking);
BookingRouter.get('/user/:userID', getBookingsByUser);
BookingRouter.delete('/:bookingId' , removeBooking)
BookingRouter.get('/all' , getAllBookings)


export default BookingRouter;
