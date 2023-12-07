"use scrict";

let toDoData = [];
const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const todolist = document.querySelector(".todo-list");
const todocompleted = document.querySelector(".todo-completed");

const clearElements = () => {
  headerInput.value = "";
  todolist.innerHTML = "";
  todocompleted.innerHTML = "";
};

const deleteItemToDo = (e) => {
  clearElements();
  const li = e.target.closest("li");
  const text = li.querySelector(".text-todo").innerText;
  const newtoDoData = [];
  toDoData.forEach((item) => {
    if (item.text !== text) {
      newtoDoData.push(item);
    }
  });
  toDoData = newtoDoData;
  creatListTask(toDoData);
};

const deleteEvent = (li) => {
  const deleteButton = li.querySelector(".todo-remove");
  deleteButton.addEventListener("click", deleteItemToDo);
};

const creatComplite = (li, item) => {
  const buttonComplite = li.querySelector(".todo-complete");
  buttonComplite.addEventListener("click", () => {
    item.completed = !item.completed;
    creatListTask(toDoData);
  });
};

const loadListTasks = (li, item) => {
  if (item.completed) {
    todocompleted.append(li);
  } else {
    todolist.append(li);
  }
  creatComplite(li, item);
  deleteEvent(li);
};

const creatListTask = (toDoData) => {
  clearElements();
  toDoData.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.innerHTML = `
      <span class="text-todo">${item.text}</span> 
      <div class="todo-buttons">
        <button class="todo-remove"></button>
        <button class="todo-complete"></button>
      </div>`;
    loadListTasks(li, item);
  });
  localStorage.setItem("tasks", JSON.stringify(toDoData));
};

const addNewToDo = (input) => {
  const newToDo = {
    text: input,
    completed: false,
  };
  return newToDo;
};

const addEventTask = (input) => {
  const newToDo = addNewToDo(input);
  toDoData.push(newToDo);
  localStorage.setItem("tasks", JSON.stringify(toDoData));
  creatListTask(toDoData);
};

const eventSubmit = (e) => {
  e.preventDefault();
  const input = headerInput.value;
  if (input !== "") {
    addEventTask(input);
  } else {
    alert("Добавьте текст задачи");
  }
};

const addEventSubmit = () => {
  todoControl.addEventListener("submit", eventSubmit);
};

const loadDataTasks = () => {
  const data = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
  if (data.length) {
    toDoData = data;
    creatListTask(toDoData);
  }
};

const init = () => {
  loadDataTasks();
  addEventSubmit();
};

init();
