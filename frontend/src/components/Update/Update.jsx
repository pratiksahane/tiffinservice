import React, { useState } from 'react';
import axios from 'axios';
import { IoCloseOutline } from 'react-icons/io5';

const Update = ({ showUpdate, setShowPopup16 ,username}) => {
  const [status, setStatus] = useState('ongoing');
  const [order_id, setOrderId] = useState('');

  const handleAvailable = async (e) => {
    e.preventDefault();

    const userData = {
      username,
      order_id,
      status
    };

    axios.post('http://localhost:3002/api/update', userData)
      .then(response => {
        console.log(response.data.message);
        alert("Updated Status Successfully");
        setShowPopup16(false);
      })
      .catch(error => {
        console.error('There was an error!', error);
        alert(`An error occurred during updating: ${error.message}`);
      });
  };

  return (
    <>
      {showUpdate && (
        <div className='h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm'>
          <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-white rounded-md duration-200 w-[300px]'>
            <div className='flex items-center justify-between'>
              <div>
                <h1 className='text-2xl font-bold text-dark'>Update Status of your ordered Meal Plan</h1>
              </div>
              <div>
                <IoCloseOutline
                  className='text-2xl cursor-pointer'
                  onClick={() => setShowPopup16(false)}
                />
              </div>
            </div>
            <form onSubmit={handleAvailable} className='mt-4'>
              <select
                className='w-full rounded-md border border-gray-300 dark:border-gray-500 px-2 py-1 mb-4'
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="ongoing">On-going</option>
                <option value="onhalt">On-halt</option>
              </select>
              <input
                type="text"
                placeholder='UserName:'
                className='w-full rounded-md border border-gray-300 dark:border-gray-500 px-2 py-1 mb-4'
                value={username}
                readOnly
              />
               <input
                type="text"
                placeholder='Enter Order-Id:'
                className='w-full rounded-md border border-gray-300 dark:border-gray-500 px-2 py-1 mb-4'
                value={order_id}
                onChange={(e) => setOrderId(e.target.value)}
                autoComplete="order_id"
              />
              
              <div>
                <button
                  type="submit"
                  className='w-full bg-primary text-white p-2 rounded-md hover:scale-105 duration-300 hover:bg-secondary'
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Update;
