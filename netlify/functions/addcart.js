const db = require('./db');

exports.handler = async function(event, context) {
  const { userId, mealId, quantity } = JSON.parse(event.body);

  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO addcart (userId, mealId, quantity) VALUES (?, ?, ?)';
    db.query(sql, [userId, mealId, quantity], (err, result) => {
      if (err) {
        console.error('Error querying database:', err);
        resolve({
          statusCode: 500,
          body: JSON.stringify({ error: 'Error querying database' })
        });
        return;
      }
      resolve({
        statusCode: 200,
        body: JSON.stringify({ message: 'Item added to cart successfully' })
      });
    });
  });
};
