let startButton = document.querySelector("button");
startButton.addEventListener("click", startGame);
let timer = 60;
let score = 0;
let happySound = new Audio("happy.wav");
let painfulSound = new Audio("pain.ogg");
let applauseSound = new Audio("aplauso.wav");
let mehSound = new Audio("meh lose.mp3");

function startGame() {
  startButton.disabled = true;
  let divs = document.getElementsByClassName("cardDiv");
  setIds(divs);
  tick(timer);
  camaleonGoesCrazy(divs);
  cactusAppear(divs);
}

function setIds(divs) {
  for (i = 0; i < divs.length; i++) {
    divs[i].setAttribute("id", i);
  }
}

function tick() {
  timer -= 1;
  document.querySelector("#timer").innerHTML = timer;
  if (timer != 0) {
    setTimeout(tick, 1000);
  } else {
    if (score > 20) {
      applauseSound.play();
    } else {
      mehSound.play();
    }
    document.querySelector("h1").innerHTML = "You got " + score + " points";
  }
}

function camaleonGoesCrazy(divs) {
  let camaleon = document.getElementById("camaleon");
  if (camaleon != null) {
    camaleon.parentNode.removeChild(camaleon);
  }
  if (timer != 0) {
    let number = Math.floor(Math.random() * divs.length);
    let camaleonDiv = document.getElementById(number);
    if (camaleonDiv.firstChild === null) {
      let image = document.createElement("img");
      image.setAttribute("src", "camaleon.JPG");
      image.setAttribute("id", "camaleon");
      image.setAttribute("onclick", "getPoint()");

      camaleonDiv.appendChild(image);
      setTimeout(camaleonGoesCrazy, 550, divs);
    } else {
      setTimeout(camaleonGoesCrazy, 1000, divs);
    }
  }
}

function getPoint() {
  happySound.play();
  let camaleon = document.getElementById("camaleon");
  camaleon.removeAttribute("onclick", "getPoint()");
  score += 1;
  document.querySelector("#score").innerHTML = score;
}

function cactusAppear(divs) {
  let cactus = document.getElementById("cactus");
  if (cactus != null) {
    cactus.parentNode.removeChild(cactus);
  }
  if (timer != 0) {
    let number = Math.floor(Math.random() * divs.length);
    let cactusDiv = document.getElementById(number);
    if (cactusDiv.firstChild === null) {
      let image = document.createElement("img");
      image.setAttribute("src", "cactus.JPG");
      image.setAttribute("id", "cactus");
      image.setAttribute("onclick", "getMinusPoint()");

      cactusDiv.appendChild(image);
      setTimeout(cactusAppear, 550, divs);
    } else {
      setTimeout(cactusAppear, 1000, divs);
    }
  }
}

function getMinusPoint() {
  painfulSound.play();
  let cactus = document.getElementById("cactus");
  cactus.removeAttribute("onclick", "getPoint()");
  score -= 1;
  document.querySelector("#score").innerHTML = score;
}
