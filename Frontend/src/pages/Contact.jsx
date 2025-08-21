
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:7000/api/feedback/send",
        form
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setForm({ name: "", email: "", message: "" });
      } else {
        toast.error(res.data.message || "Failed to send feedback");
      }
    } catch (error) {
      toast.error(error.message || "Error sending feedback");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 sm:py-24">
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-12">
        Contact Us
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="bg-indigo-50 rounded-xl p-8 shadow-md space-y-6">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Have a question or feedback? We’d love to hear from you. Fill out
            the form or use the contact details below to reach us directly.
          </p>
          <div className="flex items-center space-x-4">
            <FaMapMarkerAlt className="text-indigo-600 w-6 h-6" />
            <span className="text-gray-800">123 Addis Ababa Street, Ethiopia</span>
          </div>
          <div className="flex items-center space-x-4">
            <FaPhoneAlt className="text-indigo-600 w-6 h-6" />
            <span className="text-gray-800">+251 920052836</span>
          </div>
          <div className="flex items-center space-x-4">
            <FaEnvelope className="text-indigo-600 w-6 h-6" />
            <span className="text-gray-800">abrehamworke78@gmail.com</span>
          </div>
        </div>

        {/* Feedback Form */}
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Send Us a Message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
            >
              Submit Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
