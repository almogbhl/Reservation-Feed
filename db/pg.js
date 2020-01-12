const { Pool } = require('pg');

const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});

export const query = (text, params) => pool.query(text, params);
