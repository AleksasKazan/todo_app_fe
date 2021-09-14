// variables
var todoForm = document.getElementById("todo-form");
var todoList = document.getElementById("todos");
var doneList = document.getElementById("dones");
var todoInputTitle = document.getElementById("todo-input");
var todoInputDescription = document.getElementById("todo-input-description");
var todoSelectDifficulty = document.getElementById("inputGroupSelectDifficulty");
var editInputTitleModal = document.getElementById('edit-input-modal');
var editInputDescriptionModal = document.getElementById('edit-input-description-modal');
var todoSelectDifficultyModal = document.getElementById("inputGroupSelectDifficulty-modal");
var editModal = document.getElementById("edit-modal");
var currentId;

window.onload = async() => {
    const todos = await getTodos();
    todos.forEach(todo => {
        var todoItem = `
            <div class="border border-1 shadow-sm p-3 mb-3 rounded todo-item" data-id=${todo.id}>
                <h4 class="mb-3 input-name">${todo.title}</h4>
                <p class="mb-6 input-name">${todo.description}</p>
                <h6 class="mb-6 input-name">${todo.difficulty}</h6>
                <button type="button" class="btn btn-danger delete">Delete</button>
                <button type="button" class="btn btn-success move-todo">${!todo.isCompleted ? "Move to Done" : "Move Back"}</button>
                <button type="button" class="btn btn-warning edit" data-bs-toggle="modal"
                    data-bs-target="#edit-modal">Edit</button>
            </div>`;
        if (!todo.isCompleted) {
            todoList.innerHTML += todoItem;
        } else {
            doneList.innerHTML += todoItem;
        }
    });
}

todoForm.addEventListener("submit", async function(e) {
    e.preventDefault();

    if (todoInputTitle.value.length > 0 && todoInputDescription.value.length > 0 && todoSelectDifficulty.value !== "") {
        todoInputTitle.classList.remove("is-invalid");
        todoInputDescription.classList.remove("is-invalid");
        // todoSelectDifficulty.classList.remove("is-invalid");
        await addTodo(todoInputTitle.value, todoInputDescription.value, todoSelectDifficulty.value);
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
        await deleteTodo(id);
        location.reload();
        return;
    }

    if (e.target.matches(".move-todo")) {
        let card = e.target.closest(".todo-item");
        let id = card.attributes['data-id'].value;
        await updateTodoStatus(id);
        location.reload();
    }

    if (e.target.matches('.edit')) {
        let card = e.target.closest(".todo-item");
        currentId = card.attributes['data-id'].value;
        let todo = await getTodo(currentId);
        editInputTitleModal.value = todo.title;
        editInputDescriptionModal.value = todo.description;
        todoSelectDifficultyModal.value = todo.difficulty;
    }
    if (e.target.matches('.edit-submit')) {
        todoInputTitle = editInputTitleModal.value;
        todoInputDescription = editInputDescriptionModal.value;
        todoSelectDifficulty = todoSelectDifficultyModal.value;
        await editTodo(currentId, todoInputTitle, todoInputDescription, todoSelectDifficulty);
        location.reload();
    }
});