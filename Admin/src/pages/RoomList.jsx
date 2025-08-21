
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminRoomList = ({ token }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:7000/api/room/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setRooms(res.data.allRoom);
      } else {
        toast.error("Failed to fetch rooms");
      }
    } catch (err) {
      toast.error(err.message);
    }
    setLoading(false);
  };

  const removeRoom = async (id) => {
    if (!window.confirm("Are you sure you want to remove this room?")) return;

    try {
      const res = await axios.post(
        "http://localhost:7000/api/room/remove",
        { id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        toast.success(res.data.message || "Room removed");
        fetchRooms();
      } else {
        toast.error(res.data.message || "Failed to remove room");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-600 text-lg font-medium">
        Loading rooms...
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
        Manage Rooms
      </h2>

      {rooms.length === 0 && (
        <p className="text-center text-gray-600 text-lg">No rooms found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {rooms.map((room) => (
          <div
            key={room._id}
            className="border rounded-lg shadow-md hover:shadow-lg transition p-4 flex flex-col bg-white"
          >
            <img
              src={room.image[0] || "/placeholder.png"}
              alt={room.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="font-semibold text-xl text-gray-900">{room.name}</h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-3">
              {room.aboutRoom}
            </p>
            <p className="text-sm text-gray-700 mb-1">
              <strong>Type:</strong> {room.type}
            </p>
            <p className="text-sm text-gray-700 mb-1">
              <strong>Price:</strong> ${room.price}
            </p>
            <p className="text-sm text-gray-700 mb-4">
              <strong>Max Guests:</strong> {room.maxGuests}
            </p>

            <div className="mt-auto flex justify-between gap-3">
              <button
                onClick={() => navigate(`/edit/${room._id}`)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Edit
              </button>
              <button
                onClick={() => removeRoom(room._id)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminRoomList;
