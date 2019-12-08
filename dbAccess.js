const assert = require('assert');
const mysql = require('mysql2/promise');
require('dotenv').config();

const { SQL_SERVER, SQL_DATABASE, SQL_USER, SQL_PASSWORD } = process.env;

// Verify we have all the data from the .env file we need:
assert(SQL_SERVER, 'SQL_SERVER value not found in .env file.');
assert(SQL_DATABASE, 'SQL_DATABASE value not found in .env file.');
assert(SQL_USER, 'SQL_USER value not found in .env file.');
assert(SQL_PASSWORD, 'SQL_PASSWORD value not found in .env file.');

let connection;

//
// Connect to MySQL DB:
//
exports.connectToDB = async () => {
  connection = await mysql.createConnection({
    host: SQL_SERVER,
    user: SQL_USER,
    password: SQL_PASSWORD,
    database: SQL_DATABASE
  });

  // Check the connection:
  //   conn.connect(error => {
  //     if (error) throw error;
  //     console.log(`Connected to ${SQL_DATABASE}`);
  //   });
  if (connection) console.log(`Connected to ${SQL_DATABASE}`);
  return connection;
};

exports.queryDB = async query => {
  try {
    const [rows, fields] = await connection.execute(query);
    return rows;
  } catch (e) {
    console.log('caught exception!', e);
  }
};
