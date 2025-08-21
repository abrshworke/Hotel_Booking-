


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAppContext } from '../context/Context';

const SignUp = () => {

  const navigate = useNavigate();
  const { setToken, backendURL } = useAppContext();
  const [ firstName, setFirstName] = useState('');
  const [ lastName , setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendURL}api/user/register`, {
        firstName,
        lastName,
        email,
        password,
      });

      if (response.data.token) {
        toast.success('Registered successfully! Please sign in.');
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        navigate('/signin');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-green-600">Sign Up</h2>
        <form onSubmit={onSubmitHandler} className="space-y-4">
          <input
            type="text"
            required
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="text"
            required
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="email"
            required
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            Register
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{' '}
          <span
            className="text-green-600 cursor-pointer hover:underline"
            onClick={() => navigate('/signin')}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

