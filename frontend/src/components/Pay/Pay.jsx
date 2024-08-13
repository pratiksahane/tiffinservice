import React, { useState } from 'react';
import axios from 'axios';
import { IoCloseOutline } from 'react-icons/io5';

const Pay = ({ showPay, setShowPopup11, username, cartData1 }) => {
  console.log(cartData1);

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
      meal_id: cartData1.id,
      meal_type: cartData1.meal_type,
      planname: cartData1.planname,
      sname: cartData1.sellername,
      days: cartData1.days,
      price: cartData1.price,
      description: cartData1.description,
    };

    try {
      const response = await axios.post("http://localhost:3002/api/pay", userData);

      if (response.data.message === "Successfully Fetched Data") {
        alert("Data fetched successfully");
        setShowPopup11(false); // Close the popup after data is set
      } else {
        alert("No meals found for the given criteria");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error);
        alert(`An error occurred during fetching: ${error.response ? error.response.data.message : error.message}`);
      } else {
        console.error("Unknown error:", error);
        alert("An unknown error occurred during fetching");
      }
    }
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
