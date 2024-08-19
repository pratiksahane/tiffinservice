import React, { useState } from 'react';
import axios from 'axios';
import { IoCloseOutline } from 'react-icons/io5';

const Screening = ({ showScreeningPopout, setShowPopup3 ,sellername}) => {
  const [userType, setUserType] = useState('Tiffin Service Manager');
  const [nationality, setNationality] = useState('');
  const [cardno, setCardno] = useState('');
  const [description, setDescription] = useState('');

  const handleScreening = async (e) => {
    e.preventDefault();
    const userData={
      userType,
      sellername,
      nationality,
      cardno,
      description
}


    axios.post('http://localhost:3002/api/screening', userData)
      .then(response => {
        console.log(response.data.message);
        alert("Submitted Screening form Successfully");
        setShowPopup3(false);
      })
      .catch(error => {
        console.error('There was an error!', error);
        alert(`An error occurred during submitting form: ${error.message}`);
      });
  };

  return (
    <>
      {showScreeningPopout && (
        <div className='h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm'>
          <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-white rounded-md duration-200 w-[300px]'>
            {/* Header section */}
            <div className='flex items-center justify-between'>
              <div>
                <h1 className='text-2xl font-bold text-dark'>Adding new meal plan</h1>
              </div>
              <div>
                <IoCloseOutline
                  className='text-2xl cursor-pointer'
                  onClick={() => setShowPopup3(false)}
                />
              </div>
            </div>
            {/* Add dish form section */}
            <form onSubmit={handleScreening} className='mt-4'>
              <select
                className='w-full rounded-md border border-gray-300 dark:border-gray-500 px-2 py-1 mb-4'
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="veg">Tiffin Service Manager</option>
                <option value="non-veg">Mere Employee</option>
              </select>
              <input
                type="text"
                placeholder='Enter your name:'
                className='w-full rounded-md border border-gray-300 dark:border-gray-500 px-2 py-1 mb-4'
                value={sellername}
                readOnly
              />
              <input
                type="text"
                placeholder='Enter your nationality:'
                className='w-full rounded-md border border-gray-300 dark:border-gray-500 px-2 py-1 mb-4'
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                autoComplete="nationality"
              />
              <input
                type="text"
                placeholder='Enter aadharcard no. or your any official no.:'
                className='w-full rounded-md border border-gray-300 dark:border-gray-500 px-2 py-1 mb-4'
                value={cardno}
                onChange={(e) => setCardno(e.target.value)}
                autoComplete="cardno"
              />
              <textarea
                placeholder='Enter why you want to use this service::'
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

export default Screening;
