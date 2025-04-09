// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const JWT_SECRET = process.env.JWT_SECRET;

const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await pool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
        [name, email, hashedPassword]
      );
      res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
      console.error('Signup Error:', err); // 👈 Add this line
      if (err.code === '23505') {
        res.status(400).json({ error: 'Email already registered' });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  };
  

const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const userCheck = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  
      if (userCheck.rows.length === 0) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      const user = userCheck.rows[0];
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
  
      res.json({ message: "Login successful", token });
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

module.exports = { signup, login };
