
// import React from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { Home, BedDouble, BookOpen, PlusCircle, MessageSquare, LogOut } from "lucide-react"; 
// import assets from "../assets/assets";


// const AdminNavbar = ({ onLogout }) => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     if (onLogout) onLogout("");
//     navigate("/");
//   };

//   const navLinks = [
//     { to: "/home", label: "Dashboard", icon: <Home size={18} /> },
//     { to: "/list", label: "Rooms", icon: <BedDouble size={18} /> },
//     { to: "/booking", label: "Bookings", icon: <BookOpen size={18} /> },
//     { to: "/feedback", label: "Feedback", icon: <MessageSquare size={18} /> },
//     { to: "/add", label: "Add Room", icon: <PlusCircle size={18} /> },
//   ];

//   return (
//     <header className="backdrop-blur-md bg-white/10 border-b border-white/20 shadow-lg sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        
//         <div 
//           className="flex items-center space-x-2 cursor-pointer"
//           onClick={() => navigate("/admin")}
//         >
//           <img src={assets.admin} alt="Admin Logo" className="h-10 w-10 rounded-full border border-white/30" />
//           <span className="text-lg font-semibold text-white">Admin Panel</span>
//         </div>

//         {/* Navigation Links */}
//         <nav className="flex space-x-4">
//           {navLinks.map(({ to, label, icon }) => (
//             <NavLink
//               key={to}
//               to={to}
//               className={({ isActive }) =>
//                 `flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
//                   isActive
//                     ? "bg-blue-600 text-white shadow-md"
//                     : "text-white hover:bg-white/20 hover:text-blue-300"
//                 }`
//               }
//             >
//               {icon}
//               <span>{label}</span>
//             </NavLink>
//           ))}
//         </nav>

//         <button
//           onClick={handleLogout}
//           className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300"
//         >
//           <LogOut size={18} />
//           <span>Logout</span>
//         </button>
//       </div>
//     </header>
//   );
// };

// export default AdminNavbar;





import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, BedDouble, BookOpen, PlusCircle, MessageSquare, LogOut } from "lucide-react"; 
import assets from "../assets/assets";

const AdminNavbar = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    if (onLogout) onLogout("");
    navigate("/");
  };

  const navLinks = [
    { to: "/home", label: "Dashboard", icon: <Home size={20} /> },
    { to: "/list", label: "Rooms", icon: <BedDouble size={20} /> },
    { to: "/booking", label: "Bookings", icon: <BookOpen size={20} /> },
    { to: "/feedback", label: "Feedback", icon: <MessageSquare size={20} /> },
    { to: "/add", label: "Add Room", icon: <PlusCircle size={20} /> },
  ];

  return (
    <header className="bg-gray-900 shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        
        {/* Logo */}
        <div 
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => navigate("/admin")}
        >
          <img 
            src={assets.admin} 
            alt="Admin Logo" 
            className="h-12 w-12 rounded-full border-2 border-gray-700 shadow-md"
          />
          <span className="text-xl font-bold text-white tracking-wide">
            Gebeya Admin
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-3">
          {navLinks.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`
              }
            >
              {icon}
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-md font-semibold transition-all duration-300"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default AdminNavbar;
