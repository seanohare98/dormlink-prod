const mysql = require('mysql');
const { reset } = require('./dummyData');

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB
});

connection.connect(err => {
  if (err) return console.error(`MySQL Connection Error: ${err.stack}`);
  connection.query(reset[0]); // drop users table if it exists
  connection.query(reset[1]); // create new users table
  connection.query(reset[2]); // insert dummy data
  return console.log(`Server MySQL ID: ${connection.threadId}`);
});

module.exports = connection;
