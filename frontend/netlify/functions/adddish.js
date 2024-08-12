const db = require('./db');

exports.handler = async function(event, context) {
  const { type, planname, sellername, days, price, description } = JSON.parse(event.body);

  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO adddish (type, planname, sellername, days, price, description) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [type, planname, sellername, days, price, description], (err, result) => {
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
        body: JSON.stringify({ message: 'Dish data saved successfully' })
      });
    });
  });
};
