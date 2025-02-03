// public/js/gameBoard.js
const socket = io();
let timer;
let timeLeft = 30;

socket.on('startGame', (board) => {
  // Initialize game board
  startTimer();
});

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById('time').textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      alert('Time up! You lost your turn.');
      socket.emit('timeout');
    }
  }, 1000);
}

// Handle cell click
document.querySelectorAll('.cell').forEach(cell => {
  cell.addEventListener('click', () => {
    const index = cell.getAttribute('data-index');
    socket.emit('makeMove', index);
  });
});

// Update board on move
socket.on('updateBoard', (board) => {
  board.forEach((value, index) => {
    const cell = document.querySelector(`.cell[data-index='${index}']`);
    cell.textContent = value;
  });
  resetTimer();
});

function resetTimer() {
  clearInterval(timer);
  timeLeft = 30;
  startTimer();
}

// Handle game over
socket.on('gameOver', (result) => {
  clearInterval(timer);
  alert(result);
  // Update win/loss record
});
// Remove or comment out if already declared
// const socket = io();
