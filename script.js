const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const dueDateInput = document.getElementById('due-date-input');
const priorityInput = document.getElementById('priority-input');
const taskList = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

taskForm.addEventListener('submit', addTask);

function addTask(e) {
    e.preventDefault();
    if (taskInput.value.trim() === '') return;

    const task = {
        id: Date.now(),
        text: taskInput.value,
        completed: false,
        dueDate: dueDateInput.value,
        priority: priorityInput.value
    };

    tasks.push(task);
    saveTasks();
    renderTask(task);
    taskInput.value = '';
    dueDateInput.value = '';
    priorityInput.value = 'low';
}

function renderTask(task) {
    const li = document.createElement('li');
    li.className = `task-item ${task.priority}`;
    li.innerHTML = `
        <div class="task-info">
            <span class="task-text">${task.text}</span>
            <span class="task-date">Due: ${task.dueDate || 'No date set'}</span>
        </div>
        <div>
            <button onclick="toggleComplete(${task.id})">Complete</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        </div>
    `;
    taskList.appendChild(li);
}

function toggleComplete(id) {
    const task = tasks.find(task => task.id === id);
    task.completed = !task.completed;
    saveTasks();
    const taskElement = document.querySelector(`[onclick="toggleComplete(${id})"]`).parentNode.parentNode;
    taskElement.classList.toggle('completed');
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    const taskElement = document.querySelector(`[onclick="deleteTask(${id})"]`).parentNode.parentNode;
    taskList.removeChild(taskElement);
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    tasks.forEach(task => renderTask(task));
}

loadTasks();