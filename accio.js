const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

// Load tasks from local storage and add them to the list
const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
savedTasks.forEach((task) => addTask(task.text, task.completed));

// Event listener for adding a new task
addTaskButton.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    addTask(taskText, false);
    taskInput.value = "";
  }
});

function addTask(text, completed) {
  // Create task item and set text
  const taskItem = document.createElement("li");
  const taskText = document.createElement("span");

  taskText.textContent = text;
  taskItem.appendChild(taskText);

   // checkButton

   let checkButton = document.createElement("button");
   checkButton.textContent = "check";;
   // checkButton.classList.add('checkTask');
   taskItem.appendChild(checkButton)

  // Create buttons for editing and deleting
  const taskEdit = document.createElement("button");
  const taskDelete = document.createElement("button");
    taskDelete.className = 'delete';


  taskEdit.textContent = "Edit";
  taskDelete.textContent = "Delete";

  taskItem.appendChild(taskEdit);
  taskItem.appendChild(taskDelete);

 

  // Add logic for editing a task
  taskEdit.addEventListener("click", () => {
    const newText = prompt("Edit task:", text);
    if (newText !== null) {
      taskText.textContent = newText;
      saveTasks();
    }
  });

  // Add logic for deleting a task
  taskDelete.addEventListener("click", () => {
    taskItem.remove();
    saveTasks();
  });

  checkButton.addEventListener('click',function(){
    taskText.style.textDecoration = taskText.style.textDecoration === "line-through" ? "none"  : "line-through";
   });

  // Append task item to the list
     taskList.appendChild(taskItem);

  // Save updated tasks to local storage
  saveTasks();
}

function saveTasks() {
  const tasks = Array.from(taskList.children).map((task) => ({
    text: task.querySelector("span").textContent,
    completed: task.classList.contains("completed"),
  }));
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
