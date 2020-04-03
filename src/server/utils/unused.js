// const mysql = require('mysql');
// const { reset } = require('./dummyData');
//
// const connection = mysql.createConnection({
//   host: process.env.MYSQL_HOST,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   database: process.env.MYSQL_DB
// });
//
// connection.connect(err => {
//   if (err) return console.error(`MySQL Connection Error: ${err.stack}`);
//   connection.query(reset[0]); // drop users table if it exists
//   connection.query(reset[1]); // create new users table
//   connection.query(reset[2]); // insert dummy data
//   return console.log(`Server MySQL ID: ${connection.threadId}`);
// });
//
// module.exports = connection;
//
// const User = user => {
//   this.sid = user.sid;
//   this.first = user.first;
//   this.last = user.last;
//   this.email = user.email;
//   this.hostel = user.hostel;
//   this.completeProfile = user.completeProfile;
// };
//
// User.findOrCreate = (profile, handler) => {
//   sql.query(`SELECT * FROM users WHERE sid = ${profile.sid}`, (err, rows) => {
//     if (!err && rows.length) return handler(rows[0]);
//     return handler(false);
//   });
// };
//
// User.create = newUser => {
//   sql.query('INSERT INTO users SET ?', newUser, (err, rows) => {
//     if (err) return err;
//     return rows;
//   });
// };
//
// User.get = sid => {
//   sql.query(`SELECT * FROM users WHERE sid = ${sid}`, (err, rows) => {
//     if (rows.length) return rows[0];
//     return err || { message: 'User not found.' };
//   });
// };
//
// User.update = args => {
//   sql.query(`UPDATE users SET ? WHERE sid = ${args.sid}`, args, (err, rows) => {
//     if (err) return err;
//     return rows;
//   });
// };
//
// User.delete = sid => {
//   sql.query(`DELETE * FROM users SET WHERE sid = ${sid}`, (err, rows) => {
//     if (err) return err;
//     return rows;
//   });
// };
//
// module.exports = User;

// const { buildSchema } = require('graphql');
// const User = require('../data/userModel');
//
// exports.userSchema = buildSchema(`
//   type User {
//     sid: String
//     first: String
//     last: String
//     email: String
//     hostel: String
//     messages: Int
//     isComplete: Boolean
//   }
//   type Query {
//     getUser(sid: Int) : User
//   }
//   type Mutation {
//     updateUser(sid: Int, first: String, last: String, email: String, hostel: String) : Boolean
//     createUser(sid: Int, first: String, last: String, email: String, hostel: String) : Boolean
//     deleteUser(sid: Int) : Boolean
//   }
// `);
//
// exports.root = {
//   getUser: (_, args, context) => {
//     console.log(args);
//     args.res.send(User.get(_.sid));
//   },
//
//   updateUser: args => User.update(args),
//
//   createUser: args => User.create(args),
//
//   deleteUser: ({ sid }) => User.delete(sid)
// };

// CREATE DATABASE  IF NOT EXISTS `dormlink`
// USE `dormlink`;

// `DROP TABLE IF EXISTS `users`;
// CREATE TABLE `users` (
//   `sid` int(10) NOT NULL,
//   `first` varchar(30) NOT NULL,
//   `last` varchar(30) NOT NULL,
//   `email` varchar(45) NOT NULL,
//   `hostel` varchar(45),
//   `isComplete` boolean DEFAULT false,
//   PRIMARY KEY (`sid`)
// ) DEFAULT CHARSET=utf8;
//
// INSERT INTO `users` VALUES (1155116399, 'sean', 'ohare', '1155116399@link.cuhk.edu.hk', 'PMHC', false),
// (1155116299, 'rob', 'smith', '1155116299@link.cuhk.edu.hk', 'PMHC', false);`

// exports.reset = [
//   `DROP TABLE IF EXISTS users`,
//   `CREATE TABLE users (
//   sid int(10) primary key NOT NULL,
//   first varchar(30) NOT NULL,
//   last varchar(30) NOT NULL,
//   email varchar(45) NOT NULL,
//   hostel varchar(45),
//   messages int(10) DEFAULT 0,
//   isComplete boolean DEFAULT false
// )`,
//   `INSERT INTO users VALUES
// (1155116399, 'sean', 'ohare', '1155116399@link.cuhk.edu.hk', 'PMHC', 2, false),
// (1155116299, 'rob', 'smith', '1155116299@link.cuhk.edu.hk', 'PMHC', 0, false),
// (1155110767, 'tsz', 'po', '1155110767@link.cuhk.edu.hk', '', 2, false),
// (1155108154, 'chun', 'kong','1155108154@link.cuhk.edu.hk', '', 4, false),
// (1155093001, 'ki', 'wong', '1155093001@link.cuhk.edu.hk', '', 3, false),
// (1155094029, 'cheuk', 'li', '1155094029@link.cuhk.edu.hk', '', 2, false);`
// ];
