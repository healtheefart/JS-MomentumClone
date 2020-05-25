const body = document.querySelector("body");
const IMG_NUM = 5;

function paintIMG(num) {
  const image = new Image();
  image.src = `image/${num + 1}.jpg`;
  image.classList.add("bgImage");
  body.appendChild(image);
}

function genRandom() {
  const num = Math.floor(Math.random() * IMG_NUM);
  return num;
}
function init() {
  const randomNumber = genRandom();
  paintIMG(randomNumber);
}
init();
