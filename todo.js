const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.static('public'));
const todos = [];
const completedTodos = [];
// Sample todos
todos.push({ id: 1, title: 'Buy milk', completed: 'NOT COMPLETED' });
todos.push({ id: 2, title: 'Buy bread', completed: 'NOT COMPLETED' });
// Add todo
app.post('/todos', (req, res) => {
    const { id, title } = req.body;
    if (!id || !title) return res.status(400).send("Missing id or title");
    todos.push({ id: parseInt(id, 10), title, completed: 'NOT COMPLETED' });
    res.send("TODO ADDED");
});
// Get all todos
app.get('/todos', (req, res) => res.json(todos));
app.get('/completed-todos', (req, res) => res.json(completedTodos));
// Update todo (mark as completed)
app.put('/todos', (req, res) => {
    const todoid = parseInt(req.query.id, 10);
    const index = todos.findIndex(t => t.id === todoid);
    if (index === -1) return res.status(404).send("TODO NOT FOUND");
    const completedTodo = todos.splice(index, 1)[0];
    completedTodo.completed = 'COMPLETED';
    completedTodos.push(completedTodo);
    res.send("TODO COMPLETED");
});
// Delete todo
app.delete('/todos', (req, res) => {
    const todoid = parseInt(req.query.id, 10);
    const index = todos.findIndex(t => t.id === todoid);
    if (index === -1) return res.status(404).send("TODO NOT FOUND");
    todos.splice(index, 1);
    res.send("TODO DELETED");
});
app.delete('/completed-todos', (req, res) => {
    completedTodos.splice(0, completedTodos.length);
    res.json(completedTodos);
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
