import React, { useState } from 'react';
import axios from 'axios';
import { IoCloseOutline } from 'react-icons/io5';

const Buysubs = ({ showBuysubs, setShowPopup14, username, buy }) => {
  // Extract properties from the buy object
  const { id, planname, price } = buy;

  console.log(username);
  console.log(buy);

  const [password, setPassword]=useState('');

  const handleAvailable = async (e) => {
    e.preventDefault();

    const userData = {
      username,
      id,         // Use the id from the buy object
      planname,   // Use the planname from the buy object
      price, 
      password     // Use the price from the buy object
    };

    axios.post('http://localhost:3002/api/buysubs', userData)
      .then(response => {
        console.log(response.data.message);
        alert("Subscription Availed Successfully");
        setShowPopup14(false);
      })
      .catch(error => {
        console.error('There was an error!', error);
        alert(`An error occurred during Availing Subscription: ${error.message}`);
      });
  };

  return (
    <>
      {showBuysubs && (
        <div className='h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm'>
          <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-white rounded-md duration-200 w-[300px]'>
            <div className='flex items-center justify-between'>
              <div>
                <h1 className='text-2xl font-bold text-dark'>Buying subscription</h1>
              </div>
              <div>
                <IoCloseOutline
                  className='text-2xl cursor-pointer'
                  onClick={() => setShowPopup14(false)}
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
                placeholder='Subscription no:'
                className='w-full rounded-md border border-gray-300 dark:border-gray-500 px-2 py-1 mb-4'
                value={id}   // Use the id from the buy object
                readOnly
              />
              <input
                type="text"
                placeholder='Subscription Planname:'
                className='w-full rounded-md border border-gray-300 dark:border-gray-500 px-2 py-1 mb-4'
                value={planname}  // Use the planname from the buy object
                readOnly
              />
              <input
                type="text"
                placeholder='Subscription Price:'
                className='w-full rounded-md border border-gray-300 dark:border-gray-500 px-2 py-1 mb-4'
                value={price}  // Use the price from the buy object
                readOnly
              />
              <input
                type="text"
                placeholder='Set Subscription Password(10-digit):'
                className='w-full rounded-md border border-gray-300 dark:border-gray-500 px-2 py-1 mb-4'
                value={password}  // Use the price from the buy object
                onChange={e => setPassword(e.target.value)}
                autoComplete="password"
              />
              <div>
                <button
                  type="submit"
                  className='w-full bg-primary text-white p-2 rounded-md hover:scale-105 duration-300 hover:bg-secondary'
                >
                  Set
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Buysubs;
