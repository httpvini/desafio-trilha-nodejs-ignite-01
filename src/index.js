const express = require('express');
const cors = require('cors');
const { createUser, isUserRegistered, findUser } = require('./services/UserService');
const { createTodo, updateTodo, updateTodoStatus, getTodos } = require('./services/TodoService');

const app = express();

app.use(cors());
app.use(express.json());

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;
  
  if(!isUserRegistered(username)) {
    response.status(404).json({error: `User ${username} not found!`});
  }

  request.username = username;

  return next();
}

app.post('/users', (request, response) => {
  const { name, username } = request.body;

  if(isUserRegistered(username)) {
    return response.status(400).json({error: `User ${username} already exists!`});
  }

  const user = createUser(name, username);

  return response.status(201).json(user);
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  const { username } = request;

  const todos = getTodos(username);

  return response.json(todos);
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  const { username } = request;
  const { title, deadline } = request.body;
  
  const todo = createTodo(username, title, deadline);

  return response.status(201).json(todo);
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  const { id } = request.params;
  const { username } = request;
  const { title, deadline } = request.body;

  const todo = updateTodo(username, id, title, deadline);

  return response.json(todo);
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  const { username } = request;
  const { id } = request.params;

  const todo = updateTodoStatus(username, id);

  return response.json(todo);
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;