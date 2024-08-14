import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('/v1/functions/addblog');
        console.log('API response:', response.data); // Log to check the response
        setBlogs(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-6 text-primary hover:text-secondary">Blogs</h1>
      <div className="relative ">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300 z-10"
        >
          <FaChevronLeft className='hover:scale-105 duration-200' />
        </button>
        <div
          ref={containerRef}
          className=" flex overflow-x-auto space-x-6 scrollbar-hide pb-4"
        >
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div
                key={blog.id}
                className=" min-w-[300px] bg-white p-4 rounded-lg shadow-md flex-shrink-0"
              >
                <h2 className="text-2xl font-semibold">{blog.title}</h2>
                <p className="text-lg">{blog.content}</p>
              </div>
            ))
          ) : (
            <p className="text-lg">No blogs available.</p>
          )}
        </div>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300 z-10"
        >
          <FaChevronRight className='hover:scale-105 duration-200' />
        </button>
      </div>
    </div>
  );
};

export default Blogs;
