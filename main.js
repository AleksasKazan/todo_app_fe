// variables
var todoForm = document.getElementById("todo-form");
var todoList = document.getElementById("todos");
var doneList = document.getElementById("dones");
var todoIdModal = document.getElementById("id-modal");
var todoInputTitle = document.getElementById("todo-input");
var todoInputDescription = document.getElementById("todo-input-description");
var todoSelectDifficulty = document.getElementById("inputGroupSelectDifficulty");
var editInputTitleModal = document.getElementById('edit-input-modal');
var editInputDescriptionModal = document.getElementById('edit-input-description-modal');
var todoSelectDifficultyModal = document.getElementById("inputGroupSelectDifficulty-modal");
var editModal = document.getElementById("edit-modal");

window.onload = async() => {
    const todos = await getTodos();
    todos.forEach(todo => {
        if (!todo.isCompleted) {
            var todoItem = `
            <div class="border border-1 shadow-sm p-3 mb-3 rounded todo-item" data-id=${todo.id} data-status=${todo.isCompleted}>
                <h4 class="mb-3 input-name">${todo.title}</h4>
                <p class="mb-6 input-name">${todo.description}</p>
                <h6 class="mb-6 input-name">${todo.difficulty}</h6>
                <button type="button" class="btn btn-danger delete">Delete</button>
                <button type="button" class="btn btn-success move-todo">Move to Done</button>
                <button type="button" class="btn btn-warning edit" data-bs-toggle="modal"
                    data-bs-target="#edit-modal">Edit</button>
            </div>`;
            todoList.innerHTML += todoItem;
        } else {
            var todoItem = `
            <div class="border border-1 shadow-sm p-3 mb-3 rounded todo-item" data-id=${todo.id} data-status=${todo.isCompleted}>
                <h4 class="mb-3 input-name">${todo.title}</h4>
                <p class="mb-6 input-name">${todo.description}</p>
                <h6 class="mb-6 input-name">${todo.difficulty}</h6>
                <button type="button" class="btn btn-danger delete">Delete</button>
                <button type="button" class="btn btn-success move-todo">Move Back</button>
                <button type="button" class="btn btn-warning edit" data-bs-toggle="modal"
                    data-bs-target="#edit-modal">Edit</button>
            </div>`;
            doneList.innerHTML += todoItem;
        }
    });
}

todoForm.addEventListener("submit", function(e) {
    e.preventDefault();

    if (todoInputTitle.value.length > 0 && todoInputDescription.value.length > 0 && todoSelectDifficulty.value !== "") {
        todoInputTitle.classList.remove("is-invalid");
        todoInputDescription.classList.remove("is-invalid");
        // todoSelectDifficulty.classList.remove("is-invalid");

        addTodo(todoInputTitle.value, todoInputDescription.value, todoSelectDifficulty.value);
        location.reload();
    } else {
        todoInputTitle.classList.add("is-invalid");
        todoInputDescription.classList.add("is-invalid");
    }
});

// Todo item card actions
document.addEventListener("click", async function(e) {
    if (e.target.matches(".delete")) {
        let card = e.target.closest(".todo-item");
        let id = card.attributes['data-id'].value;
        deleteTodo(id);
        location.reload();
        return;
    }

    if (e.target.matches(".move-todo")) {
        let card = e.target.closest(".todo-item");
        let id = card.attributes['data-id'].value;

        if (e.target.innerText == "Move to Done") {
            doneList.appendChild(card);
            updateTodoStatus(id);
            location.reload();
            return;
        }
        updateTodoStatus(id);
        location.reload();
    }

    if (e.target.matches('.edit')) {
        let card = e.target.closest(".todo-item");
        let id = card.attributes['data-id'].value;
        let todo = await getTodo(id);
        editInputTitleModal.value = todo.title;
        editInputDescriptionModal.value = todo.description;
        todoSelectDifficultyModal.value = todo.difficulty;
        todoIdModal.innerHTML = `<p class="mb-6 input-name">${id}</p>`;
    }
    if (e.target.matches('.edit-submit')) {
        let id = e.target.closest('.modal-content').querySelector('p').innerText;
        todoInputTitle = editInputTitleModal.value;
        todoInputDescription = editInputDescriptionModal.value;
        todoSelectDifficulty = todoSelectDifficultyModal.value;
        editTodo(id, todoInputTitle, todoInputDescription, todoSelectDifficulty);
        location.reload();
    }
});