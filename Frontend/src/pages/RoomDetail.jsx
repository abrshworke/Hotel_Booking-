

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { guestReviews, nearbyAttractions } from '../assets/assets';
// import { useNavigate } from 'react-router-dom';

// const RoomDetails = () => {
//   const router = useNavigate();
//   const { id } = useParams();
//   const [room, setRoom] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchRoom = async () => {
//       setLoading(true);
//       setError('');
//       try {
//         const res = await axios.post('http://localhost:7000/api/room/single', { id });
//         if (res.data && res.data.room) {
//           setRoom(res.data.room);
//         } else {
//           setError('Room data not found.');
//         }
//       } catch (err) {
//         console.error('Failed to fetch room:', err);
//         setError('Failed to load room details. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRoom();
//   }, [id]);

//   if (loading)
//     return (
//       <div className="text-center py-20 text-white">
//         Loading room details...
//       </div>
//     );

//   if (error)
//     return (
//       <div className="text-center py-20 text-red-500 font-semibold">
//         {error}
//       </div>
//     );

//   if (!room)
//     return (
//       <div className="text-center py-20 text-white">
//         Room not found.
//       </div>
//     );

//   return (
//     <div className="bg-black text-white min-h-screen pt-6 px-4 md:px-16">
//       {/* Hero Section */}
//       <div className="relative rounded-3xl overflow-hidden shadow-lg">
//         <img
//           src={room.image[0]}
//           alt={room.name}
//           className="w-full h-[450px] object-cover transform hover:scale-105 transition duration-500"
//         />
//         <div className="absolute bottom-6 left-6 text-white text-4xl font-bold backdrop-blur-sm px-6 py-3 bg-black/50 rounded-xl">
//           {room.name}
//         </div>
//       </div>

//       {/* Room Content */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
//         {/* Left: Details */}
//         <div className="space-y-10 md:col-span-2">
//           <div className="flex flex-wrap gap-3">
//             {room.amenities.map((item, idx) => (
//               <span
//                 key={idx}
//                 className="bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 px-4 py-2 rounded-full text-xs uppercase tracking-wider"
//               >
//                 {item}
//               </span>
//             ))}
//           </div>

//           <div>
//             <h3 className="text-3xl font-bold mb-3">About this room</h3>
//             <p className="text-gray-300 leading-[1.8]">{room.aboutRoom}</p>
//           </div>

//           <div>
//             <h3 className="text-3xl font-bold mb-3">Guest Experiences</h3>
//             <div className="grid sm:grid-cols-2 gap-6">
//               {guestReviews.map((review, i) => (
//                 <div key={i} className="bg-white/10 p-6 rounded-2xl shadow-inner">
//                   <h5 className="font-semibold">{review.name}</h5>
//                   <p className="text-yellow-400 text-sm mb-2">★★★★★</p>
//                   <p className="text-gray-300 text-sm">{review.comment}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div>
//             <h3 className="text-3xl font-bold mb-3">Nearby Attractions</h3>
//             <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
//               {nearbyAttractions.map((place, i) => (
//                 <div key={i} className="bg-white/10 p-5 rounded-2xl text-sm">
//                   <h5 className="font-bold text-yellow-400 mb-1">{place.name}</h5>
//                   <p className="text-gray-300">{place.detail}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Right: Booking Box */}
//         <div className="bg-white text-black rounded-3xl shadow-2xl p-8 h-fit sticky top-24">
//           {/* You can replace this <div> with <BookingForm roomId={room._id} /> */}
//           <h3 className="text-2xl font-bold mb-4">Ready to book?</h3>
//           <p className="text-gray-600 mb-6">Reserve now to secure your stay.</p>
//             <button
//               onClick={() => router(`/booking/${room._id}`)}
//               className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-xl"
//             >
//               Book This Room
//             </button>

            


//         </div>
//       </div>
//     </div>
//   );
// };

// export default RoomDetails;









import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { guestReviews, nearbyAttractions } from '../assets/assets';

const RoomDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRoom = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await axios.post('http://localhost:7000/api/room/single', { id });
        if (res.data && res.data.room) {
          setRoom(res.data.room);
        } else {
          setError('Room data not found.');
        }
      } catch (err) {
        console.error('Failed to fetch room:', err);
        setError('Failed to load room details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-400 text-lg">
        Loading room details...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500 font-semibold text-lg">
        {error}
      </div>
    );

  if (!room)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-400 text-lg">
        Room not found.
      </div>
    );

  return (
    <div className="bg-gray-900 text-white min-h-screen pt-6 px-6 md:px-20 pb-20 max-w-7xl mx-auto">
      {/* Hero Image with overlay */}
      <motion.div
        className="relative rounded-3xl overflow-hidden shadow-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={room.image[0]}
          alt={room.name}
          className="w-full h-[450px] object-cover transform hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md rounded-xl px-8 py-3 text-4xl font-extrabold">
          {room.name}
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-14">
        {/* Left Content */}
        <motion.div
          className="md:col-span-2 space-y-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {/* Amenities Tags */}
          <div className="flex flex-wrap gap-3">
            {room.amenities.map((item, idx) => (
              <span
                key={idx}
                className="bg-yellow-500/20 border border-yellow-500 text-yellow-400 px-5 py-2 rounded-full text-xs uppercase font-semibold tracking-wider select-none"
              >
                {item}
              </span>
            ))}
          </div>

          {/* About Room */}
          <section>
            <h3 className="text-3xl font-bold mb-4 border-b border-yellow-500 pb-2">
              About this room
            </h3>
            <p className="text-gray-300 leading-relaxed">{room.aboutRoom}</p>
          </section>

          {/* Guest Experiences */}
          <section>
            <h3 className="text-3xl font-bold mb-6 border-b border-yellow-500 pb-2">
              Guest Experiences
            </h3>
            <div className="grid sm:grid-cols-2 gap-8">
              {guestReviews.map((review, i) => (
                <motion.div
                  key={i}
                  className="bg-white/10 p-6 rounded-3xl shadow-inner"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <h5 className="font-semibold text-yellow-400">{review.name}</h5>
                  <p className="text-yellow-400 text-sm mb-3">★★★★★</p>
                  <p className="text-gray-300 text-sm">{review.comment}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Nearby Attractions */}
          <section>
            <h3 className="text-3xl font-bold mb-6 border-b border-yellow-500 pb-2">
              Nearby Attractions
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {nearbyAttractions.map((place, i) => (
                <motion.div
                  key={i}
                  className="bg-white/10 p-6 rounded-2xl"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  <h5 className="font-bold text-yellow-400 mb-2">{place.name}</h5>
                  <p className="text-gray-300 text-sm">{place.detail}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </motion.div>

        {/* Booking Box */}
        <motion.aside
          className="bg-yellow-400 text-black rounded-3xl shadow-2xl p-8 h-fit sticky top-24"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h3 className="text-2xl font-extrabold mb-4">Ready to book?</h3>
          <p className="mb-8 font-medium">
            Reserve now to secure your stay.
          </p>
          <button
            onClick={() => navigate(`/booking/${room._id}`)}
            className="w-full py-3 rounded-xl font-bold text-white bg-black hover:bg-gray-900 transition"
          >
            Book This Room
          </button>
        </motion.aside>
      </div>
    </div>
  );
};

export default RoomDetails;
