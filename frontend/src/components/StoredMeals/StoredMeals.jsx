import React from 'react';

const StoredMeals = ({ fetchedData }) => {
  return (
    <div>
      <h1>Stored Meal Plans</h1>
      <table>
        <thead>
          <tr>
            <th>Seller Name</th>
            <th>Type</th>
            <th>Dish Name</th>
            <th>Price</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {fetchedData.map((meal) => (
            <tr key={meal.id}>
              <td>{meal.sellername}</td>
              <td>{meal.type}</td>
              <td>{meal.dish_name}</td>
              <td>{meal.price}</td>
              <td>{meal.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StoredMeals;
