// class Board {
//     constructor(grid)

// }
let gameData = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

// Game variable
let player = 1;
let cells = document.querySelectorAll("[data-cell]");
let gameOver = false;

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    placeMarker(index);
  });
});

function placeMarker(ind) {
  let col = ind % 3;
  let row = (ind - col) / 3;
  // Checks if current cell is empty
  if (gameData[row][col] === 0 && gameOver === false) {
    gameData[row][col] = player;
    //change player
    player *= -1;
    //Update screen with marker
    drawMarkers();
    // check if anyone has won
    checkWin();
  }
}

function drawMarkers() {
  // Iterate over rows
  for (let row = 0; row < 3; row++) {
    // Iterate over columns
    for (let col = 0; col < 3; col++) {
      // Check if player 1's marker
      if (gameData[row][col] === 1) {
        cells[row * 3 + col].classList.add("x");
      } else if (gameData[row][col] === -1) {
        cells[row * 3 + col].classList.add("circle");
      } else if (gameData[row][col] === 0) {
        cells[row * 3 + col].classList.remove("x");
        cells[row * 3 + col].classList.remove("circle");
      }
    }
  }
}

function checkWin() {
  // check rows and columns
  for (let i = 0; i < 3; i++) {
    let rowSum = gameData[i][0] + gameData[i][1] + gameData[i][2];
    let rowCol = gameData[0][i] + gameData[1][i] + gameData[2][i];
    if (rowSum === 3 || rowCol === 3) {
      endGame(1);
      return;
    } else if (rowSum === -3 || rowCol === -3) {
      endGame(2);
      return;
    }
  }
  // check diagonals
  let leftDiagSum = gameData[0][0] + gameData[1][1] + gameData[2][2];
  let rightDiagSum = gameData[0][2] + gameData[1][1] + gameData[2][0];
  if (leftDiagSum === 3 || rightDiagSum === 3) {
    endGame(1);
    return;
  } else if (leftDiagSum === -3 || rightDiagSum === -3) {
    endGame(2);
    return;
  }

  // check for tie
  if (
    gameData[0].indexOf(0) === -1 &&
    gameData[1].indexOf(0) === -1 &&
    gameData[2].indexOf(0) === -1
  ) {
    // if no spaces === 0 on any row, will return -1
    endGame(0);
  }
}

function endGame(winner) {
  //Trigger game ove
  gameOver = true;
  let winningMessage = document.querySelector("[data-winning-modal-text]");

  // check if tie
  if (winner === 0) {
    winningMessage.textContent = "Tie";
    showWinner();
    restartGame();
  } else {
    winningMessage.textContent = `Player ${winner} wins!`;
    showWinner();
    restartGame();
  }
}

function showWinner() {
  let modal = document.querySelector(".winning-modal");
  modal.classList.add("show");
}
function removeModal() {
  let modal = document.querySelector(".winning-modal");
  modal.classList.remove("show");
}
function restartGame() {
  let restart = document.querySelector("#restart");
  restart.addEventListener("click", () => {
    removeModal();
    gameData = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    player = 1;
    gameOver = false;
    drawMarkers();
  });
}
