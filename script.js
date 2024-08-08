// Selectors
const todoInput = document.getElementById("todo-input");
const addButton = document.getElementById("add-button");
const todoList = document.getElementById("todo-list");

// Event Listeners
addButton.addEventListener("click", addTask);
todoList.addEventListener("click", deleteOrToggleTask);
document.addEventListener("DOMContentLoaded", loadTasks);

// Functions
function addTask() {
    const taskText = todoInput.value.trim();
    if (taskText !== "") {
        const todoItem = document.createElement("li");
        todoItem.textContent = taskText;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        todoItem.appendChild(deleteButton);

        todoList.appendChild(todoItem);

        saveTaskToLocalStorage(taskText);
        todoInput.value = "";
    }
}

function deleteOrToggleTask(event) {
    const item = event.target;
    
    if (item.tagName === "BUTTON") {
        const todoItem = item.parentElement;
        removeTaskFromLocalStorage(todoItem.textContent.replace("Delete", "").trim());
        todoItem.remove();
    } else {
        item.classList.toggle("completed");
        toggleTaskInLocalStorage(item.textContent.replace("Delete", "").trim());
    }
}

function saveTaskToLocalStorage(task) {
    let tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(task) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function toggleTaskInLocalStorage(task) {
    // Implementation can vary based on your needs
}

function getTasksFromLocalStorage() {
    return localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
}

function loadTasks() {
    let tasks = getTasksFromLocalStorage();
    tasks.forEach(task => {
        const todoItem = document.createElement("li");
        todoItem.textContent = task;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        todoItem.appendChild(deleteButton);

        todoList.appendChild(todoItem);
    });
}
