newGame();
let xIsNext = true;
let stepX = [];
let stepO = [];
function newGame() {
  const bodi = document.querySelector(".body");
  const wraper = document.createElement("div");
  bodi.append(wraper);
  wraper.classList.add("wraper");
  createElements(wraper);
  eventListener();
}
function createElements(wraper) {
  const arrField = Array(9).fill(null);

  arrField.forEach((element, index) => {
    const cell = document.createElement("div");
    cell.setAttribute("data-n", index);
    cell.classList.add("cell");
    wraper.append(cell);
  });
  // console.log(arrField);
}

function clickCell(e) {
  const cell = e.target;
  const index = cell.getAttribute("data-n");
  checkWin(index, cell);
  gameMoves(cell);
  checkDraw()
}

function eventListener() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.addEventListener("click", clickCell);
  });
  
}

function gameMoves(cell) {
  
  // console.log(xIsNext);
  toggle();
  function toggle() {
    if (cell.textContent !== "") {
      return;
    }
    if (xIsNext) {
      cell.textContent = "X";
      xIsNext = false;
    } else {
      cell.textContent = "O";
      xIsNext = true;
    }
  }
}

function checkWin(indexStep, cell) {
  const wim = ["012", "345", "678", "036", "147", "258", "048", "246"];
  if (cell.textContent !== "") {
    return;
  }
  // console.log(indexStep);
  if (xIsNext) {
    stepX.push(indexStep);
    console.log(stepX);
    checkWinCount(stepX);
  } else {
    stepO.push(indexStep);
    console.log(stepO);
    checkWinCount(stepO);
  }

  function checkWinCount(ArrStep) {
    if (ArrStep.length >= 3) {
      for (let i = 0; i < wim.length; i++) {
        const winPattern = wim[i];
        let count = 0;
        winPattern.split("").forEach((char) => {
          if (ArrStep.includes(char)) {
            count++;
          }
          if (count === 3) {
            showVictory(xIsNext);
          }
        });
      }
    }
  }
}

function showVictory(xIsNext) {
  console.log("Победил " + (xIsNext ? "X" : "O"));
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.removeEventListener("click", clickCell);
  });
  const wraper = document.querySelector(".wraper");
  // wraper.style.opacity = "0.5";
  const popUp = document.createElement("div");
  wraper.append(popUp);
  popUp.classList.add("popUp");
  const notification = document.createElement("div");
  notification.classList.add("notification");
  popUp.append(notification);
  const victory = document.createElement("p");
  if (xIsNext === "null") {
    victory.textContent = "Ничья";
  } else {
    victory.textContent = "Победил " + (xIsNext ? "X" : "O");
  }
  notification.append(victory);
  const button = document.createElement("button");
  notification.append(button);
  button.classList.add("button");
  button.textContent = "Новая игра";
  button.addEventListener("click", restart);
}

function checkDraw() {
  const cells = document.querySelectorAll(".cell");
  let count = 0;
  cells.forEach((cell) => {
    if (cell.textContent !== "") {
      count++;
    }
  })
  if (count === 9) {
    showVictory("null");
  }
}

function restart() {
  xIsNext = true;
  stepX = [];
  stepO = [];
  const wraper = document.querySelector(".wraper");
  wraper.remove();
  newGame();
}
