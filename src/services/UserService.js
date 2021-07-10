const { v4: uuidv4 } = require("uuid");

const users = [];

module.exports = {
  createUser(name, username) {
    const user = {
      id: uuidv4(),
      name,
      username,
      todos: [],
    };
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
  }
};

const getUser = (username) => {
  return users.find((u) => u.username === username);
}