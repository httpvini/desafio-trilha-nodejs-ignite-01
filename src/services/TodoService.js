const { v4: uuidv4 } = require("uuid");
const { users } = require("../models/user");
const { findUser } = require("../services/UserService");

module.exports = {
  createTodo(username, title, deadline) {
    const user = findUser(username);
    const todo = {
      id: uuidv4(),
      title,
      done: false,
      deadline: new Date(deadline),
      created_at: new Date(),
    };

    user.todos.push(todo);
    return todo;
  },

  updateTodo(username, id, title, deadline) {
    const user = findUser(username);
    const todoIndex = findTodoIndex(user, id);
    const todo = user.todos[todoIndex];
    user.todos[todoIndex] = { ...todo, title, deadline };
    return user.todos[todoIndex];
  },

  updateTodoStatus(username, id) {
    const user = findUser(username);
    const todoIndex = findTodoIndex(user, id);
    const todo = user.todos[todoIndex];
    user.todos[todoIndex] = { ...todo, done: true };
    return user.todos[todoIndex];
  },

  getTodos(username) {
    const user = findUser(username);
    return user.todos;
  },
};

const findTodoIndex = (user, id) => {
  return (todoIndex = user.todos.findIndex((todo) => todo.id == id));
};