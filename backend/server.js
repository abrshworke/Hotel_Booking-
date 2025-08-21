import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ConnectDataBase from './config/Database.js';
import cloudinaryConfig from './config/Cloudinary.js';
import RoomRouter from './routes/roomRoute.js';
import FeedbackRoute from './routes/FeedBackRoute.js';
import UserRoute from './routes/userRoute.js';
import BookingRouter from './routes/BookingRoute.js';
import HotelRouter from './routes/HomeRoute.js';

dotenv.config();  

ConnectDataBase(); 
cloudinaryConfig();

const app = express();
const Port = process.env.PORT || 7000;

// middleware

app.use(express.json());
app.use(cors());

//endpoints 

app.use('/api/user' , UserRoute);
app.use('/api/room' , RoomRouter);
app.use('/api/feedback' , FeedbackRoute);
app.use('/api/booking', BookingRouter);
app.use('/api/hotel' , HotelRouter)

app.get('' , (req, res) => {
  res.send('welcome to first endpoint');
})

app.listen(Port , () => console.log(`Server is running on port ${Port}`));
export default app;


