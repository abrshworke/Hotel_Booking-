

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaTrashAlt, FaBed } from "react-icons/fa";

const AdminBookingList = ({ token }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:7000/api/booking/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.bookings) setBookings(res.data.bookings);
    } catch (err) {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleRemove = async (id) => {
    if (!window.confirm("Remove this booking?")) return;
    try {
      const res = await axios.delete(
        `http://localhost:7000/api/booking/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        toast.success(res.data.message || "Booking removed");
        fetchBookings();
      } else toast.error(res.data.message || "Failed to remove booking");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  if (loading)
    return (
      <p className="text-center text-gray-400 mt-12 text-lg font-medium animate-pulse">
        Loading bookings...
      </p>
    );

  if (!bookings.length)
    return (
      <p className="text-center text-gray-400 mt-12 text-lg font-medium">
        No bookings found.
      </p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white py-12 px-4 md:px-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center text-yellow-400 font-serif tracking-wide">
        Admin Booking Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {bookings.map((booking, idx) => (
          <motion.div
            key={booking._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
            className="relative bg-black/60 backdrop-blur-md border border-yellow-500/30 rounded-2xl shadow-2xl p-6 hover:scale-105 transform transition-all duration-300"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg md:text-xl font-semibold truncate">
                Booking: {booking._id.slice(0, 8)}...
              </h2>
              <button
                onClick={() => handleRemove(booking._id)}
                className="p-2 bg-red-600/80 hover:bg-red-700/90 rounded-full transition-all duration-300 shadow-md hover:shadow-red-500/50"
              >
                <FaTrashAlt />
              </button>
            </div>

            {/* Status */}
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4 ${
                booking.status === "Pending"
                  ? "bg-yellow-500/30 text-yellow-400"
                  : "bg-green-500/30 text-green-400"
              }`}
            >
              {booking.status}
            </span>

            {/* User Info */}
            <div className="space-y-1 text-gray-300">
              <p>
                <span className="text-yellow-400 font-medium">User:</span>{" "}
                {booking.user?.email || booking.user?._id}
              </p>
              <p>
                <span className="text-yellow-400 font-medium">Booking Date:</span>{" "}
                {new Date(booking.BookingDate).toLocaleString()}
              </p>
            </div>

            {/* Rooms */}
            <div className="mt-4">
              <h3 className="font-semibold text-yellow-400 mb-2 flex items-center gap-2">
                <FaBed /> Rooms
              </h3>
              <div className="flex flex-wrap gap-2">
                {booking.rooms?.map((room, idx) => (
                  <span
                    key={idx}
                    className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-lg text-sm shadow-sm"
                  >
                    {room.name} (${room.price})
                  </span>
                ))}
              </div>
            </div>

            {/* Booking Info */}
            <div className="mt-4 text-gray-300 space-y-1">
              <p>
                <span className="text-yellow-400 font-medium">Name:</span>{" "}
                {booking.bookingInfo?.firstName} {booking.bookingInfo?.lastName}
              </p>
              <p>
                <span className="text-yellow-400 font-medium">Email:</span>{" "}
                {booking.bookingInfo?.email}
              </p>
              <p>
                <span className="text-yellow-400 font-medium">Phone:</span>{" "}
                {booking.bookingInfo?.phone}
              </p>
              <p>
                <span className="text-yellow-400 font-medium">Check-In:</span>{" "}
                {booking.bookingInfo?.checkInDate
                  ? new Date(booking.bookingInfo.checkInDate).toLocaleDateString()
                  : "-"}
              </p>
              <p>
                <span className="text-yellow-400 font-medium">Check-Out:</span>{" "}
                {booking.bookingInfo?.checkOutDate
                  ? new Date(booking.bookingInfo.checkOutDate).toLocaleDateString()
                  : "-"}
              </p>
            </div>

            {/* Payment */}
            <div className="mt-4 flex justify-between items-center">
              <p className="text-yellow-400 font-semibold">
                Total: ${booking.totalAmount}
              </p>
              <p className="text-gray-300">{booking.paymentMethod || "-"}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminBookingList;
