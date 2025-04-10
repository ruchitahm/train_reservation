// index.js
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();


// API routes here
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from backend!' });
  });
  
  // Catch-all to serve React
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  });

const authRoutes = require('./routes/authRoutes');
const seatRoutes = require("./routes/seatRoutes");

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use("/api/seats", seatRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
