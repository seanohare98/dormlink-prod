const Hostel = require('../models').hostel;

exports.createHostels = hostelInfo => {
  hostelInfo.forEach(hostel => {
    Hostel.create({ id: hostel.name, affiliation: hostel.affiliation });
  });
};
