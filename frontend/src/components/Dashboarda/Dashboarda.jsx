import React, { useState, useEffect } from 'react';
import axios from 'axios';
import polygon from "../../assets/admin.png"

const Dashboarda = ({ userId, HandlePopup12, handleLogout }) => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    const bgStyle = {
      backgroundImage: `url(${polygon})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center", // Fixed typo from "backgroundPositiion"
      backgroundSize: "30%", // Fixed typo from "backgroundsize"
      width: "100%",
      height: "20%",
      position: "relative",
    };
  
    useEffect(() => {
      if (userId) {
        axios.get(`http://localhost:3002/api/user/${userId}`)
          .then(response => {
            setUserData(response.data);
            setError(null); // Clear any previous errors
          })
          .catch(error => {
            console.error('There was an error fetching the user data!', error);
            setError('Unable to fetch user data.');
          });
      }
    }, [userId]);
  
    if (error) {
      return <div className="text-red-500 text-center">{error}</div>;
    }
  
    if (!userData) return <div className="text-center">Loading...</div>;
  

    return (
      <><div className="w-full min-h-screen bg-gray-100 flex flex-col items-center pt-2">
      <div className="w-full  bg-white shadow-lg rounded-lg p-8 mx-4 mb-4">
        <h1 className="text-3xl font-bold text-primary mb-4 text-center hover:text-secondary">Welcome Admin, {userData.username}</h1>
        <p className="text-lg text-gray-700 text-center">Email: {userData.email}</p>
        {/* Add more user-specific information here */}
      </div>
      <div>
      <p data-aos="fade-up" data-aos-delay="300" className="pt-5 mx-4 text-lg font-bold text-dark">Admin's Power!</p>
      </div>
      <div data-aos="fade-down" style={bgStyle} className="w-full bg-white shadow-lg rounded-lg p-10 mx-4 h-100 overflow-y-auto">
        <p className="mb-4">1. User & tiffin service seller has to login first to offer & use service. </p>
        <p className="mb-4">2. Keep track on the bugs and issue faced. </p>
        <p className="mb-4">3. Remove user or service seller from platform </p>
        <p className="mb-4">4. New subscription plan must be approved by the board of directors. </p>
        <p className="mb-4">5. Removal of user or service without any proof of malpractice is prohibted </p>

      </div>
      <div data-aos="fade-down" data-aos-delay="300" className="pt-3 w-full max-w-4xl bg-white shadow-lg rounded-lg p-4 mx-4 flex justify-around space-x-4">
        <button className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary hover:scale-105 duration-300 w-1/6">Check Sellers</button>
        <button className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary hover:scale-105 duration-300 w-1/6">Check Users</button>
        <button className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary hover:scale-105 duration-300 w-1/6">Add New Plans</button>
        <button className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary hover:scale-105 duration-300 w-1/6">Profit</button>
        <button className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary hover:scale-105 duration-300 w-1/6">Remove Seller</button>
        <button className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary hover:scale-105 duration-300 w-1/6">Remove User</button>
        <button onClick={HandlePopup12} className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary hover:scale-105 duration-300 w-1/6">Add Blogs</button>
        <button onClick={handleLogout} className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary hover:scale-105 duration-300 w-1/6">Logout</button>
        
      </div>
    </div>
      </>
      );
};

export default Dashboarda;