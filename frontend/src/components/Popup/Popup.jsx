import React, { useState } from 'react';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { IoCloseOutline } from 'react-icons/io5';
import axios from 'axios'; // Import axios

const Popup = ({ showPopup, setShowPopup, handleLogin }) => {
  const [userType, setUserType] = useState('Seller');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!username ||!password) {
      alert("Please enter both username and password");
      return;
    }
  
    const userData = {
      userType,
      username,
      password
    };
  
    try {
      const response = await axios.post("/.netlify/functions/login", userData);
      if (response.data.message === "Login successful") {
        alert("Login successful");
        handleLogin(response.data.userId, userType);
        setShowPopup(false);
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error);
        console.error("Error response:", error.response);
        console.error("Error config:", error.config);
        alert(`An error occurred during login: ${error.response? error.response.data.message : error.message}`);
      } else {
        console.error("Unknown error:", error);
        alert("An unknown error occurred during login");
      }
    }
  };
  return (
    <>
      {showPopup && (
        <div>
          <div className='h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm'>
            <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-white rounded-md duration-200 w-[300px]'>
              <div className='flex items-center justify-between'>
                <div>
                  <h1 className='text-2xl font-bold text-dark'>Login</h1>
                </div>
                <div>
                  <IoCloseOutline
                    className='text-2xl cursor-pointer'
                    onClick={() => setShowPopup(false)}
                  />
                </div>
              </div>
              <form onSubmit={handleSubmit} className='mt-4'>
                <select
                  value={userType}
                  onChange={e => setUserType(e.target.value)}
                  className='w-full rounded-md border border-gray-300 dark:border-gray-500 px-2 py-1 mb-4'
                >
                  <option value="Admin">Admin</option>
                  <option value="Seller">Tiffin Service Seller</option>
                  <option value="User">Service User</option>
                </select>
                <input
                  type="text"
                  placeholder='Enter Username'
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className='w-full rounded-md border border-gray-300 dark:border-gray-500 px-2 py-1 mb-4'
                  autoComplete="username"
                />
                <input
                  type="password"
                  placeholder='Enter Password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className='w-full rounded-md border border-gray-300 dark:border-gray-500 px-2 py-1 mb-4'
                  autoComplete="current-password"
                />
                <div>
                  <button
                    type="submit"
                    className='w-full bg-primary text-white p-2 rounded-md hover:scale-105 duration-200'
                  >
                    Login
                  </button>
                </div>
              </form>
              <div className='mt-4'>
                <p className='text-center'>or Login with</p>
                <div className='flex justify-center gap-2 mt-2'>
                  <FaFacebook className='text-3xl hover:text-blue-500 duration-200' />
                  <FaGoogle className='text-3xl hover:text-primary duration-200' />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
