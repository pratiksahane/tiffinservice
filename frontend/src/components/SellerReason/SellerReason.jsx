import React, { useState } from 'react';
import axios from 'axios';
import { IoCloseOutline } from 'react-icons/io5';

const SellerReason = ({ showSellerRemove, setShowPopup19, username2 }) => {
  const [reason, setReason] = useState('');

  const handleAvailable = (e) => {
    e.preventDefault();

    const userData = {
      username2,
      reason,
    };

    axios.post('http://localhost:3002/api/sellerreason', userData)
      .then(response => {
        console.log(response.data.message);
        alert("Removed Service Seller Successfully");
        setShowPopup19(false);
        setReason(''); // Clear the reason input field
      })
      .catch(error => {
        console.error('There was an error!', error);
        alert(`An error occurred during removing seller: ${error.message}`);
      });
  };

  return (
    <>
      {showSellerRemove && (
        <div className='h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm'>
          <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-white rounded-md duration-200 w-[300px]'>
            {/* Header section */}
            <div className='flex items-center justify-between'>
              <div>
                <h1 className='text-2xl font-bold text-dark'>Remove Service Seller</h1>
              </div>
              <div>
                <IoCloseOutline
                  className='text-2xl cursor-pointer'
                  onClick={() => setShowPopup19(false)}
                />
              </div>
            </div>
            {/* Form section */}
            <form onSubmit={handleAvailable} className='mt-4'>
              <input
                type="text"
                placeholder='Enter title'
                className='w-full rounded-md border border-gray-300 dark:border-gray-500 px-2 py-1 mb-4'
                value={username2}
                readOnly
              />
              <textarea
                placeholder='Enter reason for removal:'
                className='w-full rounded-md border border-gray-300 dark:border-gray-500 px-2 py-1 mb-4'
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                autoComplete="new-reason"
              />
              {/* Submit button */}
              <div>
                <button
                  type="submit"
                  className='w-full bg-primary text-white p-2 rounded-md'
                >
                  Confirm Remove!
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SellerReason;
