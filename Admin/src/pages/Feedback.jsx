
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const AdminFeedbackList = ({ token }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await axios.get("http://localhost:7000/api/feedback/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFeedbacks(res.data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, [token]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-lg text-gray-400 animate-pulse">Loading feedback...</p>
      </div>
    );

  if (feedbacks.length === 0)
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-lg text-gray-500">No feedback available.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-12 px-4 md:px-12">
      <h2 className="text-4xl md:text-5xl font-bold text-yellow-400 text-center mb-12 tracking-wide">
        User Feedback
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {feedbacks.map(({ _id, name, email, message, createdAt }, idx) => (
          <motion.div
            key={_id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
            className="relative bg-black/60 backdrop-blur-md border border-yellow-500/30 rounded-2xl shadow-2xl p-6 hover:scale-105 transform transition-all duration-300"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-semibold text-yellow-400 truncate">{name}</h3>
              <time
                className="text-sm text-gray-400"
                dateTime={new Date(createdAt).toISOString()}
                title={new Date(createdAt).toLocaleString()}
              >
                {new Date(createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
            </div>

            {/* Email */}
            <p className="text-sm text-gray-300 mb-4">{email}</p>

            {/* Message */}
            <p className="text-gray-100 whitespace-pre-wrap leading-relaxed">{message}</p>
            
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminFeedbackList;
