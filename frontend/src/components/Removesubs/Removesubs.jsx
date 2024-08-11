import React, { useState } from 'react';
import axios from 'axios';
import { IoCloseOutline } from 'react-icons/io5';

const Removesubs = ({ showRemovesubs, setShowPopup7, sellername }) => {
  const [id, setId] = useState('');
  const [planname, setPlanname] = useState('');

  const handleRemoveplan= async (e) => {
    e.preventDefault();

    const userData = {
      id,
      planname,
      sellername
    };

    try {
      const response = await axios.post('http://localhost:3002/api/removesubs', userData);
      console.log(response.data.message);
      alert("Removed subscription Plan successfully");
      setShowPopup7(false);
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error('Server Error:', error.response.data);
        alert(`Server Error: ${error.response.data.message || error.response.statusText}`);
      } else if (error.request) {
        // Request was made but no response received
        console.error('Network Error:', error.request);
        alert('Network Error: No response received from the server.');
      } else {
        // Something else happened while setting up the request
        console.error('Error:', error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <>
      {showRemovesubs && (
        <div className='h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm'>
          <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-white rounded-md duration-200 w-[300px]'>
            {/* Header section */}
            <div className='flex items-center justify-between'>
              <div>
                <h1 className='text-2xl font-bold text-dark'>Removing meal Subscription plan</h1>
              </div>
              <div>
                <IoCloseOutline
                  className='text-2xl cursor-pointer'
                  onClick={() => setShowPopup7(false)}
                />
              </div>
            </div>
            {/* Add dish form section */}
            <form onSubmit={handleRemoveplan} className='mt-4'>
            <input
                type="text"
                placeholder='Enter meal subscription plan ID:'
                className='w-full rounded-md border border-gray-300 dark:border-gray-500 px-2 py-1 mb-4'
                value={id}
                onChange={(e) => setId(e.target.value)}
                autoComplete="id"
              />
              <input
                type="text"
                placeholder='Enter name of the meal subscription plan:'
                className='w-full rounded-md border border-gray-300 dark:border-gray-500 px-2 py-1 mb-4'
                value={planname}
                onChange={(e) => setPlanname(e.target.value)}
                autoComplete="planname"
              />
              <input
                type="text"
                placeholder='Tiffin service seller name:'
                className='w-full rounded-md border border-gray-300 dark:border-gray-500 px-2 py-1 mb-4'
                value={sellername}
                readOnly
              />
              {/* Submit button section */}
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

export default Removesubs;
