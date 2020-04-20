module.exports = {
  Hostel: {
    users: parent => parent.getUsers()
  },
  User: {
    hostel: parent => parent.getHostel()
  },
  Query: {
    user: (parent, args, { req, db }) => db.user.findByPk(req.user.id),
    users: (parent, args, { db }) => db.user.findAll(),
    hostel: (parent, { id }, { db }) => db.hostel.findByPk(id),
    hostels: (parent, args, { db }) => db.hostel.findAll()
  },
  Mutation: {
    updateUser: (parent, { sid, hostel }, { db }) =>
      db.user.update(
        {
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
