const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const saltRounds = 10;

const app = express();
const port = 3002;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '14032005pratik',
  database: 'mydatabase'
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});

// API endpoint to handle signup
app.post('/api/signup', (req, res) => {
  const { userType, email, password, username } = req.body;

  console.log('Received signup request:', req.body);

  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).json({ error: err.message });
    }

    const sql = 'INSERT INTO users (userType, email, password, username) VALUES (?, ?, ?, ?)';
    db.query(sql, [userType, email, hashedPassword, username], (err, result) => {
      if (err) {
        console.error('Error querying database:', err);
        return res.status(500).json({ error: err.message });
      }
      console.log('User data saved successfully:', result);
      res.status(200).json({ message: 'User data saved successfully' });
    });
  });
});

// API endpoint to handle login
app.post('/api/login', (req, res) => {
  const { userType, username, password } = req.body;

  const sql = 'SELECT id, username, password, userType FROM users WHERE userType = ? AND username = ?';
  db.query(sql, [userType, username], (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ message: 'Error querying database' });
    }

    if (results.length > 0) {
      const user = results[0];

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error('Error comparing passwords:', err);
          return res.status(500).json({ message: 'Error comparing passwords' });
        }

        if (isMatch) {
          res.status(200).json({
            message: 'Login successful',
            userId: user.id,
            username: user.username,
            userType: user.userType // Ensure userType is included
          });
        } else {
          res.status(401).json({ message: 'Invalid credentials' });
        }
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
});


// API endpoint to fetch user data by userId
app.get('/api/user/:userId', (req, res) => {
  const userId = req.params.userId;

  console.log('Received request for user data with ID:', userId);

  const sql = 'SELECT id, username, email FROM users WHERE id = ?';
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ error: 'Error querying database' });
    }

    console.log('Database query results:', results);

    if (results.length > 0) {
      const user = results[0];
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });
});

{/*For adding dish */}

app.post('/api/adddish', (req, res) => {
  const { type, planname, sellername, days, price, description } = req.body;

  console.log('Received adddish request:', req.body);

  const sql = 'INSERT INTO adddish (type, planname,sellername, days, price, description) VALUES ( ?, ?, ?, ?, ?, ?)';
  db.query(sql, [type, planname, sellername, days, price, description], (err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ error: 'Error querying database' });
    }
    console.log('Dish data saved successfully:', result);
    res.status(200).json({ message: 'Dish data saved successfully' });
  });
});

{/*Removing meal Plan*/}
app.post('/api/removemeal', (req, res) => {
  const { id, planname, sellername } = req.body;

  console.log('Received delete dish request:', req.body);

  const sql = 'delete from adddish where id=? and planname=? and sellername=?';
  db.query(sql, [id, planname, sellername], (err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ error: 'Error querying database' });
    }
    console.log('Meal Plan deleted successfully:', result);
    res.status(200).json({ message: 'Deleted successfully' });
  });
});

{/*For screening Process */}

app.post('/api/screening', (req, res) => {
  const { userType,name,nationality,cardno,description } = req.body;

  console.log('Received adddish request:', req.body);

  const sql = 'INSERT INTO screening (userType,name,nationality,cardno,description) VALUES ( ?, ?, ?, ?, ?)';
  db.query(sql, [userType,name,nationality,cardno,description], (err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ error: 'Error querying database' });
    }
    console.log('Data saved successfully:', result);
    res.status(200).json({ message: 'Screening form saved successfully' });
  });
});

{/*For getting available meal plans*/}
app.post('/api/availablemeal', (req, res) => {
  const { type, sellername } = req.body;

  const sql = 'SELECT * FROM adddish WHERE sellername = ? AND type = ?';
  db.query(sql, [sellername, type], (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ message: 'Error querying database' });
    }

    if (results.length > 0) {
      res.status(200).json({
        message: 'Successfully Fetched Data',
        data: results
      });
    } else {
      res.status(404).json({ message: 'No meals found for the given criteria' });
    }
  });
});

{/*For adding subscription plan */}

app.post('/api/adddsubs', (req, res) => {
  const { type, planname, sellername, days, price, description } = req.body;

  console.log('Received adddubs request:', req.body);

  const sql = 'INSERT INTO addsubs (type, planname, sellername, days, price, description) VALUES ( ?, ?, ?, ?, ?, ?)';
  db.query(sql, [type, planname, sellername, days, price, description], (err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ error: 'Error querying database' });
    }
    console.log('Plan saved successfully:', result);
    res.status(200).json({ message: 'Plan data saved successfully' });
  });
});

{/*Removing meal subscription Plan*/}
app.post('/api/removesubs', (req, res) => {
  const { id, planname, sellername } = req.body;

  console.log('Received delete request:', req.body);

  const sql = 'delete from addsubs where id=? and planname=? and sellername=?';
  db.query(sql, [id, planname,sellername], (err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ error: 'Error querying database' });
    }
    console.log('Meal subscription Plan deleted successfully:', result);
    res.status(200).json({ message: 'Deleted successfully' });
  });
});

{/*For getting available meal subscription plans*/}
app.post('/api/viewsubs', (req, res) => {
  const { type, sellername } = req.body;

  const sql = 'SELECT * FROM addsubs WHERE sellername = ? AND type = ?';
  db.query(sql, [sellername, type], (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ message: 'Error querying database' });
    }

    if (results.length > 0) {
      res.status(200).json({
        message: 'Successfully Fetched Data',
        data: results
      });
    } else {
      res.status(404).json({ message: 'No mealsubscription found for the given criteria' });
    }
  });
});

{/*for checking meal*/}
app.post('/api/Checkmeal', (req, res) => {
  const { type, priceRange } = req.body;
  console.log(priceRange);

  const [minPrice, maxPrice] = priceRange.split(',').map(Number);

  if (isNaN(minPrice) || isNaN(maxPrice)) {
    return res.status(400).json({ message: 'Invalid price range provided' });
  }

  const sql = 'SELECT * FROM adddish WHERE price BETWEEN ? AND ? AND type = ?';
  db.query(sql, [minPrice, maxPrice, type], (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ message: 'Error querying database' });
    }

    if (results.length > 0) {
      res.status(200).json({
        message: 'Successfully Fetched Data',
        data: results
      });
    } else {
      res.status(404).json({ message: 'No meals found for the given criteria' });
    }
  });
});

// API endpoint to handle addcart
app.post('/api/addcart', (req, res) => {
  const { meal_id, meal_type, planname, sellername, days, price, description, username } = req.body;

  const query = 'INSERT INTO addcart (meal_id, meal_type, planname, sellername, days, price, description, username) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [meal_id, meal_type, planname, sellername, days, price, description, username], (err, result) => {
    if (err) {
        console.error('Error inserting meal into cart:', err);
        return res.status(500).json({ error: 'Failed to add meal to cart' });
    }
    res.status(200).json({ message: 'Meal added to cart successfully' });
  });
});

{/*For getting available addcart meal plans*/}
app.post('/api/viewcart', (req, res) => {
  const { type, username } = req.body;

  const sql = 'SELECT * FROM addCart WHERE username = ? AND meal_type = ?';
  db.query(sql, [username, type], (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ message: 'Error querying database' });
    }

    if (results.length > 0) {
      res.status(200).json({
        message: 'Successfully Fetched Data',
        data: results
      });
    } else {
      res.status(404).json({ message: 'No meals found for the given criteria' });
    }
  });
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


