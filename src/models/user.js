const users = [];

module.exports = {
  getUser(username) {
    return users.find((u) => u.username === username);
  },

  getUsers() {
    return users;
  }
};
