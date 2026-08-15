import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Test connection on startup
pool.on('connect', () => console.log('Connected to PostgreSQL'));
pool.on('error', (err) => console.error('Unexpected PG error', err));

export default pool;