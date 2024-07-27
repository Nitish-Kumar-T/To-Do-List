const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const dueDateInput = document.getElementById('due-date-input');
const priorityInput = document.getElementById('priority-input');
const categoryInput = document.getElementById('category-input');
const taskList = document.getElementById('task-list');
const searchInput = document.getElementById('search-input');
const sortSelect = document.getElementById('sort-select');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

taskForm.addEventListener('submit', addTask);
searchInput.addEventListener('input', filterTasks);
sortSelect.addEventListener('change', sortTasks);

function addTask(e) {
    e.preventDefault();
    if (taskInput.value.trim() === '') return;

    const task = {
        id: Date.now(),
        text: taskInput.value,
        completed: false,
        dueDate: dueDateInput.value,
        priority: priorityInput.value,
        category: categoryInput.value
    };

    tasks.push(task);
    saveTasks();
    renderTask(task);
    taskInput.value = '';
    dueDateInput.value = '';
    priorityInput.value = 'low';
    categoryInput.value = '';
}

function renderTask(task) {
    const li = document.createElement('li');
    li.className = `task-item ${task.priority}`;
    li.innerHTML = `
        <div class="task-info">
            <span class="task-text">${task.text}</span>
            <span class="task-date">Due: ${task.dueDate || 'No date set'}</span>
            <span class="task-category">Category: ${task.category || 'None'}</span>
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
    taskList.innerHTML = '';
    tasks.forEach(task => renderTask(task));
}

function filterTasks() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredTasks = tasks.filter(task => 
        task.text.toLowerCase().includes(searchTerm) ||
        task.category.toLowerCase().includes(searchTerm)
    );
    taskList.innerHTML = '';
    filteredTasks.forEach(task => renderTask(task));
}

function sortTasks() {
    const sortBy = sortSelect.value;
    tasks.sort((a, b) => {
        if (sortBy === 'date') {
            return new Date(a.dueDate) - new Date(b.dueDate);
        } else if (sortBy === 'priority') {
            const priorityOrder = { low: 1, medium: 2, high: 3 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        } else if (sortBy === 'category') {
            return a.category.localeCompare(b.category);
        }
    });
    loadTasks();
}

loadTasks();