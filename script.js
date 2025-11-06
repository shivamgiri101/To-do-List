const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Load saved tasks from localStorage
window.onload = function () {
  const saved = JSON.parse(localStorage.getItem("tasks")) || [];
  saved.forEach((task) => createTask(task.text, task.done));
};

// Save tasks to localStorage
function saveTasks() {
  const allTasks = [];
  document.querySelectorAll("#taskList li").forEach((li) => {
    allTasks.push({
      text: li.querySelector("span").textContent,
      done: li.classList.contains("done"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(allTasks));
}

// Create and display a new task
function createTask(text, done = false) {
  const li = document.createElement("li");
  li.innerHTML = `
    <span>${text}</span>
    <button class="delete">&times;</button>
  `;
  if (done) li.classList.add("done");

  li.querySelector("span").addEventListener("click", () => {
    li.classList.toggle("done");
    saveTasks();
  });

  li.querySelector(".delete").addEventListener("click", () => {
    li.remove();
    saveTasks();
  });

  taskList.appendChild(li);
  saveTasks();
}

// Add task button
addBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (text) {
    createTask(text);
    input.value = "";
  }
});

// Add task on Enter key
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addBtn.click();
});