
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import assets from "../assets/assets";


const AMENITIES_OPTIONS = ["wifi", "pool", "gym", "parking"];

const UpdateRoom = ({ token, onUpdated }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [room, setRoom] = useState(null);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [aboutRoom, setAboutRoom] = useState("");
  const [type, setType] = useState("suite");
  const [price, setPrice] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  // Fetch room data on mount
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setLoading(true);
        const res = await axios.post("http://localhost:7000/api/room/single", { id });
        if (res.data.success) {
          setRoom(res.data.room);
          setName(res.data.room.name);
          setAboutRoom(res.data.room.aboutRoom);
          setType(res.data.room.type);
          setPrice(res.data.room.price);
          setMaxGuests(res.data.room.maxGuests);
          setAmenities(res.data.room.amenities || []);
        } else {
          setError(res.data.message || "Failed to load room");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  const toggleAmenity = (amenity) => {
    setAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      formData.append("id", id);
      formData.append("name", name);
      formData.append("aboutRoom", aboutRoom);
      formData.append("type", type);
      formData.append("price", price);
      formData.append("maxGuests", maxGuests);
      formData.append("amenities", JSON.stringify(amenities));

      const res = await axios.post(
        "http://localhost:7000/api/room/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        toast.success("Room updated successfully");
        if (onUpdated) onUpdated();
        else navigate("/list"); // fallback redirect
      } else {
        toast.error(res.data.message || "Update failed");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) return <p className="p-4">Loading room data...</p>;
  if (error) return <p className="p-4 text-red-600">Error: {error}</p>;

  return (
    <div className="max-w-lg mx-auto p-6 border rounded shadow mt-6 bg-white">
      <h2 className="text-2xl font-bold mb-4">Update Room</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Room Name</label>
          <input
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* About Room */}
        <div>
          <label className="block mb-1 font-medium">About Room</label>
          <textarea
            rows={4}
            value={aboutRoom}
            required
            onChange={(e) => setAboutRoom(e.target.value)}
            className="w-full border px-3 py-2 rounded resize-none outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Amenities */}
        <div>
          <label className="block mb-1 font-medium">Amenities</label>
          <div className="flex gap-4 flex-wrap">
            {AMENITIES_OPTIONS.map((a) => (
              <label key={a} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={amenities.includes(a)}
                  onChange={() => toggleAmenity(a)}
                />
                <span className="capitalize">{a}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Type */}
        <div>
          <label className="block mb-1 font-medium">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border px-3 py-2 rounded outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="single">Single</option>
            <option value="double">Double</option>
            <option value="suite">Suite</option>
            <option value="deluxe">Deluxe</option>
          </select>
        </div>

        {/* Price and Max Guests */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1 font-medium">Price</label>
            <input
              type="number"
              value={price}
              required
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border px-3 py-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-medium">Max Guests</label>
            <input
              type="number"
              value={maxGuests}
              required
              onChange={(e) => setMaxGuests(e.target.value)}
              className="w-full border px-3 py-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Images */}
        <p className="text-base font-medium">Room Image</p>
                  <div className="flex flex-wrap items-center gap-3 mt-2">
        
                      <label htmlFor="image1">
                        <img className="w-20 cursor-pointer" src={!image1 ? assets.upload : URL.createObjectURL(image1 )} alt="" />
                        <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
                      </label>
        
                       <label htmlFor="image2">
                        <img className=" cursor-pointer w-20" src={!image2 ? assets.upload : URL.createObjectURL(image2 )} alt="" />
                        <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
                      </label>
                          
                      <label htmlFor="image3">
                        <img className="w-20 cursor-pointer" src={!image3 ? assets.upload : URL.createObjectURL(image3)} alt="" />
                        <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
                      </label>
        
                       <label htmlFor="image4">
                        <img className="w-20 cursor-pointer" src={!image4 ? assets.upload : URL.createObjectURL(image4)} alt="" />
                        <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
                      </label>
                           
                  </div>

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={() => navigate("/list")}
            className="px-5 py-2 bg-gray-400 rounded hover:bg-gray-500 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateRoom;
