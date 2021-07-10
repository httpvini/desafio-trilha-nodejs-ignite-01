const { v4: uuidv4 } = require("uuid");

module.exports = {
    createTodo(user, title, deadline) {
        const todo = {
            id: uuidv4(),
            title,
            done: false,
            deadline: new Date(deadline),
            created_at: new Date()
        }

        user.todos.push(todo);
        return todo;
    },

    updateTodo(user, id, title, deadline) {
       const todoIndex = findTodoIndex(user, id);
       const todo = {...user.todos[todoIndex], title, deadline}
       user.todos[todoIndex] = todo;
       return user.todos[todoIndex];
    }
}

const findTodoIndex = (user, id) => {
    return user.todos.findIndex(todo => todo.id === id);
}