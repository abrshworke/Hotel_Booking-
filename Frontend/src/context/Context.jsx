
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from "axios";
import { toast } from "react-toastify";


const BookingContext = createContext();
export const useAppContext = () => useContext(BookingContext);
export const backendURL = import.meta.env.VITE_BACKEND_URL;

const BookingcontextProvider = ({ children }) => {
 
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(null);

  // // ------------------- Load User -------------------
  
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const res = await axios.get(`${backendURL}api/user/me`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(res.data);
        } catch (err) {
          console.error("User fetch failed", err);
          logout();
        }
      }
    };
    fetchUser();
  }, [token]);

  // ------------------- Logout Function -------------------

  const logout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('token');
  };

  // ------------------- Feedback Functions -------------------

  const submitFeedback = async ({ name, email, message }) => {
  try {
    const res = await axios.post(`${backendURL}api/feedback/add`, {
      name,
      email,
      message
    }, token ? {
      headers: { Authorization: `Bearer ${token}` }
    } : {});
    
    if (res.data.success) toast.success("Feedback submitted!");
    else toast.error(res.data.message);
  } catch (err) {
    toast.error("Error submitting feedback");
  }
};


  // ------------------- Context Value -------------------
  const value = {

    user,
    token,
    setToken,
    logout,
    backendURL,
    submitFeedback,
    
    
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};

export default BookingcontextProvider;



