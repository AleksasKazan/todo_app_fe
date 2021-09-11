async function getTodos() {
    const response = await fetch('https://localhost:5001/todos');
    return response.json();
}

async function getTodo(id) {
    let response = await fetch('https://localhost:5001/todos/' + id)
    return response.json();
}
async function addTodo(todoInputTitle, todoInputDescription, todoInputdifficulty) {
    let response = await fetch('https://localhost:5001/todos', {
        method: 'POST',
        body: JSON.stringify({
            title: todoInputTitle,
            description: todoInputDescription,
            difficulty: todoInputdifficulty,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    return response.json();
}

async function editTodo(id, todoInputTitle, todoInputDescription, todoSelectDifficulty) {
    let response = await fetch('https://localhost:5001/todos/' + id, {
        method: 'PUT',
        body: JSON.stringify({
            title: todoInputTitle,
            description: todoInputDescription,
            difficulty: todoSelectDifficulty,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    return response.json();
}

async function updateTodoStatus(id) {
    let response = await fetch('https://localhost:5001/todos/' + id + "/status", {
        method: 'PUT',
        body: JSON.stringify({}),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    return response.json();
}

async function deleteTodo(id) {
    await fetch('https://localhost:5001/todos/' + id, {
        method: 'DELETE'
    });
}