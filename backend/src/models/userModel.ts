import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

export interface User {
  id?: number;
  name: string;
  email: string;
  created_at?: Date;
}

export const getAllUsers = async (): Promise<User[]> => {
  const res = await pool.query('SELECT * FROM users ORDER BY id ASC');
  return res.rows;
};

export const getUserById = async (id: number): Promise<User | null> => {
  const res = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return res.rows[0] || null;
};

export const createUser = async (user: User): Promise<User> => {
  const res = await pool.query(
    'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
    [user.name, user.email]
  );
  return res.rows[0];
};

export const updateUser = async (id: number, user: Partial<User>): Promise<User | null> => {
  const fields = [];
  const values: any[] = [];
  let query = 'UPDATE users SET ';

  if (user.name) {
    values.push(user.name);
    fields.push(`name = $${values.length}`);
  }

  if (user.email) {
    values.push(user.email);
    fields.push(`email = $${values.length}`);
  }

  if (fields.length === 0) {
    return getUserById(id);
  }

  query += fields.join(', ');
  values.push(id);
  query += ` WHERE id = $${values.length} RETURNING *`;

  const res = await pool.query(query, values);
  return res.rows[0] || null;
};

export const deleteUser = async (id: number): Promise<boolean> => {
  const res = await pool.query('DELETE FROM users WHERE id = $1', [id]);
  return res.rowCount != null ? res.rowCount > 0: false;
};
