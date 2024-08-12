const db = require('./db');
const bcrypt = require('bcryptjs');

exports.handler = async function(event, context) {
  const { userType, username, password } = JSON.parse(event.body);

  return new Promise((resolve, reject) => {
    const sql = 'SELECT id, username, password, userType FROM users WHERE userType = ? AND username = ?';
    db.query(sql, [userType, username], (err, results) => {
      if (err) {
        console.error('Error querying database:', err);
        resolve({
          statusCode: 500,
          body: JSON.stringify({ message: 'Error querying database' })
        });
        return;
      }

      if (results.length > 0) {
        const user = results[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            console.error('Error comparing passwords:', err);
            resolve({
              statusCode: 500,
              body: JSON.stringify({ message: 'Error comparing passwords' })
            });
            return;
          }

          if (isMatch) {
            resolve({
              statusCode: 200,
              body: JSON.stringify({
                message: 'Login successful',
                userId: user.id,
                username: user.username,
                userType: user.userType
              })
            });
          } else {
            resolve({
              statusCode: 401,
              body: JSON.stringify({ message: 'Invalid credentials' })
            });
          }
        });
      } else {
        resolve({
          statusCode: 401,
          body: JSON.stringify({ message: 'Invalid credentials' })
        });
      }
    });
  });
};
