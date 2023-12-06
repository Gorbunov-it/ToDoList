"use strict";

// Что необходимо реализовать (первые 2 пункта делаем по видео):
// Отмечать выполненные дела, выполненные дела должны перемещаться в блок с выполненными делами
// Поле ввода после добавления дела должно очищаться
// Пустые дела добавляться не должны
// Удаление дел на кнопку КОРЗИНА
// Сохранять данные о делах в localStorage (советую в виде массива)
// Дела из localStorage подгружаться должны автоматически при загрузки странице
// внимание чтобы сохранить массив в localStorage необходимо его конвертировать в json формат (JSON.stringify)
// внимание из localStorage мы всегда получаем json строку и её необходимо конвертировать обратно в формат javascript (JSON.parse)
//  Проверить, чтобы все работало и не было ошибок в консоли (Учесть вариант отсутствия объекта в localstorage пользователя при первой загрузке страницы)
//  Сохранить проект в отдельном репозитории на GitHub

const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const todolist = document.querySelector(".todo-list");
const todocompleted = document.querySelector(".todo-completed");

const toDoData = [];

const render = () => {
  todolist.innerHTML = "";
  todocompleted.innerHTML = "";

  toDoData.forEach((item) => {
    debugger;
    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.innerHTML = `
      <span class="text-todo"> ${item.text} </span> 
      <div class="todo-buttons">
        <button class="todo-remove"></button>
        <button class="todo-complete"></button>
      </div>`;

    if (item.completed) {
      todocompleted.append(li);
    } else {
      todolist.append(li);
    }

    li.querySelector(".todo-complete").addEventListener("click", () => {
      item.completed = !item.completed;
      render();
    });
  });
};

todoControl.addEventListener("submit", (event) => {
  event.preventDefault();

  const newToDo = {
    text: headerInput.value,
    completed: false,
  };

  toDoData.push(newToDo);
  headerInput.value = "";

  render();
});
