const db = require('./db');

exports.handler = async function(event, context) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM blogs';
    db.query(sql, (err, results) => {
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
        body: JSON.stringify(results)
      });
    });
  });
};
