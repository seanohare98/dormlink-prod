const sql = require('../utils/mysqlConfig');

// constructor
const User = user => {
  this.sid = user.sid;
  this.first = user.first;
  this.last = user.last;
  this.email = user.email;
  this.hostel = user.hostel;
  this.completeProfile = user.completeProfile;
};

User.create = (newUser, result) => {
  sql.query('INSERT INTO users SET ?', newUser, (err, res) => {
    if (err) result(err, null);
    result(null, { id: res.insertId, ...newUser });
  });
};

User.findById = (userSID, result) => {
  sql.query(`SELECT * FROM users WHERE sid = ${userSID}`, (err, res) => {
    if (err) return result(err, null);
    if (res.length) return result(null, res[0]);
    return result({ message: 'User not found.' }, null);
  });
};

User.getAll = result => {
  sql.query('SELECT * FROM users', (err, res) => {
    if (err) result(err, null);
    result(null, res);
  });
};

module.exports = User;
