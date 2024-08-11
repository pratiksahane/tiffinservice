import React, { useState } from 'react';
import axios from 'axios';
import { IoCloseOutline } from 'react-icons/io5';

const Addsubs = ({ showAddsubs, setShowPopup6 ,sellername}) => {
  const [type, setType] = useState('veg');
  const [planname, setPlanname] = useState('');
  const [days, setDays] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleAddsubs = async (e) => {
    e.preventDefault();

    const userData = {
      type,
      planname,
      sellername,
      days,
      price,
      description
    };

    try {
      const response = await axios.post('http://localhost:3002/api/adddsubs', userData);
      console.log(response.data.message);
      alert("Added Subscription Plan successfully");
      setShowPopup6(false);
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
      {showAddsubs && (
        <div className='h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm'>
          <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-white rounded-md duration-200 w-[300px]'>
            {/* Header section */}
            <div className='flex items-center justify-between'>
              <div>
                <h1 className='text-2xl font-bold text-dark'>Adding new Subscription plan</h1>
              </div>
              <div>
                <IoCloseOutline
                  className='text-2xl cursor-pointer'
                  onClick={() => setShowPopup6(false)}
                />
              </div>
            </div>
            {/* Add dish form section */}
            <form onSubmit={handleAddsubs} className='mt-4'>
              <select
                className='w-full rounded-md border border-gray-300 dark:border-gray-500 px-2 py-1 mb-4'
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="veg">Vegetarian</option>
                <option value="non-veg">Non-Vegetarian</option>
              </select>
              <input
                type="text"
                placeholder='Enter name of the subscription plan:'
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
              <input
                type="text"
                placeholder='Enter validity:'
                className='w-full rounded-md border border-gray-300 dark:border-gray-500 px-2 py-1 mb-4'
                value={days}
                onChange={(e) => setDays(e.target.value)}
                autoComplete="days"
              />
              <input
                type="text"
                placeholder='Enter money to be paid:'
                className='w-full rounded-md border border-gray-300 dark:border-gray-500 px-2 py-1 mb-4'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                autoComplete="price"
              />
              <textarea
                placeholder='Enter description:'
                className='w-full rounded-md border border-gray-300 dark:border-gray-500 px-2 py-1 mb-4'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                autoComplete="description"
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

export default Addsubs;
