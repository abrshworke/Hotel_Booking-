
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { assets, coreValues } from "../assets/assets";
import { motion } from "framer-motion";
// import { FaHotel, FaConciergeBell, FaSwimmer } from "react-icons/fa";

const Home = () => {
  const router = useNavigate();

  const [features, setFeatures] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const res = await axios.get("http://localhost:7000/api/hotel/feature/all");
        setFeatures(res.data.allHotelFeature || []);
      } catch (error) {
        console.error("Error fetching features:", error);
      }
    };

    const fetchAmenities = async () => {
      try {
        const res = await axios.get("http://localhost:7000/api/hotel/amenities/all");
        setAmenities(res.data.allAmenities || []);
      } catch (error) {
        console.error("Error fetching amenities:", error);
      }
    };

    const fetchOffers = async () => {
      try {
        const res = await axios.get("http://localhost:7000/api/hotel/offer/all");
        setOffers(res.data.allExclusiveOffer || []);
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };

    fetchFeatures();
    fetchAmenities();
    fetchOffers();
  }, []);

  return (
    <div className="bg-white text-gray-900 ">

     <section className="relative bg-gray-900 overflow-hidden">
  {/* Background Gradient Overlay */}
  <div className="absolute inset-0">
    <img
      src={assets.room7}
      alt="Luxury Hotel"
      className="w-full h-full object-cover opacity-40"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/60 to-transparent"></div>
  </div>

  <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center gap-12">
    {/* Left Content */}
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="flex-1 text-center md:text-left"
    >
      <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-lg">
        Discover <span className="text-yellow-400">Luxury Living</span>
      </h1>
      <p className="mt-6 text-lg text-gray-200 max-w-lg">
        Escape to elegance and comfort. Our world-class hospitality ensures
        unforgettable stays, tailored just for you.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
        <button
          onClick={() => router("/rooms")}
          className="px-8 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-full shadow-lg hover:bg-yellow-300 hover:scale-105 transform transition-all duration-300"
        >
          Book Your Stay
        </button>
        <button
          onClick={() => router("/about")}
          className="px-8 py-3 bg-transparent border border-white text-white font-medium rounded-full hover:bg-white hover:text-gray-900 hover:scale-105 transform transition-all duration-300"
        >
          Learn More
        </button>
      </div>
    </motion.div>

    {/* Right Image with Glass Effect */}
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="flex-1 relative"
    >
      <div className="bg-white/10 backdrop-blur-xl p-3 rounded-3xl shadow-2xl">
        <img
          src={assets.room7}
          alt="Luxury Room"
          className="rounded-2xl shadow-lg w-full h-full object-cover"
        />
      </div>
    </motion.div>
  </div>
</section>

{/* Featured Rooms */}
<section className="max-w-7xl mx-auto px-4 py-20">
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="text-4xl font-extrabold text-center mb-14 text-gray-900"
  >
    Our Featured Rooms
  </motion.h2>

  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
    {features.length === 0 ? (
      <p className="col-span-full text-center text-gray-500">
        No features available
      </p>
    ) : (
      features.map((feature) => (
        <motion.div
          key={feature._id}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
        >
          <img
            src={feature.image}
            alt={feature.name}
            className="w-full h-52 object-cover"
          />
          <div className="p-6 flex flex-col justify-between h-full">
            <div>
              <h3 className="font-bold text-lg mb-1 text-gray-800">
                {feature.name}
              </h3>
              <p className="text-yellow-500 font-semibold mb-3">
                {feature.price} / night
              </p>
              <ul className="text-sm space-y-1">
                {(feature.hotelService || []).map((service, id) => (
                  <li key={id} className="text-gray-600 flex items-center gap-2">
                    <span className="text-yellow-400">•</span> {service}
                  </li>
                ))}
              </ul>
            </div>
            <button className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-black px-5 py-2.5 rounded-full font-medium transition-transform hover:scale-105">
              View Details
            </button>
          </div>
        </motion.div>
      ))
    )}
  </div>

  {features.length > 0 && (
    <div className="flex justify-center mt-14">
      <button
        onClick={() => router("/rooms")}
        className="bg-black hover:bg-yellow-500 hover:text-black text-white px-8 py-3 rounded-full font-semibold transition-transform transform hover:scale-105"
      >
        View All Rooms
      </button>
    </div>
  )}
</section>

{/* Amenities */}
<section className="bg-gradient-to-b from-gray-50 to-white py-20">
  <div className="max-w-7xl mx-auto px-4">
    <h2 className="text-4xl font-extrabold text-center mb-14">Hotel Amenities</h2>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {amenities.length === 0 ? (
        <p className="col-span-full text-center text-gray-500">
          No amenities found
        </p>
      ) : (
        amenities.map((amenity) => (
          <motion.div
            key={amenity._id}
            whileHover={{ scale: 1.05 }}
            className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all text-center"
          >
            <div className="text-5xl text-yellow-400 mb-4">{amenity.icon}</div>
            <h3 className="font-bold text-xl mb-2">{amenity.title}</h3>
            <p className="text-sm text-gray-600">
              {amenity.description}
            </p>
          </motion.div>
        ))
      )}
    </div>
  </div>
</section>

{/* Exclusive Offers */}
<section className="bg-gray-900 py-20 text-white">
  <div className="max-w-7xl mx-auto px-4">
    <h2 className="text-4xl font-extrabold text-center mb-14">Exclusive Offers</h2>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {offers.length === 0 ? (
        <p className="col-span-full text-center text-gray-400">
          No offers available
        </p>
      ) : (
        offers.map((offer) => (
          <motion.div
            key={offer._id}
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg text-center"
          >
            <div className="text-4xl mb-3 text-yellow-400">{offer.icon}</div>
            <h3 className="font-bold text-lg mb-2">{offer.title}</h3>
            <p className="text-sm text-gray-300">{offer.description}</p>
            <button className="mt-6 bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-2 rounded-full transition-transform hover:scale-105">
              Learn More
            </button>
          </motion.div>
        ))
      )}
    </div>
  </div>
</section>

{/* Location */}
<section className="py-20">
  <div className="max-w-7xl mx-auto px-4 text-center">
    <h2 className="text-4xl font-extrabold mb-6">Our Prime Location</h2>
    <p className="mb-10 text-gray-600 max-w-2xl mx-auto">
      Perfectly situated in the heart of the city, giving you quick access to the best attractions, shopping, and dining experiences.
    </p>
    <motion.img
      src={assets.room5}
      alt="Map"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="w-full max-w-3xl mx-auto rounded-2xl shadow-xl"
    />
  </div>
</section>

{/* Why Choose Us */}
<section className="bg-gradient-to-b from-gray-50 to-white py-20">
  <div className="max-w-7xl mx-auto px-4 text-center">
    <h2 className="text-4xl font-extrabold mb-14">Why Choose Abreham Hotel?</h2>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {coreValues.map((value, id) => (
        <motion.div
          key={id}
          whileHover={{ y: -5 }}
          className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
        >
          <h3 className="font-bold text-xl mb-3 text-gray-800">{value.title}</h3>
          <p className="text-sm text-gray-600">{value.desc}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      
    </div>
  );
};

export default Home;



