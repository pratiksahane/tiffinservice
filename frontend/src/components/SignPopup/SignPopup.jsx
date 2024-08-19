import React, { useState } from 'react';
import axios from 'axios';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { IoCloseOutline } from 'react-icons/io5';

const SignPopup = ({ showPopup1, setShowPopup1 }) => {
  const [userType, setUserType] = useState('Seller');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();  // Prevent the default form submission behavior

    const userData = {
      userType,
      email,
      password,
      username
    };

    axios.post('http://localhost:3002/api/signup', userData)
      .then(response => {
        console.log(response.data.message);
        alert("Signed Up Successfully");
        setShowPopup1(false);
      })
      .catch(error => {
        console.error('There was an error!', error);
        alert(`An error occurred during signup: ${error.message}`);
      });
  };

  return (
    <>
      {showPopup1 && (
        <div className='h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm'>
          <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-white rounded-md duration-200 w-[300px]'>
            {/* Header section */}
            <div className='flex items-center justify-between'>
              <div>
                <h1 className='text-2xl font-bold text-dark'>Sign Up</h1>
              </div>
              <div>
                <IoCloseOutline
                  className='text-2xl cursor-pointer'
                  onClick={() => setShowPopup1(false)}
                />
              </div>
            </div>
            {/* Signup form section */}
            <form onSubmit={handleSignIn} className='mt-4'>
              <select
                className='w-full rounded-md border border-gray-300 dark:border-gray-500 px-2 py-1 mb-4'
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="Seller">Tiffin Service Seller</option>
                <option value="User">Service User</option>
              </select>
              <input
                type="email"
                placeholder='Enter Email'
                className='w-full rounded-md border border-gray-300 dark:border-gray-500 px-2 py-1 mb-4'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
              <input
                type="password"
                placeholder='Enter Password'
                className='w-full rounded-md border border-gray-300 dark:border-gray-500 px-2 py-1 mb-4'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
              <input
                type="text"
                placeholder='Set Username'
                className='w-full rounded-md border border-gray-300 dark:border-gray-500 px-2 py-1 mb-4'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
              />
              {/* Signup button section */}
              <div>
                <button
                  type="submit"
                  className='w-full bg-primary text-white p-2 rounded-md'
                >
                  Sign Up
                </button>
              </div>
              {/* Social Login */}
              <div className='mt-4'>
                <p className='text-center'>or Sign in with</p>
                <div className='flex justify-center gap-2 mt-2'>
                <a href="https://www.facebook.com/r.php/" target="_blank" rel="noopener noreferrer">
                  <FaFacebook className="text-3xl hover:text-blue-500 duration-200" />
                </a>
                <a href="https://accounts.google.com" target="_blank" rel="noopener noreferrer">
                <FaGoogle className="text-3xl hover:text-primary duration-200" />
                </a>

                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SignPopup;