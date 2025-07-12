interface Task {
    id: string,
    task: string
}


let tasks: string[] = [
    "Eat",
    "Sleep",
    "Watch movie",
    "Study"
];

let taskList: Task[] = [];
tasks.forEach(task=>{
    const newTask: Task={
        id: String(taskList.length),
        task: task
    }
    taskList.push(newTask);
});

const container = document.querySelector('.container') as HTMLElement;
const addTaskBtn = document.querySelector('button') as HTMLInputElement;
const input = document.querySelector('input') as HTMLInputElement;
const form = document.querySelector('form') as HTMLFormElement;
const addTask = ()=>{
    const task: string = input.value;
    const newTask: Task={
        id: String(taskList.length),
        task: task
    };    
    taskList.push(newTask);
    displayTasks();
    input.value = '';
}

addTaskBtn.addEventListener("click", ()=>{
    addTask();
});

form.addEventListener("keypress", (event)=>{
    const key = event.key;
    if (key==="Enter"){
        event.preventDefault();

        addTask();
    }
})


const displayTasks = ()=>{
    while (container.hasChildNodes()){
        const firstChildNode = container.firstChild!;

        container.removeChild(firstChildNode) as HTMLInputElement;
    }

    taskList.forEach(task=>{
        let taskCard = document.createElement("li");
        const removeBtn = document.createElement("button");
        const editBtn = document.createElement("button");
        const taskContainer = document.createElement("div");

        taskCard.textContent = task.task;
        taskCard.classList.add("task");
        taskContainer.appendChild(taskCard);
        taskContainer.appendChild(editBtn);
        taskContainer.classList.add("task-container");

        taskContainer.appendChild(removeBtn);

        container.appendChild(taskContainer);
        removeBtn.textContent = "remove";
        removeBtn.classList.add('remove');
        editBtn.textContent = "edit";
        
        const currID = task.id;


        removeBtn.addEventListener("click", ()=>{
            taskList = taskList.filter(task=>task.id !== currID);
            displayTasks();
        });

        editBtn.addEventListener("click", ()=>{
            const newInput: HTMLInputElement = document.createElement('input');
            
            const newBtn: HTMLButtonElement = document.createElement('button');
            newBtn.textContent = 'click here to update your task';
            const DIV = document.createElement('div');
            DIV.appendChild(newInput);
            DIV.appendChild(newBtn);
            DIV.classList.add('new-div');
            taskContainer.appendChild(DIV);
            newInput.focus();
            newBtn.addEventListener("click", ()=>{
                taskCard.textContent = newInput.value;
                taskContainer.removeChild(DIV);
            })

            // taskContainer.style.backgroundColor = red;
            
        })
        
    })
}

displayTasks();