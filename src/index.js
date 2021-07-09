const express = require('express');
const cors = require('cors');
const { createUser, isUserRegistered, findUser, getUsers } = require('./services/UserService');

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

  createUser(name, username);
  return response.status(201).send();
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  const { username } = request;
  const user = findUser(username);
  return response.json(user.todos);
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;