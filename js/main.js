let input = document.querySelector("[name='task']");
let submit = document.querySelector("[name='save']");
let tasksDiv = document.querySelector(".tasks");
let delAll = document.querySelector('.del-all');
// Create Array Of Tasks
let ArrayOfTasks = [];
// check if there are data in local storage
if (localStorage.getItem('tasks')) {
    ArrayOfTasks = JSON.parse(localStorage.getItem('tasks'));
    addElementToPageFrom(ArrayOfTasks);
}
//  add event into del button
tasksDiv.addEventListener('click', function (e) {
    if (e.target.classList.contains('del')) {
        deleteTaskWithId(e.target.parentElement.getAttribute('data-id'));
        e.target.parentElement.remove();
        showDelAllButton();
    }
    if (e.target.classList.contains('task')) {
        e.target.classList.toggle('done');
        upDateStatusTask(e.target.getAttribute('data-id'));
    }
});

document.forms[0].onsubmit = function (e) {
    e.preventDefault();
    if (input.value != '') {
        const task = {
            id: Date.now(),
            title: input.value,
            completed: false,
        };
        ArrayOfTasks.unshift(task);
        input.value = '';
        addElementToPageFrom(ArrayOfTasks);
        addDataToLocalStorageFrom(ArrayOfTasks);
        showDelAllButton();
    }
}

function addElementToPageFrom(ArrayOfTasks) {
    tasksDiv.innerHTML = '';
    ArrayOfTasks.forEach(function (e) {
        let divTask = document.createElement('div');
        divTask.className = 'task';
        divTask.setAttribute('data-id', e.id);
        divTask.appendChild(document.createTextNode(e.title));
        // create del button
        let span = document.createElement('span');
        span.className = 'del';
        span.appendChild(document.createTextNode('x'));
        // check status to add class
        if(e.completed) {
            divTask.className = 'done task';
        }
        // add button to div
        divTask.appendChild(span);
        // append div to tasks div
        tasksDiv.appendChild(divTask);
    })
}
// add tasks to local storage

function addDataToLocalStorageFrom(ArrayOfTasks) {
    window.localStorage.setItem('tasks', JSON.stringify(ArrayOfTasks));
}

// delete task with id 
function deleteTaskWithId(taskId) {
    ArrayOfTasks = ArrayOfTasks.filter(function (e) {
        return e.id != taskId;
    });
    addDataToLocalStorageFrom(ArrayOfTasks);
}

// update status task
function upDateStatusTask(taskId) {
    ArrayOfTasks.forEach(function(e) {
        if(e.id == taskId) {
            e.completed == false ? e.completed = true : e.completed = false;
        }
    });
    addDataToLocalStorageFrom(ArrayOfTasks);
}
// del all button

delAll.onclick = function () {
    tasksDiv.innerHTML = '';
    window.localStorage.removeItem('tasks');
    ArrayOfTasks = [];
}
function showDelAllButton() {
    if (tasksDiv.children.length > 0) {
        delAll.style.cssText = 'display: block';
    } else {
        delAll.style.cssText = 'display: none';
    }
}

showDelAllButton();

document.addEventListener('click', function (e) {
    if(e.target.classList.contains('del-all')) {
        e.target.style.cssText = 'display: none';
    }
})

// random background color on fill div on load
let colorNums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'F'];
let index = Math.floor(Math.random() * colorNums.length);
let myColorCode = [];
let myFillDiv = document.querySelector('.fill');

for(let i = 0; i < colorNums.length; i++) {
    myColorCode.push(colorNums[Math.floor(Math.random() * colorNums.length)]);
}

let myColor = `#${myColorCode.slice(0, 6).join("")}`;

window.onload = function () {
    myFillDiv.style.backgroundColor = myColor;
}

// make done tasks on last
tasksDiv.addEventListener('click', function (e) {
    if (e.target.classList.contains('done')) {
        getDoneTaskInLast(e.target.getAttribute('data-id'));
    }
    if (!e.target.classList.contains('done')) {
        getTaskHasntDoneOnTop(e.target.getAttribute('data-id'));
    }
})

function getDoneTaskInLast(taskId) {
    lastElement = ArrayOfTasks.filter(function (e) {
        return e.id == taskId;
    });
    ArrayOfTasks = ArrayOfTasks.filter(function (e) {
        return e.id != taskId;
    });
    ArrayOfTasks.push(lastElement);
    ArrayOfTasks = ArrayOfTasks.flat(1);
    addDataToLocalStorageFrom(ArrayOfTasks);
    addElementToPageFrom(ArrayOfTasks);
}

function getTaskHasntDoneOnTop(taskId) {
    clicledElement = ArrayOfTasks.filter(function (e) {
        return e.id == taskId;
    });
    ArrayOfTasks = ArrayOfTasks.filter(function (e) {
        return e.id != taskId;
    });
    ArrayOfTasks.unshift(clicledElement);
    ArrayOfTasks = ArrayOfTasks.flat(1);
    addDataToLocalStorageFrom(ArrayOfTasks);
    addElementToPageFrom(ArrayOfTasks);
};

// Stop loader


let loader = document.querySelector('.loader');
window.addEventListener('load', () => {
    setTimeout(() => {
        loader.classList.add('loader-hidden');
        loader.addEventListener('transitionend', () => {
            loader.remove();
        })
    }, 1500)
})
