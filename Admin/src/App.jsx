
import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Admin from "./pages/admin";
import Login from "./components/Login";
import AddRoom from "./pages/RoomForm";
import UpdateRoom from "./pages/EditRoom";
import AdminRoomList from "./pages/RoomList";
import AdminBookingList from "./pages/AdminBookingList";
import AdminFeedbackList from "./pages/Feedback";
import AdminNavbar from "./components/Navigation";
import AdminPanel from "./pages/HomeAdmin";

const App = () => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const location = useLocation();

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // Hide navbar on login page ("/")
  const hideNav = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-700">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />

      {!hideNav && token && <AdminNavbar onLogout={setToken} />}

      <main className="flex flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <section className="flex-1 bg-white rounded-md shadow p-6">
          <Routes>
            <Route path="/" element={<Login setToken={setToken} />} />
            <Route path="/admin" element={<Admin token={token} />} />
            <Route path="/add" element={<AddRoom token={token} />} />
            <Route path="/edit/:id" element={<UpdateRoom token={token} />} />
            <Route path="/list" element={<AdminRoomList token={token} />} />
            <Route path="/booking" element={<AdminBookingList token={token} />} />
            <Route path="/feedback" element={<AdminFeedbackList token={token} />} />
            <Route path="/home" element={<AdminPanel token={token} />} />
          </Routes>
        </section>
      </main>

      <hr className="border-gray-300" />
    </div>
  );
};

export default App;
