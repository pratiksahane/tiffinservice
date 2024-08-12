const db = require('./db');

exports.handler = async function(event, context) {
  const { type, sellername } = JSON.parse(event.body);

  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM adddish WHERE sellername = ? AND type = ?';
    db.query(sql, [sellername, type], (err, results) => {
      if (err) {
        console.error('Error querying database:', err);
        resolve({
          statusCode: 500,
          body: JSON.stringify({ message: 'Error querying database' })
        });
        return;
      }

      if (results.length > 0) {
        resolve({
          statusCode: 200,
          body: JSON.stringify({
            message: 'Successfully Fetched Data',
            data: results
          })
        });
      } else {
        resolve({
          statusCode: 404,
          body: JSON.stringify({ message: 'No meals found for the given criteria' })
        });
      }
    });
  });
};
