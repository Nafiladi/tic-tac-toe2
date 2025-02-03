// public/js/game.js
const socket = io();

document.getElementById('create-game').addEventListener('click', () => {
  socket.emit('createGame');
});

document.getElementById('join-game-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const gameID = document.getElementById('game-id-input').value;
  socket.emit('joinGame', gameID);
});

socket.on('gameCreated', (gameID) => {
  alert(`Game created! Your Game ID is: ${gameID}`);
  // Redirect to game board
});

socet.on('gameJoined', (gameID) => {
  alert(`Joined Game: ${gameID}`);
  // Redirect to game board
});

socket.on('gameError', (msg) => {
  alert(msg);
});

function updateWinRate(wins, losses) {
    const totalGames = wins + losses;
    const winRate = totalGames > 0 ? (wins / totalGames) * 100 : 0;
    document.getElementById('win-progress').style.width = `${winRate}%`;
    document.getElementById('win-percentage').textContent = `${winRate.toFixed(2)}%`;
  }
  
  // Assume that win/loss data is sent from the server upon login
  socket.on('loginSuccess', (data) => {
    updateWinRate(data.wins, data.losses);
  });
  
