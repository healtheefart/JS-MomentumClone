const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList"),
  finished = document.querySelector(".js-finList");

const Todos_LS = "toDos";
const Fintodos_LS = "finToDos";
let toDos = [];
let finToDos = [];

function saveToDos() {
  localStorage.setItem("PENDING", JSON.stringify(toDos));
}
function saveFinToDos() {
  localStorage.setItem("FINISHED", JSON.stringify(finToDos));
}

function deleteToDo(event) {
  console.dir(event.target);
  console.log(event.target.parentNode);
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo) {
    return parseInt(toDo.id, 10) !== parseInt(li.id, 10);
  });
  toDos = cleanToDos;
  saveToDos();
}
function deleteFinToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  finished.removeChild(li);
  const cleanFinToDos = finToDos.filter(function(finToDo) {
    return parseInt(finToDo.id, 10) !== parseInt(li.id, 10);
  });
  finToDos = cleanFinToDos;
  saveFinToDos();
}

function gotoFin(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const span = li.querySelector("span");
  const text = span.innerText;
  paintFinToDo(text, li.id);
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo) {
    return parseInt(toDo.id, 10) !== parseInt(li.id, 10);
  });
  toDos = cleanToDos;
  saveToDos();
}

function gotoPending(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const span = li.querySelector("span");
  const text = span.innerText;
  finished.removeChild(li);
  const cleanFinToDos = finToDos.filter(function(finToDo) {
    return parseInt(finToDo.id, 10) !== parseInt(li.id, 10);
  });
  finToDos = cleanFinToDos;
  saveFinToDos();
  paintToDo(text, li.id);
}

function paintFinToDo(text, id) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  delBtn.innerText = "✖";
  delBtn.addEventListener("click", deleteFinToDo);
  const checkBtn = document.createElement("button");
  checkBtn.innerText = "↩";
  checkBtn.addEventListener("click", gotoPending);
  const span = document.createElement("span");
  li.appendChild(span);
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(checkBtn);
  li.id = id;
  finished.appendChild(li);
  const finToDoObj = {
    text: text,
    id: id
  };
  finToDos.push(finToDoObj);
  saveFinToDos();
}

function paintToDo(text, id = Math.floor(Math.random() * 2000000)) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  delBtn.innerText = "✖";
  delBtn.addEventListener("click", deleteToDo);
  const checkBtn = document.createElement("button");
  checkBtn.innerText = "✔";
  checkBtn.addEventListener("click", gotoFin);
  const span = document.createElement("span");
  span.innerText = text + " ";
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(checkBtn);
  li.id = id;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: id
  };
  console.log(toDoObj);
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem("PENDING");
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo.text, toDo.id);
    });
  }
}
function loadedFinToDos() {
  const loadedFinToDos = localStorage.getItem("FINISHED");
  if (loadedFinToDos !== null) {
    const parsedFinToDos = JSON.parse(loadedFinToDos);
    parsedFinToDos.forEach(function(finToDo) {
      paintFinToDo(finToDo.text, finToDo.id);
    });
  }
}

function init() {
  loadToDos();
  loadedFinToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
