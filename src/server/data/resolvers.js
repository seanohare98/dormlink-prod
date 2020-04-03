module.exports = {
  Hostel: {
    users: parent => parent.getUsers()
  },
  User: {
    hostel: parent => parent.getHostel()
  },
  Query: {
    user: (parent, args, { req, db }) => db.user.findByPk(req.user),
    users: (parent, args, { db }) => db.user.findAll(),
    hostel: (parent, { id }, { db }) => db.hostel.findByPk(id),
    hostels: (parent, args, { db }) => db.hostel.findAll()
  },
  Mutation: {
    createUser: (parent, { sid, firstName, lastName, email }, { db }) =>
      db.user.create({
        sid,
        firstName,
        lastName,
        email,
        hostel: null,
        isComplete: false
      }),
    updateUser: (parent, { sid, hostel }, { db }) =>
      db.user.update(
        {
          hostel
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
