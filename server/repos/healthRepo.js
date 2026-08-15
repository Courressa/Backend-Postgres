import pool from '../config/pool.js';

export const checkDatabase = async () => {
    const result = await pool.query('SELECT NOW() as current_time');
    return result.rows[0];
};