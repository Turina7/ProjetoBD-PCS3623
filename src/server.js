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

// API endpoint para os pedidos filtrados por data parcialmente correspondente
app.get('/api/pedidos/data:data/', async (req, res) => {  // :data indica o parametro
  try {
    const { data } = req.params;
    const partialDate = `%${data}%`;
    const query = {
      text: 'SELECT * FROM pedidos WHERE data LIKE $1',
      values: [partialDate],
    };
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
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