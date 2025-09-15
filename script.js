// Fetch todos from backend and render them
async function fetchTodos() {
    // Active todos
    const res = await fetch('/todos');
    const todos = await res.json();
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.textContent = todo.title;

        // Complete button
        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Complete';
        completeBtn.onclick = () => completeTodo(todo.id);

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteTodo(todo.id);

        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });

    // Completed todos
    const completedRes = await fetch('/completed-todos');
    const completed = await completedRes.json();
    const completedList = document.getElementById('completedList');
    completedList.innerHTML = '';
    completed.forEach(todo => {
        const li = document.createElement('li');
        li.textContent = todo.title;
        li.className = 'completed';
        completedList.appendChild(li);
    });
    //clear completed button
        const clearCompletedBtn = document.createElement('button');
        clearCompletedBtn.textContent = 'Clear Completed';
        clearCompletedBtn.onclick = () => clearCompleted();
        li.appendChild(clearCompletedBtn);

}

// Add a new todo
async function addTodo() {
    const title = document.getElementById('newTodo').value;
    if (!title) return alert('Please enter a todo');

    // Auto-generate ID
    const id = Date.now();

    await fetch('/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, title })
    });
    document.getElementById('newTodo').value = '';
    fetchTodos();
}

// Complete a todo
async function completeTodo(id) {
    await fetch(`/todos?id=${id}`, { method: 'PUT' });
    fetchTodos();
}

// Delete a todo
async function deleteTodo(id) {
    await fetch(`/todos?id=${id}`, { method: 'DELETE' });
    fetchTodos();
}
async function clearCompleted(){
    await fetch('/completed-todos', { method: 'DELETE' });
    fetchTodos();
}

// Initial fetch
fetchTodos();
