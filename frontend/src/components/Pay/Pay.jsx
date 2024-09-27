import React, { useState } from 'react';
import axios from 'axios';
import { IoCloseOutline } from 'react-icons/io5';

const Pay = ({ showPay, setShowPopup11, username, cartData1}) => {
  console.log(cartData1);
  const [time,setTime]=useState('');
  const [number,setNumber]=useState('');
  const [status, setStatus] = useState('ongoing');

  // Extract data from cartData1
  const {
    meal_type,
    planname,
    sellername: sname,
    days,
    price,
    description
  } = cartData1 || {};

  const handleAvailable = async (e) => {
    e.preventDefault();

    const userData = {
      username,
      meal_id: cartData1.id,
      meal_type: cartData1.meal_type,
      planname: cartData1.planname,
      status,
      sname: cartData1.sellername,
      time,
      days: cartData1.days,
      price: cartData1.price,
      description: cartData1.description,
      number
    };

    axios.post('http://localhost:3002/api/pay', userData)
      .then(response => {
        console.log(response.data.message);
        alert("Ordered Successfully");
        setShowPopup11(false);
      })
      .catch(error => {
        console.error('There was an error!', error);
        alert(`An error occurred during Ordering: ${error.message}`);
      });
  };


  return (
    <>
      {showPay && (
        <div className='h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm'>
          <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-white rounded-md duration-200 w-[300px]'>
            <div className='flex items-center justify-between'>
              <div>
                <h1 className='text-2xl font-bold text-dark'>Pay for Meal Plans</h1>
              </div>
              <div>
                <IoCloseOutline
                  className='text-2xl cursor-pointer'
                  onClick={() => setShowPopup11(false)}
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
                placeholder='Tiffin service seller name:'
                className='w-full rounded-md border border-gray-300 dark:border-gray-500 px-2 py-1 mb-4'
                value={username}
                readOnly
              />
              <input
                type="text"
                placeholder='Meal Type'
                className='w-full rounded-md border border-gray-300 dark:border-gray-500 px-2 py-1 mb-4'
                value={meal_type || ''}
                readOnly
              />
              <input
                type="text"
                placeholder='Plan Name'
                className='w-full rounded-md border border-gray-300 dark:border-gray-500 px-2 py-1 mb-4'
                value={planname || ''}
                readOnly
              />
              <input
                type="text"
                placeholder='Seller Name'
                className='w-full rounded-md border border-gray-300 dark:border-gray-500 px-2 py-1 mb-4'
                value={sname || ''}
                readOnly
              />
              <input
                type="text"
                placeholder='Days'
                className='w-full rounded-md border border-gray-300 dark:border-gray-500 px-2 py-1 mb-4'
                value={days || ''}
                readOnly
              />
              <input
                type="text"
                placeholder='Price'
                className='w-full rounded-md border border-gray-300 dark:border-gray-500 px-2 py-1 mb-4'
                value={price || ''}
                readOnly
              />
              <textarea
                placeholder='Description'
                className='w-full rounded-md border border-gray-300 dark:border-gray-500 px-2 py-1 mb-4'
                value={description || ''}
                readOnly
              />
              <input
                type="time"
                placeholder='Enter Time(Ex.11:00p.m) For Delivery Or Takeout:'
                className='w-full rounded-md border border-gray-300 dark:border-gray-500 px-2 py-1 mb-4'
                value={time}
                onChange={e => setTime(e.target.value)}
                autoComplete="time"
              />
              <input
                type="text"
                placeholder='Enter Contact Number:'
                className='w-full rounded-md border border-gray-300 dark:border-gray-500 px-2 py-1 mb-4'
                value={number}
                onChange={e => setNumber(e.target.value)}
                autoComplete="number"
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

export default Pay;
