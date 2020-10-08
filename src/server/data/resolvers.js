module.exports = {
  Dorm: {
    users: parent => parent.getUsers()
  },
  User: {
    dorm: parent => parent.getDorm(),
    hobbies: parent => parent.getHobbies()
  },
  Query: {
    user: (parent, args, { req, db }) => db.user.findByPk(req.user.email),
    userEmail: (parent, { email }, { db }) => db.user.findByPk(email),
    userDorm: (parent, args, { req, db }) =>
      db.user.findAll({
        where: {
          dormName: req.user.dormName
        }
      }),
    users: (parent, args, { db }) => db.user.findAll(),
    dormName: (parent, { name }, { db }) => db.dorm.findByPk(name),
    dorms: (parent, args, { db }) => db.dorm.findAll(),
    hobbies: (parent, args, { db }) => db.hobby.findAll()
  },
  Mutation: {
    addUserHobby: async (parent, { hobby }, { req, db }) => {
      const selectedUser = await db.user.findByPk(req.user.email);
      const selectedHobby = await db.hobby.findByPk(hobby);
      selectedUser.addHobby(selectedHobby);
    },
    removeUserHobby: async (parent, { hobby }, { req, db }) => {
      const selectedUser = await db.user.findByPk(req.user.email);
      const selectedHobby = await db.hobby.findByPk(hobby);
      selectedUser.removeHobby(selectedHobby);
    },
    updateUser: (
      parent,
      {
        email,
        dorm,
        age,
        gender,
        classStanding,
        major,
        sleepStart,
        sleepEnd,
        cleanliness
      },
      { db }
    ) =>
      db.user
        .update(
          {
            age,
            gender,
            classStanding,
            major,
            sleepStart,
            sleepEnd,
            cleanliness,
            dormName: dorm,
            isComplete: true
          },
          {
            where: {
              email
            }
          }
        )
        .then(data => data[0]),
    deleteUser: (parent, { email }, { db }) =>
      db.user.destroy({
        where: {
          email
        }
      })
  }
};
