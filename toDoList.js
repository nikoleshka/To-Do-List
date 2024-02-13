const form = document.getElementById("to-do-form");
const input = document.getElementById("item-input");
const taskList = document.getElementById("to-do-list");
const errorMsg = document.getElementById("errors");

let tasks = [];

const setError = (msg) => {
  errorMsg.innerText = msg;
  setTimeout(() => {
    errorMsg.innerText = "";
  }, 1000);
};

const addButtonEvents = () => {
  taskList.querySelectorAll("li.to-do-list-item").forEach((li) => {
    li.querySelector(".done-action").addEventListener("click", () => {
      li.querySelector(".item-title").classList.toggle("done");
    });

    li.querySelector(".remove-action").addEventListener("click", () => {
      const currentTask = li.querySelector(".item-title").textContent;
      const updatedTasks = tasks.filter((t) => currentTask !== t);
      tasks = updatedTasks;
      localStorage.setItem("all-task", JSON.stringify(updatedTasks));
      taskList.removeChild(li);
    });
  });
};

const addTaskToList = (task = "") => {
  taskList.innerHTML += `<li class="to-do-list-item">
                    <p class="item-title " >${task}</p>
                    <div class="to-do-actions">
                        <div class="done-action"><i class="fa-solid fa-check"></i></div>
                        <div class="remove-action"><i class="fa-solid fa-xmark"></i></div>
                    </div>
                </li> `;

  addButtonEvents();
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const newTask = input.value;

  if (newTask && tasks.includes(newTask)) {
    setError("This Task is duplicated");
    return;
  }
  if (!newTask) {
    setError("This field is required");
    return;
  }

  tasks.push(newTask);
  localStorage.setItem("all-task", JSON.stringify(tasks));
  addTaskToList(newTask);
  input.value = "";
});

const clearList = () => {
  tasks = [];
  taskList.innerHTML = "";
  localStorage.setItem("all-task", JSON.stringify([]));
};

document.addEventListener("DOMContentLoaded", () => {
  const oldTasks = localStorage.getItem("all-task")
    ? JSON.parse(localStorage.getItem("all-task"))
    : [];

  if (Array.isArray(oldTasks)) {
    tasks = oldTasks;
    oldTasks.forEach((task) => addTaskToList(task));
  }
});