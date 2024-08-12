const db = require('./db');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

exports.handler = async function(event, context) {
  const { userType, email, password, username } = JSON.parse(event.body);

  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
      if (err) {
        console.error('Error hashing password:', err);
        resolve({
          statusCode: 500,
          body: JSON.stringify({ error: err.message })
        });
        return;
      }

      const sql = 'INSERT INTO users (userType, email, password, username) VALUES (?, ?, ?, ?)';
      db.query(sql, [userType, email, hashedPassword, username], (err, result) => {
        if (err) {
          console.error('Error querying database:', err);
          resolve({
            statusCode: 500,
            body: JSON.stringify({ error: err.message })
          });
          return;
        }
        resolve({
          statusCode: 200,
          body: JSON.stringify({ message: 'User data saved successfully' })
        });
      });
    });
  });
};
