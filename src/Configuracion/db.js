const { Pool } = require('pg');
require('dotenv').config();

// DEBUG temporal - lo sacamos despues
console.log('DATABASE_URL configurada:', process.env.DATABASE_URL ? 'SI' : 'NO');
console.log('Host detectado:', process.env.DATABASE_URL ? process.env.DATABASE_URL.split('@')[1] : 'N/A');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

pool.on('error', (err) => {
  console.error('Error inesperado en el pool de clientes de PostgreSQL', err);
  process.exit(-1);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};