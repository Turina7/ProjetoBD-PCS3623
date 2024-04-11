const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ProjetoPCS3623',
  password: '01061968',
  port: 5432,
});

module.exports = pool;
