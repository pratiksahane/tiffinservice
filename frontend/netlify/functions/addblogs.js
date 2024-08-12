const db = require('./db');

exports.handler = async function(event, context) {
  const { title, content, author } = JSON.parse(event.body);

  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO blogs (title, content, author) VALUES (?, ?, ?)';
    db.query(sql, [title, content, author], (err, result) => {
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
        body: JSON.stringify({ message: 'Blog post added successfully' })
      });
    });
  });
};
