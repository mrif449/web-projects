document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.querySelector("#task");
    const addTaskButton = document.querySelector("#add-task");
    const taskList = document.querySelector("#task-list");
    
    addTaskButton.addEventListener("click", function(event) {
      event.preventDefault();
      
      // create new task element
      const task = document.createElement("li");
      task.innerHTML = taskInput.value;
      
      // add task to task list
      taskList.appendChild(task);
      
      // clear input field
      taskInput.value = "";
    });
  });

  // Get references to DOM elements
const taskInput = document.getElementById("task");
const taskList = document.getElementById("task-list");
const addTaskBtn = document.getElementById("add-task-btn");

function addTask() {
  // Get the task text from the input
  const taskText = taskInput.value.trim(); 

  // Check if the task input is empty
  if (!taskText) {
    taskInput.classList.add('error');
    return;
  }else{
     taskInput.classList.remove('error');
  }
  // Create a new list item
  const task = document.createElement("li");
  task.classList.add("task");
  task.innerHTML = `<span>${taskText}</span>
  <button class="delete-btn">Delete</button>`;

  // Append the new task to the task list
  taskList.appendChild(task);

  // Clear the input
  taskInput.value = "";
}

  

// Function to delete a task
function deleteTask(e) {
  if (e.target.classList.contains("delete-btn")) {
    e.target.parentElement.remove();
  }
}

// Add event listeners
addTaskBtn.addEventListener("click", addTask);
taskList.addEventListener("click", deleteTask);
taskInput.addEventListener('keydown',function(e){
    if (e.keyCode === 13) {
        addTask();
    }
});