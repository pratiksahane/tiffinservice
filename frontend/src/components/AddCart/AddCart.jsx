import React from 'react';
import axios from 'axios';

const addCart = (cart) => {
  console.log("Cart:",cart);
    const meal_id= cart.id;
    const meal_type= cart.type;
    const planname= cart.planname;
    const sellername= cart.sellername;
    const days= cart.days;
    const price= cart.price;
    const description= cart.description;
    const username= cart.username;
    
    const userData={
      meal_id,
      meal_type,
      planname,
      sellername,
      days,
      price,
      description,
      username,
    }
  
  console.log("formatted cart:",userData);
  axios.post('http://localhost:3002/api/addcart', userData)
  .then(response => {
    console.log(response.data.message);
    alert("Added Successfully");
  })
  .catch(error => {
    console.error('Error adding to cart:', error.response.data);
    console.error('Error status:', error.response.status);
    console.error('Error headers:', error.response.headers);
    console.error('Error config:', error.config);
    console.error('Error request:', error.request);
    alert(`An error occurred: ${error.message}`)
  });
}
const AddCart = () => {
  return (
    <div></div>
  );
}

export { addCart };
export default AddCart;