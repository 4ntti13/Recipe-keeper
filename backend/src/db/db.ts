import { Pool } from 'pg';

import dotenv from 'dotenv';
dotenv.config();

const portString = process.env.DB_PORT;
const port = portString ? parseInt(portString) : 5432;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: port,
  });

export default pool;