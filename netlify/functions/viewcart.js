const db = require('./db');

exports.handler = async function(event, context) {
  const userId = event.queryStringParameters.userId;

  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM addcart WHERE userId = ?';
    db.query(sql, [userId], (err, results) => {
      if (err) {
        console.error('Error querying database:', err);
        resolve({
          statusCode: 500,
          body: JSON.stringify({ error: 'Error querying database' })
        });
        return;
      }

      if (results.length > 0) {
        resolve({
          statusCode: 200,
          body: JSON.stringify(results)
        });
      } else {
        resolve({
          statusCode: 404,
          body: JSON.stringify({ message: 'No items found in cart' })
        });
      }
    });
  });
};
