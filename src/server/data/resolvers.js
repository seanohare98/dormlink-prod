module.exports = {
  Hostel: {
    users: parent => parent.getUsers()
  },
  User: {
    hostel: parent => parent.getHostel()
  },
  Query: {
    user: (parent, args, { req, db }) => db.user.findByPk(req.user.id),
    userSid: (parent, { sid }, { db }) => db.user.findByPk(sid),
    usersHostel: (parent, args, { req, db }) =>
      db.user.findAll({
        where: {
          hostelId: req.user.hostelId
        }
      }),
    users: (parent, args, { db }) => db.user.findAll(),
    hostel: (parent, { id }, { db }) => db.hostel.findByPk(id),
    hostels: (parent, args, { db }) => db.hostel.findAll()
  },
  Mutation: {
    updateUser: (
      parent,
      { sid, hostel, schedule, cleanliness, participation, studious },
      { db }
    ) =>
      db.user.update(
        {
          schedule,
          cleanliness,
          participation,
          studious,
          hostelId: hostel,
          isComplete: true
        },
        {
          where: {
            sid
          }
        }
      ),
    deleteUser: (parent, { sid }, { db }) =>
      db.user.destroy({
        where: {
          sid
        }
      })
  }
};
