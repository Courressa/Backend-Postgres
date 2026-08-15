import pool from './server/config/pool.js';

async function testConnection() {
  try {
    const result = await pool.query('SELECT NOW() as current_time, version() as pg_version');
    console.log('✅ Successfully connected to Neon Postgres!');
    console.log('Current time:', result.rows[0].current_time);
    console.log('Postgres version:', result.rows[0].pg_version.split(' ')[0] + ' ' + result.rows[0].pg_version.split(' ')[1]);
  } catch (err) {
    console.error('❌ Connection failed:');
    console.error(err.message);
  } finally {
    await pool.end(); // close the pool so the script exits
  }
}

testConnection();