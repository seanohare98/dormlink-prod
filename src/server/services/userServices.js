const User = require('../data/userModel.js');
const { extractAzureProfile } = require('../utils/common.js');

exports.findOrCreate = (profile, callback) => {
  User.findById(extractAzureProfile(profile).sid, (err, status) => {
    if (err) return callback(false);
    return callback(status);
  });
};
