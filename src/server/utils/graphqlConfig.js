const { buildSchema } = require('graphql');
const User = require('../data/userModel');

exports.userSchema = buildSchema(`
  type User {
    sid: String
    first: String
    last: String
    email: String
    hostel: String
    messages: Int
    isComplete: Boolean
  }
  type Query {
    getUser(sid: Int) : User
  }
  type Mutation {
    updateUser(sid: Int, first: String, last: String, email: String, hostel: String) : Boolean
    createUser(sid: Int, first: String, last: String, email: String, hostel: String) : Boolean
    deleteUser(sid: Int) : Boolean
  }
`);

exports.root = {
  getUser: (_, args, context) => {
    console.log(args);
    args.res.send(User.get(_.sid));
  },

  updateUser: args => User.update(args),

  createUser: args => User.create(args),

  deleteUser: ({ sid }) => User.delete(sid)
};
