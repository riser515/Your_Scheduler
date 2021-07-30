import './styles.css';

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const tasksRoot = document.querySelector('.tasks');
const list = tasksRoot.querySelector('.tasks__list');
const count = tasksRoot.querySelector('.tasks__count');
const clear = tasksRoot.querySelector('.tasks--clear');
const form = document.forms.tasks;
const input = form.elements.task;

function saveTasksToStorage(tasks){
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTask(tasks){
    let taskString = '';
    tasks.forEach((task, index) => {
        taskString += `
        <li data-id="${index}"${task.complete ? 'class="task--complete"' : ''}>
          <input type="checkbox"${task.complete ? 'checked' : ''} />
          <span>${task.text}</span>
          <button type="button"></button>
        </li>
        `
    });
    list.innerHTML = taskString;
    count.innerText = tasks.filter(task => !task.complete).length;
    clear.style.display = tasks.filter(task => task.complete).length ? 'block' : 'none';
}

function addTask(e){
    e.preventDefault();
    const text = input.value.trim();
    const complete = false;
    tasks = [
        ...tasks,
        {
            text,
            complete
        }
    ];
    renderTask(tasks);
    saveTasksToStorage(tasks);
    input.value = '';
}

function updateTask(e){
    const id = parseInt(e.target.parentNode.getAttribute('data-id'), 10);
    let complete = e.target.checked;
    tasks = tasks.map((task,index) => {
        if(index === id){
            return{
                ...task,
                complete
            };
        }
        return task;
    });
    renderTask(tasks);
    saveTasksToStorage(tasks);
}

function deleteTask(e){
    if(e.target.nodeName.toLowerCase() !== 'button'){
        return;
    }
    const id = parseInt(e.target.parentNode.getAttribute('data-id'), 10);
    const text = e.target.previousElementSibling.innerText;
    if(window.confirm(`Do you want to delete ${text}?`)){
        tasks = tasks.filter((task, index) => index!== id);
        renderTask(tasks);
        saveTasksToStorage(tasks, JSON.stringify(tasks));
    }
}

function clearCompletedTasks(){
    const count = tasks.filter(task => task.complete).length;

    if(count == 0){
        return;
    }

    if(window.confirm(`Do you want to delete ${count} tasks?`)){
        tasks = tasks.filter(task => !task.complete);
        renderTask(tasks);
        saveTasksToStorage(tasks);
    }
}

function init(){
    renderTask(tasks);
    form.addEventListener('submit', addTask);
    list.addEventListener('change', updateTask);
    list.addEventListener('click', deleteTask);
    clear.addEventListener('click', clearCompletedTasks);
}

init();
