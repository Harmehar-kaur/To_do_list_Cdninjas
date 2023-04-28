const tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

console.log('Working');


function addTaskToDOM(task){
    const li= document.createElement('li');
    li.innerHTML =`
          <input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} class="custom-checkbox">
          <label for="${task.id}">${task.text}</label>
          <i class="fa-solid fa-trash-can delete" data-id="${task.id}"></i>
    `;

    taskList.append(li);
}

function renderList () {
    taskList.innerHTML = '';

    for(let i =0; i<tasks.length;i++){
        addTaskToDOM(tasks[i]);
    }

    tasksCounter.innerHTML = tasks.length;
}

function toggleTask (taskId) {
    const task = tasks.filter(function (task){
        return task.id === taskId;
    });

    if (task.length > 0){
        const currentTask = task[0];
        currentTask.done = !currentTask.done; 
        renderList();
        showNotification('Task toggled succesfully');
        return; 
    }
}

function deleteTask (taskId) {
    const newTasks = tasks.filter(function (task){
        return task.id !== taskId;
    });

    tasks = newTasks;
    renderList();
    showNotification('Task deleted succesfully');
}

function addTask (task) {
    if(task){
        tasks.push(task);
        renderList();
        showNotification('Task added succesfully');
        return;
    }

    showNotification('Task cannot be added');
}

function showNotification(text) {
    alert(text);
}

function handleInputKeyPress(e){
    if(e.key === "Enter"){
        const textInput = e.target.value;

        if(!textInput) {
            showNotification("Task text can't be empty");
            return;
        }

        const task = {
            text: textInput , 
            id: Date.now().toString(), 
            done: false , 
        }

        e.target.value='';
        addTask(task);
    }
}

addTaskInput.addEventListener('keyup', handleInputKeyPress);