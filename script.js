// console.log("JS is Connected...");

let todo_data_new = document.getElementById("todo_data_new");

let saveButton = document.getElementById("save_btn");
let input_bar = document.getElementById("input_bar");

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

    countArr.push(input_Data);             // pushing in array to maintain the length of the index
    addTodo(input_Data , countArr.length);

    input_bar.value = "";

    saveButton.classList.add("disabled");
});


function deleteTodo(event)
{
    // console.log(event.target.parentElement.parentElement.parentElement);
    // event.target.parentElement.parentElement.parentElement.remove();

    let btnTodelete = event.target;

    let specificBtnIndex = Number(btnTodelete.getAttribute("todo_index"));

    countArr.splice(specificBtnIndex - 1 , 1);

    todo_data_new.innerHTML = "";
    countArr.forEach( function iterator(element , index){
        addTodo(element , index + 1);
    }); 
}

function addTodo(todo_data , count)
{
    let rowDiv = document.createElement("div");
    let task_control_area = document.createElement("div");

    let task_number = document.createElement("div");
    let actual_task = document.createElement("div");
    let status_task = document.createElement("div");

    let action_task = document.createElement("div");
    let deleteBtn = document.createElement("button");
    let finishedBtn = document.createElement("button");

    let hr = document.createElement("hr");



            // ADDING CLASSES 

    rowDiv.classList.add("row");
    task_control_area.classList.add("row" ,"task_control_area", "d-flex");
    task_number.classList.add("task_number");
    actual_task.classList.add("actual_task");
    status_task.classList.add("status_task");
    action_task.classList.add("action_task" ,"d-flex" , "justify-content-start");
    deleteBtn.classList.add("btn" , "btn-danger" , "deleteTodoBtn");
    finishedBtn.classList.add("btn" , "btn-success");
        

    deleteBtn.setAttribute("todo_index" , count);
    deleteBtn.onclick = deleteTodo;

        // ADDING THE ACTUAL CONTENT 

    task_number.textContent = count; // maintains the serial number
    actual_task.textContent = todo_data;            // sets the to do text after putting information 
    status_task.textContent = "In Progress";
    deleteBtn.textContent = "DELETE";
    finishedBtn.textContent = "FINISHED";

    action_task.appendChild(deleteBtn);
    action_task.appendChild(finishedBtn);


    task_control_area.appendChild(task_number);
    task_control_area.appendChild(actual_task);
    task_control_area.appendChild(status_task);
    task_control_area.appendChild(action_task);

    rowDiv.appendChild(task_control_area);
    rowDiv.appendChild(hr);

    todo_data_new.appendChild(rowDiv);
}

