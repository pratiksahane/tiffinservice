import React, { useState } from 'react';
import axios from 'axios';
import { IoCloseOutline } from 'react-icons/io5';

const Addblogs = ({ showPopup12, setShowPopup12 }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleAvailable = (e) => {
    e.preventDefault();  // Prevent the default form submission behavior

    const userData = {
     title,
     content,
    };

    axios.post('/.netlify/functions/addblogs', userData)
      .then(response => {
        console.log(response.data.message);
        alert("Added Successfully");
        setShowPopup12(false);
      })
      .catch(error => {
        console.error('There was an error!', error);
        alert(`An error occurred during adding blog: ${error.message}`);
      });
  };

  return (
    <>
      {showPopup12 && (
        <div className='h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm'>
          <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-white rounded-md duration-200 w-[300px]'>
            {/* Header section */}
            <div className='flex items-center justify-between'>
              <div>
                <h1 className='text-2xl font-bold text-dark'>Add blog</h1>
              </div>
              <div>
                <IoCloseOutline
                  className='text-2xl cursor-pointer'
                  onClick={() => setShowPopup12(false)}
                />
              </div>
            </div>
            {/* Signup form section */}
            <form onSubmit={handleAvailable} className='mt-4'>
              <input
                type="text"
                placeholder='Enter tiltle'
                className='w-full rounded-md border border-gray-300 dark:border-gray-500 px-2 py-1 mb-4'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoComplete="title"
              />
              <textarea
                placeholder='Enter content'
                className='w-full rounded-md border border-gray-300 dark:border-gray-500 px-2 py-1 mb-4'
                value={content}
                onChange={(e) => setContent(e.target.value)}
                autoComplete="new-content"
              >
              </textarea>
              {/* Signup button section */}
              <div>
                <button
                  type="submit"
                  className='w-full bg-primary text-white p-2 rounded-md'
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

export default Addblogs;