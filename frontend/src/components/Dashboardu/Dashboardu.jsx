import React, { useState, useEffect } from 'react';
import axios from 'axios';
import polygon from '../../assets/user.png';
import { addCart } from '../AddCart/AddCart';

const Dashboardu = ({ userId, HandlePopup9, HandlePopup10, HandlePopup11, HandlePopup13, HandlePopup14, HandlePopup15, HandlePopup16,HandlePopup17, setUserName, cart2, mealData2, setCartData, setCartData1, subsData, setBuy, previousOrder,orderSubs, handleLogout }) => {
  console.log("Meal data received in Dashboards component:", mealData2);
  console.log(subsData);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [addedMeals, setAddedMeals] = useState([]); // Track added meals

  const bgStyle = {
    backgroundImage: `url(${polygon})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "25%",
    width: "100%",
    height: "20%",
    position: "relative",
  };

  const HandleCart = (meal) => {
    if (!meal || !meal.id || !meal.planname || !meal.sellername || !meal.days || !meal.price || !meal.description) {
      alert('Invalid meal data');
      return;
    }
    const cartData = {
      ...meal,
      userId: userId,
      username: userData?.username,
    };

    setCartData(cartData);
    addCart(cartData); // Call AddCart with the correct data only when user clicks

    // Add the meal ID to the addedMeals state to disable the button
    setAddedMeals((prev) => [...prev, meal.id]);
  };

  const HandleCart1 = (meal) => {
    if (!meal || !meal.id || !meal.planname || !meal.sellername || !meal.days || !meal.price || !meal.description) {
      alert('Invalid meal data');
      return;
    }
    const Data = {
      ...meal
    };

    setCartData1(Data);

  };

  const HandleBuy = (meal) => {
    console.log("mealdata:",meal);
    if (!meal || !meal.id || !meal.planname || !meal.sellername || !meal.days || !meal.price || !meal.description) {
      alert('Invalid meal data');
      return;
    }
    const Buydata = {
      ...meal
    };
    console.log(Buydata);
    setBuy(Buydata);
  };

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:3002/api/user/${userId}`)
        .then(response => {
          setUserData(response.data);
          setUserName(response.data.username);
          setError(null);
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
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center pt-2">
      {/* User Info Section */}
      <div className="w-full bg-white shadow-lg rounded-lg p-8 mx-4 mb-4">
        <h1 className="text-3xl font-bold text-primary mb-4 text-center hover:text-secondary">Welcome User, {userData.username}</h1>
        <p className="text-lg text-gray-700 text-center">Email: {userData.email}</p>
      </div>

      {/* User Guide Section */}
      <div>
        <p data-aos="fade-down" data-aos-delay="300" className="pt-5 mx-4 text-lg font-bold text-dark">Guide for New-Comers!</p>
      </div>
      <div data-aos="fade-down" style={bgStyle} className="w-full bg-white shadow-lg rounded-lg p-10 mx-4 h-100 overflow-y-auto">
        <p className="mb-4">1. If you're a new user, please enjoy our services.</p>
        <p className="mb-4">2. By clicking on check dishes button, you'll be able to explore dishes offered by our platform.</p>
        <p className="mb-4">3. To choose a meal plan you need to add that meal plan to the cart, and then make that plan.</p>
        <p className="mb-4">4. A payment slip will be provided.</p>
        <p className="mb-4">5. Contact admin just in case of any issue, tech team will help you.</p>
      </div>

      {/* Buttons Section */}
      <div data-aos="fade-down" data-aos-delay="300" className="pt-3 w-full max-w-4xl bg-white shadow-lg rounded-lg p-4 mx-4 flex justify-around space-x-4">
        <button onClick={HandlePopup9} className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary hover:scale-105 duration-300 w-1/6">Check dishes</button>
        <button onClick={HandlePopup10} className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary hover:scale-105 duration-300 w-1/6">View Cart</button>
        <button onClick={HandlePopup13} className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary hover:scale-105 duration-300 w-1/6">View Subscriptions Available</button>
        <button onClick={HandlePopup17} className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary hover:scale-105 duration-300 w-1/6">Subscription Availed</button>
        <button onClick={HandlePopup15} className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary hover:scale-105 duration-300 w-1/6">Previous Order</button>
        <button onClick={HandlePopup16} className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary hover:scale-105 duration-300 w-1/6">Update Order Status</button>
        <button onClick={handleLogout} className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary hover:scale-105 duration-300 w-1/6">Logout</button>
      </div>

      {/* Meal Plans Section */}
      <div className="w-full bg-white shadow-lg rounded-lg p-4 mx-4 mt-4">
        <h2 className="text-2xl font-bold text-primary text-center mb-4">Your Available Meal Plans</h2>
        {mealData2.length > 0 ? (
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
                <th className="py-2">Cart</th>
              </tr>
            </thead>
            <tbody>
              {mealData2.map((meal, index) => (
                <tr key={index}>
                  <td className="border-b py-2">{meal.id}</td>
                  <td className="border-b py-2">{meal.type}</td>
                  <td className="border-b py-2">{meal.planname}</td>
                  <td className="border-b py-2">{meal.sellername}</td>
                  <td className="border-b py-2">{meal.days}</td>
                  <td className="border-b py-2">{meal.price}</td>
                  <td className="border-b py-2">{meal.description}</td>
                  <td className="border-b py-2">
                    <button
                      onClick={() => HandleCart(meal)}
                      disabled={addedMeals.includes(meal.id)} // Disable button if meal is already added
                      className={`${
                        addedMeals.includes(meal.id) ? 'bg-gray-500' : 'bg-primary'
                      } text-white px-4 py-2 rounded hover:scale-105 duration-200 hover:bg-secondary w-1/11`}
                    >
                      {addedMeals.includes(meal.id) ? 'Added' : 'Add To Cart'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-lg text-center text-gray-700">No meals available</p>
        )}
      </div>  
       {/* Add cart Meal Plans Section */}
      <div className="w-full bg-white shadow-lg rounded-lg p-4 mx-4 mt-4">
        <h2 className="text-2xl font-bold text-primary text-center mb-4">Your Available Add Cart Meal Plans(Cash on Delivery)</h2>
        {cart2.length > 0 ? (
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className='py-2'>Username</th>
                <th className="py-2">ID</th>
                <th className="py-2">Plan Name</th>
                <th className="py-2">Seller Name</th>
                <th className="py-2">Days</th>
                <th className="py-2">Price</th>
                <th className="py-2">Description</th>
                <th className='py-2'>Order now</th>
              </tr>
            </thead>
            <tbody>
              {cart2.map((meal, index) => (
                <tr key={index}>
                  <td className='border-b py-2'>{meal.username}</td>
                  <td className="border-b py-2">{meal.id}</td>
                  <td className="border-b py-2">{meal.planname}</td>
                  <td className="border-b py-2">{meal.sellername}</td>
                  <td className="border-b py-2">{meal.days}</td>
                  <td className="border-b py-2">{meal.price}</td>
                  <td className="border-b py-2">{meal.description}</td>
                  <td className="border-b py-4">
                    <button onClick={() => {HandlePopup11(); HandleCart1(meal);}} className='text-white hover:scale-105 duration-200 px-4 py-2 bg-primary hover:bg-secondary'>
                      Order
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-lg text-center text-gray-700">No meals available</p>
        )}
      </div>
      {/* subscription section */}
      <div className="w-full bg-white shadow-lg rounded-lg p-4 mx-4 mt-4">
        <h2 className="text-2xl font-bold text-primary text-center mb-4">Available Subscriptions!</h2>
        {subsData.length > 0 ? (
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2">ID</th>
                <th className="py-2 px-4">Plan Name</th>
                <th className="py-2">Seller Name</th>
                <th className="py-2 px-4">Days</th>
                <th className="py-2">Price</th>
                <th className="py-2 px-4">Description</th>
                <th className="py-2 px-3">Buy</th>
              </tr>
            </thead>
            <tbody>
              {subsData.map((meal, index) => (
                <tr key={index}>
                  <td className="border-b py-2">{meal.id}</td>
                  <td className="border-b py-2 px-4">{meal.planname}</td>
                  <td className="border-b py-2">{meal.sellername}</td>
                  <td className="border-b py-2 px-4">{meal.days}</td>
                  <td className="border-b py-2">{meal.price}</td>
                  <td className="border-b py-2 px-4">{meal.description}</td>
                  <td className='border-b py-2 px-3'><button onClick={() => {HandlePopup14(); HandleBuy(meal);}} className='text-white hover:scale-105 duration-200 px-4 py-2 bg-primary hover:bg-secondary'>Buy</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-lg text-center text-gray-700">No meals available</p>
        )}
      </div>
      {/* subscription Ordered section */}
      <div className="w-full bg-white shadow-lg rounded-lg p-4 mx-4 mt-4">
        <h2 className="text-2xl font-bold text-primary text-center mb-4">Availed Subscriptions!</h2>
        {orderSubs.length > 0 ? (
          <table className="w-full text-left">
            <thead>
              <tr>
              <th className="py-2">OrderID</th>
                <th className="py-2">SubscriptionID</th>
                <th className="py-2">UserName</th>
                <th className="py-2">PlanName</th>
                <th className="py-2">Price</th>
                <th className="py-2">Cancel</th>
              </tr>
            </thead>
            <tbody>
              {orderSubs.map((meal, index) => (
                <tr key={index}>
                  <td className="border-b py-2">{meal.osid}</td>
                  <td className="border-b py-2">{meal.s_id}</td>
                  <td className="border-b py-2">{meal.username}</td>
                  <td className="border-b py-2">{meal.planname}</td>
                  <td className="border-b py-2">{meal.price}</td>
                  <td className='border-b py-2 '><button className='text-white hover:scale-105 duration-200 px-4 py-2 bg-primary hover:bg-secondary'>Cancel</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-lg text-center text-gray-700">No meals available</p>
        )}
      </div>
      {/* Previous Order section */}
      <div className="w-full bg-white shadow-lg rounded-lg p-4 mx-4 mt-4">
        <h2 className="text-2xl font-bold text-primary text-center mb-4">Ordered Meal Plans</h2>
        {previousOrder.length > 0 ? (
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2">OrderId</th>
                <th className="py-2">UserName</th>
                <th className="py-2">Meal Id</th>
                <th className="py-2 px-4">MealType</th>
                <th className="py-2 px-4">Plan Name</th>
                <th className="py-2">Seller Name</th>
                <th className="py-2">TimeofDelivery</th>
                <th className="py-2 px-4">Days</th>
                <th className="py-2">Price</th>
                <th className="py-2 px-4">Description</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {previousOrder.map((meal, index) => (
                <tr key={index}>
                  <td className="border-b py-2">{meal.id}</td>
                  <td className="border-b py-2 px-4">{meal.username}</td>
                  <td className="border-b py-2">{meal.meal_id}</td>
                  <td className="border-b py-2">{meal.meal_type}</td>
                  <td className="border-b py-2 px-4">{meal.planname}</td>
                  <td className="border-b py-2">{meal.sname}</td>
                  <td className="border-b py-2">{meal.time}</td>
                  <td className="border-b py-2 px-4">{meal.days}</td>
                  <td className="border-b py-2">{meal.price}</td>
                  <td className="border-b py-2 px-4">{meal.description}</td>
                  <td className="border-b py-2">{meal.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-lg text-center text-gray-700">No meals available</p>
        )}
      </div>
    </div>
  );
};

export default Dashboardu;
