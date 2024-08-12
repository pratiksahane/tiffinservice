const db = require('./db');

exports.handler = async function(event, context) {
  const { id, planname, sellername } = JSON.parse(event.body);

  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM adddish WHERE id=? AND planname=? AND sellername=?';
    db.query(sql, [id, planname, sellername], (err, result) => {
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
        body: JSON.stringify({ message: 'Meal Plan deleted successfully' })
      });
    });
  });
};
