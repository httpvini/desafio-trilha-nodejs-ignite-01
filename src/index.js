const express = require('express');
const cors = require('cors');
const { createUser, isUserRegistered, findUser } = require('./services/UserService');
const { createTodo, getTodos, updateTodoTitleAndDeadline, updateTodoStatus, deleteTodo, isTodoRegistered } = require('./services/TodoService');

const app = express();

app.use(cors());
app.use(express.json());

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;
  
  if(!isUserRegistered(username)) {
    response.status(404).json({error: `User ${username} not found!`});
  }

  request.user = findUser(username);

  return next();
}

function checkExistsTodoForUser(request, response, next) {
  const { username } = request.headers;
  const { id } = request.params;
  const user = findUser(username);
  
  if(!isTodoRegistered(user, id)) {
    return response.status(404).json({error: `Todo with id ${id} for user ${user.name} was not found!`})
  }
  
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
  const { user } = request;

  const todos = getTodos(user);

  return response.json(todos);
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const { title, deadline } = request.body;
  
  const todo = createTodo(user, title, deadline);

  return response.status(201).json(todo);
});

app.put('/todos/:id', checksExistsUserAccount, checkExistsTodoForUser, (request, response) => {
  const { id } = request.params;
  const { user } = request;
  const { title, deadline } = request.body;

  const userData = {
    user,
    id,
    title,
    deadline
  }

  const todo = updateTodoTitleAndDeadline(userData);

  return response.json(todo);
});

app.patch('/todos/:id/done', checksExistsUserAccount, checkExistsTodoForUser, (request, response) => {
  const { user } = request;
  const { id } = request.params;

  const userData = {
    user,
    id
  }

  const todo = updateTodoStatus(userData);

  return response.json(todo);
});

app.delete('/todos/:id', checksExistsUserAccount, checkExistsTodoForUser, (request, response) => {
  const { user } = request;
  const { id } = request.params;
  
  deleteTodo(user, id);

  return response.status(204).json([]);
});

module.exports = app;