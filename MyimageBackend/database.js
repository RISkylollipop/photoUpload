const express = require(`express`);
const sql = require(`mysql2`);

require(`dotenv`).config();

const db = sql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DATABASE,
});

db.connect((err, result) => {
  if (err) {
    console.log(`err connecting - ERROR: ${err}`);
  }
  console.log(`database connected`);
});

module.exports = db;
