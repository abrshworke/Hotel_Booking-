

import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = ({setToken}) => {

  const navigate = useNavigate();
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  
  
  const onSubminHandler = async (e) => {
    try {
      e.preventDefault('');

      const responses = await axios.post( 'http://localhost:7000/api/user/admin', {email , password})
      if (responses.data.success) {
         toast.success(responses.data.message)
         setToken(responses.data.token);
         localStorage.setItem("token", responses.data.token); // store token for later requests
         setEmail('');
         setPassword('');
         navigate('/admin'); 

      } else {
        toast.error(responses.data.message)
      }
      
    } catch (error) {
        console.log(error);
        toast.error(responses.data.message)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Sign In</h2>
        <form onSubmit={onSubminHandler} className="space-y-4">
         
          <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          name="email"
          required
          placeholder="Email"
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

          <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          name="password"
          required
          placeholder="Password"
          
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
       
      </div>
    </div>
  );
};


export default Login;



