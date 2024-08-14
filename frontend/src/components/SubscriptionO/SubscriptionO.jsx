import React, { useState } from 'react';
import axios from 'axios';
import { IoCloseOutline } from 'react-icons/io5';

const SubscriptionO = ({ showSubscriptionO, setShowPopup17 ,setOrdersubs,username}) => {
    const [password, setPassword] =useState('');
    const [s_id, setS_id] =useState('');


  const handleAvailable = async (e) => {
    e.preventDefault();

    const userData = {
      username,
      s_id,
      password
    };

    try {
      const response = await axios.post("http://localhost:3002/api/subscriptiono", userData);

      if (response.data.message === "Successfully Fetched Data") {
        alert("Data fetched successfully");// Update meal data in App component
        setOrdersubs(response.data.data);
        setShowPopup17(false); // Close the popup after data is set
      } else {
        alert("No meals Subscription found for the given criteria");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error);
        console.error("Error response:", error.response);
        console.error("Error config:", error.config);
        alert(`An error occurred during fetching: ${error.response ? error.response.data.message : error.message}`);
      } else {
        console.error("Unknown error:", error);
        alert("An unknown error occurred during fetching");
      }
    }
  };

  return (
    <>
      {showSubscriptionO && (
        <div className='h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm'>
          <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-white rounded-md duration-200 w-[300px]'>
            <div className='flex items-center justify-between'>
              <div>
                <h1 className='text-2xl font-bold text-dark'>Availed Subscriptions</h1>
              </div>
              <div>
                <IoCloseOutline
                  className='text-2xl cursor-pointer'
                  onClick={() => setShowPopup17(false)}
                />
              </div>
            </div>
            <form onSubmit={handleAvailable} className='mt-4'>
            <input
                type="text"
                placeholder='UserName:'
                className='w-full rounded-md border border-gray-300 dark:border-gray-500 px-2 py-1 mb-4'
                value={username}
                readOnly
              />
              <input
                type="text"
                placeholder='Enter Subscription no:'
                className='w-full rounded-md border border-gray-300 dark:border-gray-500 px-2 py-1 mb-4'
                value={s_id}  
                onChange={e => setS_id(e.target.value)}
                autoComplete="s_id"
              />
              <input
                type="text"
                placeholder='Enter your subscription password:'
                className='w-full rounded-md border border-gray-300 dark:border-gray-500 px-2 py-1 mb-4'
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="password"
              />
              <div>
                <button
                  type="submit"
                  className='w-full bg-primary text-white p-2 rounded-md hover:scale-105 duration-300 hover:bg-secondary'
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SubscriptionO;
