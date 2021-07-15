const { v4: uuidv4 } = require("uuid");
const { getUsers, getUser } = require("../models/user");

module.exports = {
  createUser(name, username) {
    const user = {
      id: uuidv4(),
      name,
      username,
      todos: [],
    };
    const users = getUsers();
    users.push(user);
    return user;
  },

  isUserRegistered(username) {
    const user = getUser(username);
    if (!user) {
      return false;
    }
    return true;
  },

  findUser(username) {
    return getUser(username);
  },
};
