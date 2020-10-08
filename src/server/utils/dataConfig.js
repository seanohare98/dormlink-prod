const Dorm = require('../models').dorm;
const User = require('../models').user;
const Hobby = require('../models').hobby;

exports.createHobbies = hobbyInfo => {
  hobbyInfo.forEach(hobby => {
    Hobby.create({ name: hobby.name });
  });
};

exports.createDorms = dormInfo => {
  dormInfo.forEach(dorm => {
    Dorm.create({ name: dorm.name, neighborhood: dorm.neighborhood });
  });
};

exports.createUsers = userInfo => {
  userInfo.forEach(user => {
    User.create({
      email: user.email,
      firstName: user.first,
      lastName: user.last,
      dormName: user.dorm,
      age: user.age,
      gender: user.gender,
      classStanding: user.classStanding,
      sleepStart: user.sleepStart,
      sleepEnd: user.sleepEnd,
      cleanliness: user.cleanliness,
      isComplete: true
    });
  });
};
