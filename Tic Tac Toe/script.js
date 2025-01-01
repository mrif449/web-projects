const board = document.querySelector('.game-board');
const cells = document.querySelectorAll('.cell');
const xCounter = document.querySelector('.x-counter');
const oCounter = document.querySelector('.o-counter');
const restartButton = document.querySelector('.restart-button');
let currentPlayer = 'x';
let xWins = 0;
let oWins = 0;
let gameEnded = false;

const winningCombos = [
  // rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // diagonals
  [0, 4, 8],
  [2, 4, 6],
];

function checkWin() {
  for (let combo of winningCombos) {
    if (
      cells[combo[0]].textContent === currentPlayer.toUpperCase() &&
      cells[combo[1]].textContent === currentPlayer.toUpperCase() &&
      cells[combo[2]].textContent === currentPlayer.toUpperCase()
    ) {
      for (let i of combo) {
        cells[i].classList.add('highlight');
      }
      return true;
    }
  }
  return false;
}

function endGame() {
  gameEnded = true;
  board.classList.add('game-over');
  const message = document.createElement('div');
  message.classList.add('message');
  message.textContent = `${currentPlayer.toUpperCase()} Wins!`;
  board.appendChild(message);
  if (currentPlayer === 'x') {
    xWins++;
    xCounter.textContent = xWins;
  } else {
    oWins++;
    oCounter.textContent = oWins;
  }
}

function restartGame() {
  gameEnded = false;
  currentPlayer = 'x';
  board.classList.remove('game-over');
  const message = document.querySelector('.message');
  if (message) {
    message.remove();
  }
  cells.forEach((cell) => {
    cell.classList.remove('x', 'o', 'highlight');
    cell.textContent = '';
  });
}

cells.forEach((cell) => {
  cell.addEventListener('click', () => {
    if (gameEnded) {
      return;
    }

    if (!cell.textContent) {
      cell.classList.add(currentPlayer);
      cell.textContent = currentPlayer.toUpperCase();

      if (checkWin()) {
        endGame();
      } else {
        currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
      }
    }

    let isTie = true;
    cells.forEach((cell) => {
      if (!cell.textContent) {
        isTie = false;
      }
    });
    if (isTie) {
      gameEnded = true;
      board.classList.add('game-over');
      const message = document.createElement('div');
      message.classList.add('message');
      message.textContent = `It's a Tie!`;
      board.appendChild(message);
    }
  });
});

restartButton.addEventListener('click', () => {
  restartGame();
  xWins = 0;
  oWins = 0;
  xCounter.textContent = '0';
  oCounter.textContent = '0';
});
