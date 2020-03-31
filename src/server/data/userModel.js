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

User.findOrCreate = (profile, handler) => {
  sql.query(`SELECT * FROM users WHERE sid = ${profile.sid}`, (err, rows) => {
    if (!err && rows.length) return handler(rows[0]);
    return handler(false);
  });
};

User.create = newUser => {
  sql.query('INSERT INTO users SET ?', newUser, (err, rows) => {
    if (err) return err;
    return rows;
  });
};

User.get = sid => {
  sql.query(`SELECT * FROM users WHERE sid = ${sid}`, (err, rows) => {
    if (err) return err;
    if (rows.length) return rows[0];
    return { message: 'User not found.' };
  });
};

User.update = args => {
  sql.query(`UPDATE users SET ? WHERE sid = ${args.sid}`, args, (err, rows) => {
    if (err) return err;
    return rows;
  });
};

User.delete = sid => {
  sql.query(`DELETE * FROM users SET WHERE sid = ${sid}`, (err, rows) => {
    if (err) return err;
    return rows;
  });
};

module.exports = User;
