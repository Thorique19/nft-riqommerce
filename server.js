require('dotenv').config();
const express = require('express');
const { Client } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// Database connection
const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false  // Allow connections without verifying SSL cert (or use your own SSL cert)
  }
});


client.connect();

// Routes
app.get('/api/products', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM produk');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Start server
app.listen(port, '0.0.0.0', () => {  // Corrected this line
  console.log(`Server running on port ${port}`);
});

