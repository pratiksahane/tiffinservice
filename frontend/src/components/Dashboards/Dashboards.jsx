import React, { useState, useEffect } from 'react';
import axios from 'axios';
import polygon from "../../assets/wood.png";

const Dashboards = ({ userId, HandlePopup2, HandlePopup3, HandlePopup4, HandlePopup5, HandlePopup6, HandlePopup7, HandlePopup8, handleLogout, mealData, planData, setSellerName }) => {
  console.log("Meal data received in Dashboards component:", mealData);
  console.log("Meal data received in Dashboards component:", planData);

  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [orderData, setOrderData] = useState([]);
  const [approvedSellerData, setApprovedSellerData] = useState([]);
  const [isApprovedSeller, setIsApprovedSeller] = useState(false); 

  const bgStyle = {
    backgroundImage: `url(${polygon})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center", 
    backgroundSize: "30%",
    width: "100%",
    height: "20%",
    position: "relative",
  };

  const HandleOrderData = async () => {
    try {
      const response = await axios.post("http://localhost:3002/api/orderdata", { sellername: userData.username });
      console.log('Response data:', response.data);
      setOrderData(response.data.data);
      console.log('Order data:', orderData);
    } catch (error) {
      console.error('Error fetching order data:', error);
    }
  };

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:3002/api/user/${userId}`)
        .then(response => {
          setUserData(response.data);
          setSellerName(response.data.username);
          setError(null);
        })
        .catch(error => {
          console.error('There was an error fetching the user data!', error);
          setError('Unable to fetch user data.');
        });
    }
      fetchApprovedSellers();
  }, [userId, setSellerName]);

  const fetchApprovedSellers = async () => {
    try {
      const response = await axios.get('http://localhost:3002/api/approvedsellers');
      console.log('Approved Sellers Response:', response.data);
      setApprovedSellerData(response.data);

      // Check if the logged-in seller is in the approved sellers list
      if (userData) {
        const isApproved = response.data.some(seller => seller.username === userData.username);
        setIsApprovedSeller(isApproved);
      }

    } catch (error) {
      console.error('Error fetching approved sellers:', error);
    }
  };

  useEffect(() => {
    if (approvedSellerData.length > 0 && userData) {
      const isApproved = approvedSellerData.some(seller => seller.username === userData.username);
      setIsApprovedSeller(isApproved);
    }
  }, [approvedSellerData, userData]);

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!userData) return <div className="text-center">Loading...</div>;

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center pt-2">
      <div className="w-full bg-white shadow-lg rounded-lg p-8 mx-4 mb-4">
        <h1 className="text-3xl font-bold text-primary text-center mb-4 hover:text-secondary">Welcome Seller, {userData.username}</h1>
        <p className="text-lg text-gray-700 text-center">Email: {userData.email}</p>
      </div>
      
      <p data-aos="fade-down" data-aos-delay="300" className="pt-5 mx-4 text-lg font-bold text-dark">Guide for new comers!</p>
      <div data-aos="fade-down" style={bgStyle} className="w-full bg-white shadow-lg rounded-lg p-10 mx-4 h-90 overflow-y-auto">
        <p className="mb-4">1. If you're a new Tiffin service seller, you need to go through the screening process by clicking on the screening button at the top left. Unless you go through the screening process, you won't be able to deliver your service.</p>
        <p className="mb-4">2. Newcomers have a free trial for one month; after that, they need to renew their plans.</p>
        <p className="mb-4">3. Clicking on the Available Dishes button will help you see your service dishes.</p>
        <p className="mb-4">4. Clicking on Orders will help you review the service orders placed by customers.</p>
        <p className="mb-4">5. Clicking on the Add Dishes button will help you add new dishes for your service.</p>
        <p className="mb-4">6. Subscriptions are reasonably priced and specially organized for you in different varieties.</p>
        <p className="mb-4">7. The Help button is for assistance from our service management team.</p>
      </div>
      <div data-aos="fade-down" data-aos-delay="300" className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-4 mx-4 flex justify-around space-x-4">
        <button onClick={HandlePopup3} className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary hover:scale-105 duration-300 w-1/6">Screening</button>
        <button disabled={!isApprovedSeller} onClick={HandleOrderData} className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary hover:scale-105 duration-300 w-1/6">Orders</button>
        <button disabled={!isApprovedSeller} onClick={HandlePopup4} className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary hover:scale-105 duration-300 w-1/6">Available Meal Plan</button>
        <button disabled={!isApprovedSeller} onClick={HandlePopup2} className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary hover:scale-105 duration-300 w-1/6">Add New Meal Plan</button>
        <button disabled={!isApprovedSeller} onClick={HandlePopup5} className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary hover:scale-105 duration-300 w-1/6">Remove Meal Plan</button>
        <button disabled={!isApprovedSeller} onClick={HandlePopup8} className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary hover:scale-105 duration-300 w-1/6">View Subscriptions offered</button>
        <button disabled={!isApprovedSeller} onClick={HandlePopup6} className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary hover:scale-105 duration-300 w-1/6">Add Subscription Plan</button>
        <button disabled={!isApprovedSeller} onClick={HandlePopup7} className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary hover:scale-105 duration-300 w-1/6">Remove Subscription Plan</button>
        <button onClick={handleLogout} className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary hover:scale-105 duration-300 w-1/6">Logout</button>
      </div>
      <div className="w-full bg-white shadow-lg rounded-lg p-4 mx-4 mt-4">
        <h2 className="text-2xl font-bold text-primary text-center mb-4">Your Available Meal Plans</h2>
        {mealData.length > 0 ? (
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2">ID</th>
                <th className="py-2">Type</th>
                <th className="py-2">Plan Name</th>
                <th className="py-2">Seller Name</th>
                <th className="py-2">Days</th>
                <th className="py-2">Price</th>
                <th className="py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {mealData.map((meal, index) => (
                <tr key={index}>
                  <td className="border-b py-2">{meal.id}</td>
                  <td className="border-b py-2">{meal.type}</td>
                  <td className="border-b py-2">{meal.planname}</td>
                  <td className="border-b py-2">{meal.sellername}</td>
                  <td className="border-b py-2">{meal.days}</td>
                  <td className="border-b py-2">{meal.price}</td>
                  <td className="border-b py-2">{meal.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-lg text-center text-gray-700">No meals available</p>
        )}
      </div>
      <div className="w-full bg-white shadow-lg rounded-lg p-4 mx-4 mt-4">
        <h2 className="text-2xl font-bold text-primary text-center mb-4">Your Received Orders</h2>
        {orderData.length > 0 ? (
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2">ID</th>
                <th className="py-2">Person Name</th>
                <th className="py-2">Meal Id</th>
                <th className="py-2 px-5">Meal Type</th>
                <th className="py-2">Plan Name</th>
                <th className="py-2">Status</th>
                <th className="py-2">Seller Name</th>
                <th className="py-2">Time</th>
                <th className="py-2">Days</th>
                <th className="py-2">Price</th>
                <th className="py-2">Description</th>
                <th className="py-2">Contact Detail</th>
              </tr>
            </thead>
            <tbody>
              {orderData.map((plan, index) => (
                <tr key={index}>
                  <td className="border-b py-2">{plan.id}</td>
                  <td className="border-b py-2">{plan.username}</td>
                  <td className="border-b py-2">{plan.meal_id}</td>
                  <td className="border-b py-2">{plan.meal_type}</td>
                  <td className="border-b py-2">{plan.planname}</td>
                  <td className="border-b py-2">{plan.status}</td>
                  <td className="border-b py-2">{plan.sname}</td>
                  <td className="border-b py-2">{plan.time}</td>
                  <td className="border-b py-2">{plan.days}</td>
                  <td className="border-b py-2">{plan.price}</td>
                  <td className="border-b py-2">{plan.description}</td>
                  <td className="border-b py-2">{plan.number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-lg text-center text-gray-700">No meal plans available</p>
        )}
      </div>
      <div className="w-full bg-white shadow-lg rounded-lg p-4 mx-4 mt-4">
        <h2 className="text-2xl font-bold text-primary text-center mb-4">Your Available Meal Subscription Plans</h2>
        {planData.length > 0 ? (
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2">ID</th>
                <th className="py-2 px-5">Type</th>
                <th className="py-2">Plan Name</th>
                <th className="py-2">Seller Name</th>
                <th className="py-2">Days</th>
                <th className="py-2">Price</th>
                <th className="py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {planData.map((plan, index) => (
                <tr key={index}>
                  <td className="border-b py-2">{plan.id}</td>
                  <td className="border-b py-2">{plan.type}</td>
                  <td className="border-b py-2">{plan.planname}</td>
                  <td className="border-b py-2">{plan.sellername}</td>
                  <td className="border-b py-2">{plan.days}</td>
                  <td className="border-b py-2">{plan.price}</td>
                  <td className="border-b py-2">{plan.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-lg text-center text-gray-700">No meal plans available</p>
        )}
      </div>
    </div>
  );
};

export default Dashboards;
