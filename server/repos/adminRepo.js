import pool from '../config/pool.js';

export const createAdmin = async ({ email, password_hash, first_name, last_name, role = 'admin' }) => {
  const result = await pool.query(
    `INSERT INTO admins (email, password_hash, first_name, last_name, role)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, email, first_name, last_name, role, created_at, updated_at`,
    [email, password_hash, first_name, last_name, role]
  );
  return result.rows[0];
};

export const findAdminByEmail = async (email) => {
  const result = await pool.query(
    `SELECT id, email, password_hash, first_name, last_name, role, created_at, updated_at
     FROM admins
     WHERE email = $1`,
    [email]
  );
  return result.rows[0] || null;
};

export const findAdminById = async (id) => {
  const result = await pool.query(
    `SELECT id, email, first_name, last_name, role, created_at, updated_at
     FROM admins
     WHERE id = $1`,
    [id]
  );
  return result.rows[0] || null;
};