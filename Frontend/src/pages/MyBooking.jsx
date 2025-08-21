
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const userId = JSON.parse(atob(token.split('.')[1])).id;
        const res = await axios.get(`http://localhost:7000/api/booking/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data.bookings);
      } catch (err) {
        console.error('Error getting bookings:', err.response?.data || err);
      }
    };

    const fetchRooms = async () => {
      try {
        const res = await axios.get('http://localhost:7000/api/room/all');
        setRooms(res.data.allRoom);
      } catch (error) {
        console.error('Error getting rooms:', error);
      }
    };

    fetchBookings();
    fetchRooms();
  }, []);

  const getRoomById = (id) => rooms.find((r) => r._id === id);

  const calculateTotalPrice = (booking, pricePerNight) => {
    if (!booking.bookingInfo?.checkInDate || !booking.bookingInfo?.checkOutDate) return 0;
    const start = new Date(booking.bookingInfo.checkInDate);
    const end = new Date(booking.bookingInfo.checkOutDate);
    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return nights * pricePerNight;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen bg-gradient-to-br from-orange-50 via-white to-gray-50">
      <h2 className="text-4xl font-extrabold mb-8 text-gray-900">My Bookings</h2>

      {bookings.length === 0 ? (
        <div className="text-center py-16 text-gray-500 text-lg">
          You have no bookings yet.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) =>
            booking.items.map((item) => {
              const room = getRoomById(item.RoomId) || {};
              const price = calculateTotalPrice(booking, room.price || 0);

              return (
                <div
                  key={item.RoomId}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Room Image */}
                  <div className="h-48 w-full overflow-hidden">
                    <img
                      src={room.image?.[0] || 'https://via.placeholder.com/300x200'}
                      alt={room.name}
                      className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Booking Info */}
                  <div className="p-5 flex flex-col gap-3">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-bold text-gray-900">{room.name || 'Room'}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          booking.status === 'confirmed'
                            ? 'bg-green-100 text-green-700'
                            : booking.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    {/* Guest Name */}
                    <p className="text-sm text-gray-500">
                      Guest: <span className="font-medium text-gray-700">
                        {`${booking.bookingInfo?.firstName ?? ''} ${booking.bookingInfo?.lastName ?? ''}`}
                      </span>
                    </p>

                    {/* Dates */}
                    <div className="flex justify-between text-sm text-gray-600">
                      <div>
                        <p className="font-semibold">Check-In</p>
                        <p>{booking.bookingInfo?.checkInDate ? new Date(booking.bookingInfo.checkInDate).toLocaleDateString() : '-'}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Check-Out</p>
                        <p>{booking.bookingInfo?.checkOutDate ? new Date(booking.bookingInfo.checkOutDate).toLocaleDateString() : '-'}</p>
                      </div>
                    </div>

                    {/* Total Price */}
                    <div className="flex justify-between items-center mt-3 border-t pt-3">
                      <span className="text-gray-500 font-medium">Total</span>
                      <span className="text-orange-600 font-bold">{price} birr</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
