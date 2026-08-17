import pool from '../config/pool.js';

export const createCustomer = async ({ email, password_hash, first_name, last_name }) => {
  const result = await pool.query(
    `INSERT INTO customers (email, password_hash, first_name, last_name)
     VALUES ($1, $2, $3, $4)
     RETURNING id, email, first_name, last_name, created_at, updated_at`,
    [email, password_hash, first_name, last_name]
  );
  return result.rows[0];
};

export const findCustomerById = async (id) => {
  const result = await pool.query(
    `SELECT id, email, first_name, last_name, created_at, updated_at
     FROM customers
     WHERE id = $1`,
    [id]
  );
  return result.rows[0] || null;
};

export const findCustomerByEmail = async (email) => {
  const result = await pool.query(
    `SELECT id, email, password_hash, first_name, last_name, created_at, updated_at
     FROM customers
     WHERE email = $1`,
    [email]
  );
  return result.rows[0] || null;
};

export const findAllCustomers = async () => {
  const result = await pool.query(
    `SELECT id, email, first_name, last_name, created_at, updated_at
     FROM customers
     ORDER BY id ASC`
  );
  return result.rows;
};

export const updateCustomer = async (id, { first_name, last_name }) => {
  const result = await pool.query(
    `UPDATE customers
     SET first_name = COALESCE($1, first_name),
         last_name = COALESCE($2, last_name),
         updated_at = NOW()
     WHERE id = $3
     RETURNING id, email, first_name, last_name, created_at, updated_at`,
    [first_name, last_name, id]
  );
  return result.rows[0] || null;
};

export const deleteCustomer = async (id) => {
  const result = await pool.query(
    `DELETE FROM customers
     WHERE id = $1
     RETURNING id`,
    [id]
  );
  return result.rows[0] || null;
};