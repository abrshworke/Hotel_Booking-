
import React from 'react'
import {  Route , Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './Components/NavBar';
import Footer from './Components/Footer';
import Rooms from './pages/Rooms';
import RoomDetails from './pages/RoomDetail';
import BookingForm from './pages/BookingForm';
import MyBookings from './pages/MyBooking';
import { ToastContainer } from 'react-toastify';
import SignIn from './Authentication/Signin';
import SignUp from './Authentication/Signup';
import Navigation from './Components/NavBar';
import FeedbackForm from './pages/Contact';
import About from './pages/About';

function App() {
  return (
    <div>
      
        <Navigation />
        <ToastContainer autoClose={1000} />
        <Routes>

          <Route path= "/"  element = {<Home />} />
          <Route path= "/rooms"  element = {<Rooms/>}/>
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/booking/:id"  element={<BookingForm />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/contact" element={<FeedbackForm />} />
          <Route path="/about" element={<About />} />

        </Routes>
        <Footer />
      
    </div>
  )
}


export default App