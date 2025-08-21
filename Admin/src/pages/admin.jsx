
import React from "react";
import { useNavigate } from "react-router-dom";
import { BedDouble, BookOpen, Home } from "lucide-react";

const Admin = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black flex items-center justify-center px-4">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 w-full max-w-2xl rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
        
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Admin Control Center
        </h1>
        <p className="text-gray-300 max-w-xl mx-auto leading-relaxed mb-8">
          Welcome to the <span className="text-blue-400 font-semibold">Gebeya</span> 
          admin panel. Here you can manage rooms, monitor bookings, and keep everything running smoothly.
        </p>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <button
            onClick={() => navigate("/list")}
            className="flex flex-col items-center p-5 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/50"
          >
            <BedDouble size={28} className="mb-2" />
            <span className="font-semibold">Manage Rooms</span>
          </button>

          <button
            onClick={() => navigate("/booking")}
            className="flex flex-col items-center p-5 rounded-xl bg-gradient-to-br from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-green-500/50"
          >
            <BookOpen size={28} className="mb-2" />
            <span className="font-semibold">Manage Bookings</span>
          </button>

          <button
            onClick={() => navigate("/home")}
            className="flex flex-col items-center p-5 rounded-xl bg-gradient-to-br from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
          >
            <Home size={28} className="mb-2" />
            <span className="font-semibold">Home Page Manage</span>
          </button>

          <button
            onClick={() => navigate("/add")}
            className="flex flex-col items-center p-5 rounded-xl bg-gradient-to-br from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
          >
            <Home size={28} className="mb-2" />
            <span className="font-semibold">Add Room</span>
          </button>

          <button
            onClick={() => navigate("/feedback")}
            className="flex flex-col items-center p-5 rounded-xl bg-gradient-to-br from-yellow-600 to-yellow-800 hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
          >
            <Home size={28} className="mb-2" />
            <span className="font-semibold">Manage Feedback</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
