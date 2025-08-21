
import React, { useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/Context";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { UserCircle } from "lucide-react";

const Navigation = () => {
  const navigate = useNavigate();
  const { user, logout } = useAppContext();
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/rooms", label: "Rooms" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();
    setShowDropdown(false);
    navigate("/signin");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={assets.room}
            alt="Hotel Logo"
            className="w-14 h-14 rounded-full shadow-md object-cover border border-gray-200"
          />
          <span className="font-serif text-xl tracking-wide text-gray-900">
            LuxeStay
          </span>
        </div>

        <ul className="hidden md:flex items-center gap-10">
          {navLinks.map(({ path, label }) => (
            <NavLink
              key={label}
              to={path}
              className={({ isActive }) =>
                `relative font-normal uppercase tracking-widest transition-all duration-300 
                 ${
                   isActive
                     ? "text-yellow-600"
                     : "text-gray-800 hover:text-yellow-600"
                 }`
              }
            >
              {label}
              <span
                className="absolute left-1/2 -bottom-1 w-0 h-[1px] bg-yellow-600 transition-all duration-300 
                           transform -translate-x-1/2 group-hover:w-full"
              ></span>
            </NavLink>
          ))}
        </ul>

        <div className="flex items-center gap-6">
          <div className="relative hidden md:block">
            <div
              className="cursor-pointer flex items-center gap-2"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              {user?.email ? (
                <span className="font-medium text-gray-800 hover:text-yellow-600 transition">
                  {user.email.split("@")[0]}
                </span>
              ) : (
                <UserCircle size={32} className="text-gray-700 hover:text-yellow-600 transition" />
              )}
            </div>

            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden"
                >
                  <ul className="text-gray-700 text-sm">
                    {user ? (
                      <>
                        <li
                          className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setShowDropdown(false);
                            navigate("/my-bookings");
                          }}
                        >
                          My Bookings
                        </li>
                        <li
                          className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                          onClick={handleLogout}
                        >
                          Logout
                        </li>
                      </>
                    ) : (
                      <li
                        className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setShowDropdown(false);
                          navigate("/signin");
                        }}
                      >
                        Sign In
                      </li>
                    )}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Button */}
          <div
            className="md:hidden cursor-pointer"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? (
              <HiOutlineX size={28} className="text-gray-800" />
            ) : (
              <HiOutlineMenuAlt3 size={28} className="text-gray-800" />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 flex flex-col px-6 py-10"
          >
            <ul className="flex flex-col gap-6 text-gray-800 text-lg font-medium">
              {navLinks.map(({ path, label }) => (
                <NavLink
                  key={label}
                  to={path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-yellow-600 transition"
                >
                  {label}
                </NavLink>
              ))}
              {user ? (
                <>
                  <li
                    onClick={() => {
                      navigate("/my-bookings");
                      setMobileMenuOpen(false);
                    }}
                    className="hover:text-yellow-600 cursor-pointer"
                  >
                    My Bookings
                  </li>
                  <li
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="hover:text-yellow-600 cursor-pointer"
                  >
                    Logout
                  </li>
                </>
              ) : (
                <li
                  onClick={() => {
                    navigate("/signin");
                    setMobileMenuOpen(false);
                  }}
                  className="hover:text-yellow-600 cursor-pointer"
                >
                  Sign In
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;


