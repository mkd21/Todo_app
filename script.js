// console.log("JS is Connected...");

let parentoftasks = document.getElementById("taskParent");

function addTodo(todo_data)
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
    task_control_area.classList.add("row" ,"task_control_area", "d-flex" , "align-items-center" , "justify-content-center");
    task_number.classList.add("task_number");
    actual_task.classList.add("actual_task");
    status_task.classList.add("status_task");
    action_task.classList.add("action_task" ,"d-flex" , "justify-content-start");
    deleteBtn.classList.add("btn" , "btn-danger");
    finishedBtn.classList.add("btn" , "btn-success");
        

        // ADDING THE ACTUAL CONTENT 

    task_number.textContent = "1";
    actual_task.textContent = todo_data;     // sets the to do text after putting information 
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

    parentoftasks.appendChild(rowDiv);
}