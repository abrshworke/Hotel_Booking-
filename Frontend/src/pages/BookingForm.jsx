
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookingForm = () => {
  const { id } = useParams();
  const roomId = id;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    checkInDate: "",
    checkOutDate: "",
    paymentMethod: "Credit Card",
  });

  const [pricePerNight, setPricePerNight] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const token = localStorage.getItem("token");

  // Fetch room price
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.post("http://localhost:7000/api/room/single", { id: roomId });
        setPricePerNight(res.data.room.price);
      } catch (err) {
        console.error("Error fetching room:", err);
      }
    };
    fetchRoom();
  }, [roomId]);

  // Calculate total price
  useEffect(() => {
    const { checkInDate, checkOutDate } = formData;
    if (checkInDate && checkOutDate) {
      const start = new Date(checkInDate);
      const end = new Date(checkOutDate);
      const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      setTotalAmount(nights > 0 ? nights * pricePerNight : 0);
    }
  }, [formData.checkInDate, formData.checkOutDate, pricePerNight]);

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (totalAmount <= 0) {
      toast.error("Please select valid check-in and check-out dates.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:7000/api/booking/book",
        {
          items: [{ RoomId: roomId }],
          bookingInfo: { ...formData },
          paymentMethod: formData.paymentMethod,
          totalAmount,
        },
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
      );
      toast.success("🎉 Room booked successfully!");
    } catch (err) {
      toast.error("❌ Booking failed. Please try again.");
    }
  };

  const inputStyle =
    "peer border border-gray-300 rounded-lg px-4 pt-5 pb-2 w-full bg-white/70 backdrop-blur-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200 placeholder-transparent";

  return (
    <div className="flex justify-center py-14 px-4 bg-gradient-to-br from-orange-50 via-white to-gray-50 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 via-red-500 to-red-600 text-white p-8">
          <h2 className="text-4xl font-extrabold text-center tracking-wide">Book Your Luxury Stay</h2>
          <p className="text-center text-orange-100 mt-2 text-sm">
            Escape to comfort and elegance — secure your room in minutes
          </p>
        </div>

        {/* Form Body */}
        <div className="p-8 space-y-6">
          {/* Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="relative">
              <input
                className={inputStyle}
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <label className="absolute left-4 top-2 text-xs text-gray-500 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm">
                First Name
              </label>
            </div>
            <div className="relative">
              <input
                className={inputStyle}
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              <label className="absolute left-4 top-2 text-xs text-gray-500 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm">
                Last Name
              </label>
            </div>
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className={inputStyle}
            />
            <label className="absolute left-4 top-2 text-xs text-gray-500 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm">
              Email Address
            </label>
          </div>

          {/* Phone */}
          <div className="relative">
            <input
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className={inputStyle}
            />
            <label className="absolute left-4 top-2 text-xs text-gray-500 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm">
              Phone Number
            </label>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="relative">
              <input
                type="date"
                name="checkInDate"
                value={formData.checkInDate}
                onChange={handleChange}
                required
                className={inputStyle}
              />
              <label className="absolute left-4 top-2 text-xs text-gray-500">Check-In</label>
            </div>
            <div className="relative">
              <input
                type="date"
                name="checkOutDate"
                value={formData.checkOutDate}
                onChange={handleChange}
                required
                className={inputStyle}
              />
              <label className="absolute left-4 top-2 text-xs text-gray-500">Check-Out</label>
            </div>
          </div>

          {/* Payment */}
          <div className="relative">
            <select
              name="paymentMethod"
              className={inputStyle}
              value={formData.paymentMethod}
              onChange={handleChange}
            >
              <option value="Credit Card">Credit Card</option>
              <option value="Cash">Cash</option>
              <option value="Telebirr">Telebirr</option>
            </select>
            <label className="absolute left-4 top-2 text-xs text-gray-500">Payment Method</label>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center bg-orange-50 p-5 rounded-xl border border-orange-200">
            <span className="font-semibold text-gray-700">Total:</span>
            <span className="text-xl font-bold text-orange-600">{totalAmount} ETB</span>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-600 via-red-500 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-transform transform hover:scale-105 active:scale-95"
          >
            Confirm Booking
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
