// console.log("JS is Connected...");

let todo_div = document.getElementById("todo_div");

let saveButton = document.getElementById("save_btn");
let input_bar = document.getElementById("input_bar");

let getPendingTodo = document.getElementById("get_todos");


let countArr = [];

input_bar.addEventListener("keyup" , function toggleSaveBtn(){

    let input_data = input_bar.value;
    if(input_data.length == 0)
    {
        if(saveButton.classList.contains("disabled"))
        {
            return;
        }
        saveButton.classList.add("disabled");
    }
    else
    {
        saveButton.classList.remove("disabled");
    }
});

saveButton.addEventListener("click" , function exec(){
    let input_Data = input_bar.value;
    
    if(input_Data.length == 0)
    {
        return;
    }

    let todoElements = {task : input_Data , status : "In Progress" , btnText : "Finished"};   // creating an object for each task

    countArr.push(todoElements);                 // pushing an object inside an array
    addTodo(todoElements , countArr.length);

    input_bar.value = "";

    saveButton.classList.add("disabled");
});

function getPendingTodos(event)
{
    countArr = countArr.filter( (todos) => todos.status != "Finished");

    todo_div.innerHTML = "";
    countArr.forEach( function iterator(element , index){
        addTodo(element , index +  1);
    });
}

function deleteTodo(event)
{
    // console.log(event.target.parentElement.parentElement.parentElement);
    // event.target.parentElement.parentElement.parentElement.remove();

    let btnTodelete = event.target;

    let specificBtnIndex = Number(btnTodelete.getAttribute("todo_index"));

    // console.log(typeof specificBtnIndex);  // default return type is String so we changed it to Number

    countArr.splice(specificBtnIndex - 1 , 1);     

    todo_div.innerHTML = "";
    countArr.forEach( function iterator(element , index){
        addTodo(element , index + 1);
    });
}

function finishedTodo(event)
{
    let exactBtn = event.target;
    let exactBtnNumber = Number(exactBtn.getAttribute("todo_index"));

    if(countArr[exactBtnNumber - 1].status == "Finished")
    {
        countArr[exactBtnNumber - 1].status = "In Progress";
        countArr[exactBtnNumber - 1].btnText = "Finished";
    }
    else 
    {
        countArr[exactBtnNumber - 1].status = "Finished";
        countArr[exactBtnNumber - 1].btnText = "Undo";
    }

    // sorting the todos according to their status 
    countArr.sort( (a , b) => {
        if(a.status == "Finished")
        {
            return 1;
        }
        else 
        {
            return -1;
        }
    });


    // re-render the html 
    todo_div.innerHTML = "";
    countArr.forEach( function (element , value) {
        addTodo(element , value + 1);
    })
}

function editTodo(event)
{
    let edit_btn = event.target;
    let indexForAll = Number(edit_btn.getAttribute("todo_index"));

    let targetDiv = document.querySelector( `div[todo_index = "${indexForAll}"]` );
    let targetInput = document.querySelector( `input[todo_index = "${indexForAll}"]` );

    targetDiv.style.display = "none";
    targetInput.type = "text";


    // giving a pre text inside the input field 
    targetInput.value = targetDiv.textContent;
}

function afterEditingTodo(event)
{
    let targetInput = event.target;     // input tag mil jyega yaha pr

    let index = Number(targetInput.getAttribute("todo_index"));

    let divTarget = document.querySelector(`div[todo_index = "${index}" ]`);

    if(event.key == "Enter")
    {
        divTarget.textContent = targetInput.value;
        divTarget.style.display = "block";

        targetInput.value = "";
        targetInput.type = "hidden";
    }
}


function addTodo(todoElements , count)
{
    let rowDiv = document.createElement("div");
    let task_control_area = document.createElement("div");

    let task_number = document.createElement("div");
    let actual_task = document.createElement("div");
    let status_task = document.createElement("div");

    let action_task = document.createElement("div");
    let deleteBtn = document.createElement("button");
    let finishedBtn = document.createElement("button");
    let editBtn = document.createElement("button");
    let hiddenInput = document.createElement("input");

    let hr = document.createElement("hr");         // horizontal rule ie line seperating each todo



            // ADDING CLASSES      for styling an all...

    rowDiv.classList.add("row");
    task_control_area.classList.add("row" ,"task_control_area", "d-flex");
    task_number.classList.add("task_number");
    actual_task.classList.add("actual_task");
    status_task.classList.add("status_task");
    action_task.classList.add("action_task" ,"d-flex" , "justify-content-start");
    deleteBtn.classList.add("btn" , "btn-danger" , "deleteTodoBtn");
    finishedBtn.classList.add("btn" , "btn-success");
    editBtn.classList.add("btn" , "btn-warning" , "editBtn");

    hiddenInput.classList.add("form-control" , "actual_task");


    // SETTING ATTRIBUTES TO BUTTON 
    deleteBtn.setAttribute("todo_index" , count);
    deleteBtn.onclick = deleteTodo;
    

    // get pending task button

    getPendingTodo.onclick = getPendingTodos;

    // todo status change ke liye 
    finishedBtn.onclick = finishedTodo;
    finishedBtn.setAttribute("todo_index" , count);
    
    // edit button 
    editBtn.setAttribute("todo_index" , count);
    editBtn.onclick = editTodo;

    // input tag
    hiddenInput.setAttribute("todo_index" , count);
    actual_task.setAttribute("todo_index" , count);

    hiddenInput.addEventListener("keypress" , afterEditingTodo);

        // ADDING THE ACTUAL CONTENT 

    task_number.textContent = count;         // maintains the serial number
    actual_task.textContent = todoElements.task;            // sets the to do text after putting information 
    status_task.textContent = todoElements.status;
    deleteBtn.textContent = "DELETE";
    finishedBtn.textContent = todoElements.btnText;
    editBtn.textContent = "Edit";

    action_task.appendChild(deleteBtn);
    action_task.appendChild(finishedBtn);
    action_task.appendChild(editBtn);

    task_control_area.appendChild(task_number);
    task_control_area.appendChild(actual_task);
    task_control_area.appendChild(hiddenInput);
    hiddenInput.setAttribute("type" , "hidden");

    task_control_area.appendChild(status_task);
    task_control_area.appendChild(action_task);

    rowDiv.appendChild(task_control_area);
    rowDiv.appendChild(hr);

    todo_div.appendChild(rowDiv);
}