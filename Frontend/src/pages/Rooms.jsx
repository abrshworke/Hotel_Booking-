
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaWifi, FaSwimmer, FaDumbbell, FaParking } from 'react-icons/fa';
import { FaBed, FaStar, FaArrowRight } from "react-icons/fa";


const Rooms = () => {
  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [guestCount, setGuestCount] = useState(1);

  const type = ['single', 'double', 'suite', 'deluxe'];
  const amenities = [
    { name: 'wifi', icon: <FaWifi /> },
    { name: 'pool', icon: <FaSwimmer /> },
    { name: 'gym', icon: <FaDumbbell /> },
    { name: 'parking', icon: <FaParking /> }
  ];

  const toggleSelection = (value, state, setState) => {
    setState(
      state.includes(value)
        ? state.filter((v) => v !== value)
        : [...state, value]
    );
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get('http://localhost:7000/api/room/all');
        setRooms(res.data.allRoom);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };
    fetchRooms();
  }, []);

  useEffect(() => {
    const filtered = rooms.filter((room) => {
      const matchType = selectedTypes.length === 0 || selectedTypes.includes(room.type);
      const matchAmenities =
        selectedAmenities.length === 0 ||
        selectedAmenities.every((a) => room.amenities.includes(a));
      const matchPrice = room.price <= maxPrice;
      const matchGuests = !room.maxGuests || guestCount <= room.maxGuests;
      const notBooked = !room.isBooked;

      return matchType && matchAmenities && matchPrice && matchGuests && notBooked;
    });
    setFilteredRooms(filtered);
  }, [rooms, selectedTypes, selectedAmenities, maxPrice, guestCount]);

  return (
    <div className="bg-gray-50 text-gray-900">
      {/* Hero Section */}
    
    <section className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
  {/* Background image with subtle parallax effect */}
  <div className="absolute inset-0 overflow-hidden">
    <motion.img
      src={rooms[0]?.image[0]}
      alt="Luxury Room"
      className="w-full h-full object-cover object-center scale-105 opacity-70"
      initial={{ scale: 1.1 }}
      animate={{ scale: 1 }}
      transition={{ duration: 3, ease: "easeOut" }}
    />
  </div>

  {/* Gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

  <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-28 flex flex-col md:flex-row items-center gap-10">
    {/* Left Content */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex-1 space-y-6 text-center md:text-left"
    >
      <div className="flex items-center justify-center md:justify-start gap-2 text-yellow-400">
        <FaStar className="text-lg" />
        <span className="text-sm uppercase tracking-widest">
          Premium Experience
        </span>
      </div>
      <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight">
        Discover Our <span className="text-yellow-400">Exclusive</span> Rooms
      </h2>
      <p className="text-lg text-gray-200 max-w-lg mx-auto md:mx-0">
        Handpicked for comfort, luxury, and elegance. Your perfect stay starts here.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 rounded-lg font-medium shadow-lg flex items-center gap-2"
        >
          <FaBed /> View All Rooms
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="px-6 py-3 bg-transparent border border-yellow-400 hover:bg-yellow-400 hover:text-black rounded-lg font-medium shadow-lg flex items-center gap-2"
          onClick={() => navigate('/')}
          
        >
          Featured Room <FaArrowRight />
        </motion.button>
      </div>
    </motion.div>

    {/* Right Image Card with Highlight */}
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="flex-1 relative"
    >
      <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-yellow-400">
        <img
          src={rooms[0]?.image[0]}
          alt="Featured Room"
          className="w-full h-[350px] object-cover"
        />
      </div>
      <div className="absolute -bottom-6 left-6 bg-gray-900/90 backdrop-blur-lg px-6 py-4 rounded-xl border border-yellow-400 shadow-lg">
        <h3 className="text-lg font-bold">Royal Deluxe Suite</h3>
        <p className="text-yellow-400 font-medium">$250 / Night</p>
      </div>
    </motion.div>
  </div>
</section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Sidebar Filters */}
        <aside className="md:col-span-1 bg-white p-6 rounded-xl shadow-lg space-y-6">
          <h3 className="text-xl font-semibold border-b pb-2">Filter Rooms</h3>

          {/* Room Type */}
          <div>
            <label className="block font-medium mb-1">Room Type</label>
            <div className="space-y-2">
              {type.map((roomType) => (
                <div key={roomType} className="flex items-center mb-2">
                  <input
                    type="radio"
                    name="roomType" // same name groups radios
                    value={roomType}
                    checked={selectedTypes[0] === roomType}  // only one selected
                    onChange={() => setSelectedTypes([roomType])} // update state to one item array
                    className="mr-2"
                  />
                  <label className="capitalize">{roomType}</label>
                </div>
              ))}

            </div>
          </div>

          {/* Price Range */}
          <div>
            <label className="block font-medium mb-1">
              Price Range: <span className="font-semibold">${maxPrice}</span>
            </label>
            <input
              type="range"
              min={100}
              max={1000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>

          {/* Amenities */}
          <div>
            <label className="block font-medium mb-1">Amenities</label>
            <div className="space-y-2">
              {amenities.map((a) => (
                <label key={a.name} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(a.name)}
                    onChange={() => toggleSelection(a.name, selectedAmenities, setSelectedAmenities)}
                    className="accent-blue-600"
                  />
                  <span className="flex items-center gap-1 capitalize">
                    {a.icon} {a.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Guests */}
          <div>
            <label className="block font-medium mb-1">Guests</label>
            <input
              type="number"
              min="1"
              max="10"
              value={guestCount}
              onChange={(e) => setGuestCount(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </aside>
        
       
       <section className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  {filteredRooms.length === 0 ? (
    <p className="text-center col-span-full text-gray-500">
      No rooms match the selected filters.
    </p>
  ) : (
    filteredRooms.map((room, idx) => (
      <motion.div
        key={room._id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: idx * 0.1 }}
        whileHover={{ scale: 1.02 }}
        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
      >
        <img
          src={room.image[0]}
          alt={room.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-5">
          <h4 className="text-lg font-semibold">{room.name}</h4>
          <p className="text-yellow-600 font-bold mt-1">
            ${room.price} / night
          </p>
          <div className="flex flex-wrap gap-2 mt-3 text-sm text-gray-600">
            {room.amenities.map((a, i) => (
              <span key={i} className="bg-gray-100 px-3 py-1 rounded-full">
                {a}
              </span>
            ))}
          </div>
          <button
            onClick={() => navigate(`/rooms/${room._id}`)}
            className="mt-5 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow"
          >
            View Details
          </button>
        </div>
      </motion.div>
    ))
  )}
</section>

    </div>
    </div>
  );
};



export default Rooms;
