const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.done ? 'completed' : '';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;
    checkbox.addEventListener('change', () => toggleTask(index));

    const span = document.createElement('span');
    span.textContent = task.text;
    span.className = 'task-text';

    li.appendChild(checkbox);
    li.appendChild(span);
    taskList.appendChild(li);
  });
}
/* 
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.done ? 'completed' : '';
    li.innerHTML = `
      ${task.text}
      <button onclick="toggleTask(${index})">✔</button>
      <button onclick="deleteTask(${index})">✖</button>
    `;
    taskList.appendChild(li);
  });
}
*/
function addTask() {
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ text, done: false });
    saveTasks();
    taskInput.value = '';
    renderTasks();
  }
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

addTaskBtn.addEventListener('click', addTask);
window.addEventListener('load', renderTasks);
