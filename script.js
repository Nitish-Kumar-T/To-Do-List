const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

let tasks = [];

taskForm.addEventListener('submit', addTask);

function addTask(e) {
    e.preventDefault();
    if (taskInput.value.trim() === '') return;

    const task = {
        id: Date.now(),
        text: taskInput.value,
        completed: false
    };
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    
    let tasks = [];
    
    taskForm.addEventListener('submit', addTask);
    
    function addTask(e) {
        e.preventDefault();
        if (taskInput.value.trim() === '') return;
    
        const task = {
            id: Date.now(),
            text: taskInput.value,
            completed: false
        };
    
        tasks.push(task);
        renderTask(task);
        taskInput.value = '';
    }
    
    function renderTask(task) {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
            <span class="task-text">${task.text}</span>
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
        const taskElement = document.querySelector(`[onclick="toggleComplete(${id})"]`).parentNode.parentNode;
        taskElement.classList.toggle('completed');
    }
    
    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        const taskElement = document.querySelector(`[onclick="deleteTask(${id})"]`).parentNode.parentNode;
        taskList.removeChild(taskElement);
    }
    tasks.push(task);
    renderTask(task);
    taskInput.value = '';
}

function renderTask(task) {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.innerHTML = `
        <span class="task-text">${task.text}</span>
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
    const taskElement = document.querySelector(`[onclick="toggleComplete(${id})"]`).parentNode.parentNode;
    taskElement.classList.toggle('completed');
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    const taskElement = document.querySelector(`[onclick="deleteTask(${id})"]`).parentNode.parentNode;
    taskList.removeChild(taskElement);
}