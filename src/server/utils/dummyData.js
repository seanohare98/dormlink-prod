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

exports.reset = [
  `DROP TABLE IF EXISTS users`,
  `CREATE TABLE users (
  sid int(10) primary key NOT NULL,
  first varchar(30) NOT NULL,
  last varchar(30) NOT NULL,
  email varchar(45) NOT NULL,
  hostel varchar(45),
  isComplete boolean DEFAULT false
)`,
  `INSERT INTO users VALUES (1155116399, 'sean', 'ohare', '1155116399@link.cuhk.edu.hk', 'PMHC', false), 
  (1155116299, 'rob', 'smith', '1155116299@link.cuhk.edu.hk', 'PMHC', false)`
];
