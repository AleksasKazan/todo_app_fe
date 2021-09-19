async function getTodos(currentApi) {
    const response = await fetch('https://localhost:5001/todos', {
        // method: 'GET',
        headers: {
            'ApiKey': currentApi,
        },
    });
    return response.json();
}

async function getTodo(id) {
    let response = await fetch('https://localhost:5001/todos/' + id, {
        // method: 'GET',
        headers: {
            'ApiKey': 'e5fe4693419f47ee8490f0ec85c10a9b',
        },
    });
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
            'ApiKey': 'e5fe4693419f47ee8490f0ec85c10a9b',
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
            'ApiKey': 'e5fe4693419f47ee8490f0ec85c10a9b',
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
            'ApiKey': 'e5fe4693419f47ee8490f0ec85c10a9b',
        },
    })
    return response.json();
}

async function deleteTodo(id) {
    await fetch('https://localhost:5001/todos/' + id, {
        method: 'DELETE',
        'ApiKey': 'e5fe4693419f47ee8490f0ec85c10a9b',
    });
}