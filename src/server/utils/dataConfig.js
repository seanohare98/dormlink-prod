const Hostel = require('../models').hostel;
const User = require('../models').user;

exports.createHostels = hostelInfo => {
  hostelInfo.forEach(hostel => {
    Hostel.create({ id: hostel.name, affiliation: hostel.affiliation });
  });
};

exports.createUsers = userInfo => {
  userInfo.forEach(user => {
    User.create({
      sid: user.sid,
      firstName: user.first,
      lastName: user.last,
      hostelId: user.hostel,
      email: user.email,
      schedule: user.schedule,
      participation: user.participation,
      cleanliness: user.cleanliness,
      studious: user.studious,
      isComplete: true
    });
  });
};
