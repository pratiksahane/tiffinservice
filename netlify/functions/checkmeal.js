const db = require('./db');

exports.handler = async function(event, context) {
  const { userId } = JSON.parse(event.body);

  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM addcart WHERE userId = ?';
    db.query(sql, [userId], (err, results) => {
      if (err) {
        console.error('Error querying database:', err);
        resolve({
          statusCode: 500,
          body: JSON.stringify({ message: 'Error querying database' })
        });
        return;
      }

      resolve({
        statusCode: 200,
        body: JSON.stringify({
          message: 'Cart data retrieved successfully',
          data: results
        })
      });
    });
  });
};
