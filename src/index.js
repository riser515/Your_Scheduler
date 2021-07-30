import './styles.css';

let tasks = [];
const tasksRoot = document.querySelector('.tasks');
const list = tasksRoot.querySelector('.tasks__list');
const count = tasksRoot.querySelector('.tasks__count');
const form = document.forms.tasks;
const input = form.elements.task;

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
}

function init(){
    form.addEventListener('submit', addTask);
    list.addEventListener('change', updateTask);
}

init();
