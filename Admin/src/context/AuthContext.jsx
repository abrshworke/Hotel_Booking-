


// // src/context/AuthContext.jsx
// import { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(() => localStorage.getItem('token') || '');

//   useEffect(() => {
//     localStorage.setItem('token', token);
//   }, [token]);

//   return (
//     <AuthContext.Provider value={{ token, setToken }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);






// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { products as staticProducts } from '../assets/assets';
// import { toast } from "react-toastify";
// import axios from "axios";
// import { BackendURL } from '../App';


// const ShopContext = createContext();
// export const useAdminContext = () => useContext(ShopContext);
// const ShopcontextProvider = ({ children }) => {

//   const currency = "$";

//   const [products, setProducts] = useState([]);
//   const [allProducts] = useState(staticProducts);
 
//   useEffect(() => {
//     setProducts(staticProducts);
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);


// // const getAllFeedback = async () => {
// //   try {
// //     const token = localStorage.getItem('token');
// //     const res = await axios.get(`${BackendURL}api/feedback/get`, {
// //       headers: { Authorization: `Bearer ${token}` }
// //     });
// //     return Array.isArray(res.data) ? res.data : [];
// //   } catch (err) {
// //     toast.error("Failed to fetch feedback");
// //     return [];
// //   }
// // };

//   const value = {
    
//     currency,
//     products,
//     setProducts,
//     allProducts,
//     // getAllFeedback
    
//   };

  
//   return (
//     <ShopContext.Provider value={value}>
//       {children}
//     </ShopContext.Provider>
//   );
// };

// export default ShopcontextProvider;

