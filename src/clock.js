const clockContainer = document.querySelector(".js-clock"),
  clockTitle = clockContainer.querySelector("h1");

function getTime() {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  clockTitle.innerText = `${hours < 10 ? `0${hours}` : `${hours}`}시 ${
    minutes < 10 ? `0${minutes}` : `${minutes}`
  }분`;
}

function init() {
  setInterval(getTime, 1000);
}

init();
