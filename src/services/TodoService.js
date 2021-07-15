const { v4: uuidv4 } = require("uuid");

module.exports = {
  createTodo(user, title, deadline) {
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

  updateTodoTitleAndDeadline(userData){
    return updateTodo(userData);
  },

  updateTodoStatus(userData){
    return updateTodo(userData);
  },

  deleteTodo(user, id){
    const todoIndex = findTodoIndex(user, id);
    user.todos.splice(todoIndex, 1);
  },

  isTodoRegistered(user, id){
    const todo = findTodo(user, id);
    
    if(!todo){
      return false;
    }
    return true;
  },

  getTodos(user) {
    return user.todos;
  },
};

const updateTodo = ({ user, id, title, deadline }) => {
  const todoIndex = findTodoIndex(user, id);
  const todo = user.todos[todoIndex];

  if (!title && !deadline) {
    user.todos[todoIndex] = { ...todo, done: true };
  } else {
    user.todos[todoIndex] = { ...todo, title, deadline };
  }
  return user.todos[todoIndex];
}

const findTodoIndex = (user, id) => {
  return user.todos.findIndex((todo) => todo.id == id);
}

const findTodo = (user, id) => {
  return user.todos.find(todo => todo.id === id);
}