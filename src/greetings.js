const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings"),
  showToDo = document.querySelector(".js-toDoForm");
const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function askForName(event) {
  form.classList.add(SHOWING_CN);

  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  showToDo.classList.add(SHOWING_CN);
  greeting.innerText = `안녕하세요 ${text}님!`;
}
function saveName(text) {
  localStorage.setItem(USER_LS, text);
}
function handleSubmit(event) {
  event.preventDefault();
  paintGreeting(input.value);
  saveName(input.value);
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}
function init() {
  loadName();
}
init();
