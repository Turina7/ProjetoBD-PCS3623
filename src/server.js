const express = require('express');
const cors = require('cors');
const pool = require('./db');
const app = express();


app.use(cors());

// API endpoint para os produtos
app.get('/api/produtos', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM produtos');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API endpoint para os produtos filtrados por data
app.get('/api/produtos/:data', async (req, res) => {
  try {
    const { data } = req.params;
    const query = {
      text: 'SELECT * FROM produtos WHERE data = $1',
      values: [data],
    };
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API endpoint para os pedidos
app.get('/api/pedidos', async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT * FROM pedidos');
      res.json(rows);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // API endpoint para os clientes
app.get('/api/clientes', async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT * FROM clientes');
      res.json(rows);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Start the Express server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
