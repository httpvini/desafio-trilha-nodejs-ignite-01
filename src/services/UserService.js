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
  },

  isUserRegistered(username) {
    const user = getUser(username);
    if (!user) {
      return false;
    }
    return true;
  },

  findUser(username) {
    const user = users.find((u) => u.username === username);
    console.log(`User found ${user}`);
    return user;
  },

  getUsers() {
    return users;
  }

};

const getUser = (username) => {
  return users.find((u) => u.username === username);
}