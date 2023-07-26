//connect to database
require("dotenv").config();
const pg = require("pg");
const db = new pg.Pool({
  host: process.env.db_host,
  user: process.env.db_user,
  password: process.env.db_password,
  database: process.env.db_database,
  port: process.env.db_port,
  // ssl: {
  //   rejectUnauthorized: false,
  // },
});

// Check connection

db.connect((err) => {
  if (err) {
    console.log(err);
  }
});

module.exports = db;
