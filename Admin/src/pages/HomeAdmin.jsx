


import React, { useEffect, useState } from "react";
import axios from "axios";
import assets from "../assets/assets";
import { toast } from "react-toastify";

const AdminPanel = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [features, setFeatures] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [offers, setOffers] = useState([]);

  const [featureForm, setFeatureForm] = useState({
    name: "",
    hotelService: "",
    price: "",
  });
  const [amenityForm, setAmenityForm] = useState({
    title: "",
    description: "",
    icon: "",
  });
  const [offerForm, setOfferForm] = useState({
    title: "",
    description: "",
    icon: "",
  });

  const apiBase = "http://localhost:7000/api/hotel";

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [fRes, aRes, oRes] = await Promise.all([
        axios.get(`${apiBase}/feature/all`),
        axios.get(`${apiBase}/amenities/all`),
        axios.get(`${apiBase}/offer/all`),
      ]);
      setFeatures(fRes.data.allHotelFeature || []);
      setAmenities(aRes.data.allAmenities || []);
      setOffers(oRes.data.allExclusiveOffer || []);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleFeatureChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image1") {
      setFeatureForm((prev) => ({ ...prev, image1: files[0] }));
    } else {
      setFeatureForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const submitFeature = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      image1 && formData.append("image1", image1);
      formData.append("name", featureForm.name);
      formData.append(
        "hotelService",
        JSON.stringify(featureForm.hotelService.split(","))
      );
      formData.append("price", featureForm.price);

      const response = await axios.post(`${apiBase}/feature/add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success(response.data.message || "Feature added successfully!");
        setImage1(false);
        fetchAll();
      } else {
        toast.error(response.data.message || "Failed to add feature.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error adding feature");
    }
  };

  const submitAmenity = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiBase}/amenities/add`, amenityForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAmenityForm({ title: "", description: "", icon: "" });
      fetchAll();
      toast.success("Amenity added successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Error adding amenity");
    }
  };

  const submitOffer = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiBase}/offer/add`, offerForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOfferForm({ title: "", description: "", icon: "" });
      fetchAll();
      toast.success("Offer added successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Error adding offer");
    }
  };

  const deleteFeature = async (id) => {
    if (!window.confirm("Delete this feature?")) return;
    try {
      await axios.post(
        `${apiBase}/feature/remove`,
        { id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchAll();
    } catch (error) {
      console.error(error);
      toast.error("Error deleting feature");
    }
  };

  const deleteAmenity = async (id) => {
    if (!window.confirm("Delete this amenity?")) return;
    try {
      await axios.post(
        `${apiBase}/amenities/remove`,
        { id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchAll();
    } catch (error) {
      console.error(error);
      toast.error("Error deleting amenity");
    }
  };

  const deleteOffer = async (id) => {
    if (!window.confirm("Delete this offer?")) return;
    try {
      await axios.post(
        `${apiBase}/offer/remove`,
        { id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchAll();
    } catch (error) {
      console.error(error);
      toast.error("Error deleting offer");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-12">
      {/* Hotel Features */}
      <section className="bg-white shadow-lg rounded-xl p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Hotel Features</h2>

        <form
          onSubmit={submitFeature}
          className="flex flex-col md:flex-row gap-4 flex-wrap items-end"
          encType="multipart/form-data"
        >
          <input
            type="text"
            name="name"
            placeholder="Feature Name"
            value={featureForm.name}
            onChange={handleFeatureChange}
            className="border border-gray-300 p-3 rounded-lg flex-grow focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            name="hotelService"
            placeholder="Services (comma separated)"
            value={featureForm.hotelService}
            onChange={handleFeatureChange}
            className="border border-gray-300 p-3 rounded-lg flex-grow focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={featureForm.price}
            onChange={handleFeatureChange}
            className="border border-gray-300 p-3 rounded-lg w-28 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <label htmlFor="image1" className="cursor-pointer">
            <img
              className="w-20 h-20 object-cover rounded-lg border border-gray-300 hover:opacity-80 transition"
              src={
                !image1 ? assets.upload : URL.createObjectURL(image1)
              }
              alt="Upload"
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Add Feature
          </button>
        </form>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {features.map(({ _id, name, price, image, hotelService }) => (
            <div
              key={_id}
              className="bg-gray-50 rounded-xl shadow hover:shadow-lg transition p-4 relative"
            >
              <img
                src={image}
                alt={name}
                className="w-full h-36 object-cover rounded-lg mb-3"
              />
              <h3 className="font-semibold text-lg">{name}</h3>
              <p className="text-blue-600 font-medium">{price} / night</p>
              <ul className="text-sm text-gray-600 list-disc list-inside mb-4">
                {(hotelService || []).map((service, idx) => (
                  <li key={idx}>{service}</li>
                ))}
              </ul>
              <button
                onClick={() => deleteFeature(_id)}
                className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition text-sm"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Amenities */}
      <section className="bg-white shadow-lg rounded-xl p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Amenities</h2>

        <form
          onSubmit={submitAmenity}
          className="flex flex-col md:flex-row gap-4 flex-wrap items-end"
        >
          <input
            type="text"
            name="title"
            placeholder="Amenity Title"
            value={amenityForm.title}
            onChange={(e) =>
              setAmenityForm((prev) => ({ ...prev, title: e.target.value }))
            }
            className="border border-gray-300 p-3 rounded-lg flex-grow focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={amenityForm.description}
            onChange={(e) =>
              setAmenityForm((prev) => ({ ...prev, description: e.target.value }))
            }
            className="border border-gray-300 p-3 rounded-lg flex-grow focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            type="text"
            name="icon"
            placeholder="Icon (text or emoji)"
            value={amenityForm.icon}
            onChange={(e) =>
              setAmenityForm((prev) => ({ ...prev, icon: e.target.value }))
            }
            className="border border-gray-300 p-3 rounded-lg w-32 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Add Amenity
          </button>
        </form>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {amenities.map(({ _id, title, description, icon }) => (
            <div
              key={_id}
              className="bg-gray-50 rounded-xl shadow hover:shadow-lg transition p-6 relative text-center"
            >
              <div className="text-4xl mb-3">{icon}</div>
              <h3 className="font-semibold text-lg">{title}</h3>
              <p className="text-gray-600 text-sm">{description}</p>
              <button
                onClick={() => deleteAmenity(_id)}
                className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition text-sm"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Exclusive Offers */}
      <section className="bg-white shadow-lg rounded-xl p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Exclusive Offers</h2>

        <form
          onSubmit={submitOffer}
          className="flex flex-col md:flex-row gap-4 flex-wrap items-end"
        >
          <input
            type="text"
            name="title"
            placeholder="Offer Title"
            value={offerForm.title}
            onChange={(e) =>
              setOfferForm((prev) => ({ ...prev, title: e.target.value }))
            }
            className="border border-gray-300 p-3 rounded-lg flex-grow focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={offerForm.description}
            onChange={(e) =>
              setOfferForm((prev) => ({ ...prev, description: e.target.value }))
            }
            className="border border-gray-300 p-3 rounded-lg flex-grow focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <input
            type="text"
            name="icon"
            placeholder="Icon (text or emoji)"
            value={offerForm.icon}
            onChange={(e) =>
              setOfferForm((prev) => ({ ...prev, icon: e.target.value }))
            }
            className="border border-gray-300 p-3 rounded-lg w-32 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            type="submit"
            className="bg-purple-600 text-white px-5 py-3 rounded-lg hover:bg-purple-700 transition"
          >
            Add Offer
          </button>
        </form>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {offers.map(({ _id, title, description, icon }) => (
            <div
              key={_id}
              className="bg-gray-50 rounded-xl shadow hover:shadow-lg transition p-6 relative text-center"
            >
              <div className="text-4xl mb-3">{icon}</div>
              <h3 className="font-semibold text-lg">{title}</h3>
              <p className="text-gray-600 text-sm">{description}</p>
              <button
                onClick={() => deleteOffer(_id)}
                className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition text-sm"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminPanel;
