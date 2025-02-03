// Handle user registration
socket.on('register', (data) => {
    const { username, password } = data;
    if (users[username]) {
      socket.emit('authError', 'Username already exists.');
    } else {
      users[username] = { password, wins: 0, losses: 0 };
      socket.emit('registrationSuccess', 'Registration successful!');
      // Persist user data to a JSON file
      fs.writeFileSync('users.json', JSON.stringify(users));
    }
  });
  
  // Handle user login
  socket.on('login', (data) => {
    const { username, password } = data;
    if (users[username] && users[username].password === password) {
      socket.emit('loginSuccess', 'Login successful!');
      // Proceed to the game lobby
    } else {
      socket.emit('authError', 'Invalid credentials.');
    }
  });

  // Load existing users from JSON file at server start
if (fs.existsSync('users.json')) {
    const data = fs.readFileSync('users.json');
    users = JSON.parse(data);
  }
  
  let games = {}; // Store active games

// Create a new game
socket.on('createGame', () => {
  const gameID = Math.random().toString(36).substr(2, 9);
  games[gameID] = { players: [socket.id], board: Array(9).fill(null) };
  socket.join(gameID);
  socket.emit('gameCreated', gameID);
});

// Join an existing game
socket.on('joinGame', (gameID) => {
  if (games[gameID]) {
    if (games[gameID].players.length < 2) {
      games[gameID].players.push(socket.id);
      socket.join(gameID);
      socket.emit('gameJoined', gameID);
      // Start the game for both players
      io.to(gameID).emit('startGame', games[gameID].board);
    } else {
      socket.emit('gameError', 'Game is full.');
    }
  } else {
    socket.emit('gameError', 'Game not found.');
  }
});

// Send win/loss data on login
socket.emit('loginSuccess', {
    message: 'Login successful!',
    wins: users[username].wins,
    losses: users[username].losses
  });
  
  // Require necessary modules
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
// ... existing code ...

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Handle user joining game
  socket.on('joinGame', (gameID) => {
    // ... existing logic ...
    socket.join(gameID);
    // Store the gameID in the socket for later use
    socket.gameID = gameID;

    // Notify other player
    const data = {
      username: 'System',
      message: `${socket.username} has joined the game.`,
      timestamp: new Date().toLocaleTimeString()
    };
    io.to(gameID).emit('chatMessage', data);
  });

  // Handle chat message
  socket.on('chatMessage', (message) => {
    const gameID = socket.gameID;
    if (gameID) {
      const data = {
        username: socket.username,
        message: message,
        timestamp: new Date().toLocaleTimeString()
      };
      io.to(gameID).emit('chatMessage', data);
    }
  });

  // Handle user disconnect
  socket.on('disconnect', () => {
    const gameID = socket.gameID;
    if (gameID) {
      const data = {
        username: 'System',
        message: `${socket.username} has left the game.`,
        timestamp: new Date().toLocaleTimeString()
      };
      io.to(gameID).emit('chatMessage', data);
    }
  });
});
socket.on('userLoggedIn', (username) => {
    socket.username = username;
  });
  
  let chatHistory = {}; // Key: gameID, Value: Array of messages

socket.on('chatMessage', (message) => {
  if (socket.gameID) {
    const data = {
      username: socket.username,
      message: message,
      timestamp: new Date().toLocaleTimeString()
    };
    // Save message to history
    if (!chatHistory[socket.gameID]) {
      chatHistory[socket.gameID] = [];
    }
    chatHistory[socket.gameID].push(data);

    io.to(socket.gameID).emit('chatMessage', data);
  }
});

socket.on('joinGame', (gameID) => {
  // ... existing code ...

  // Send chat history to the joining player
  if (chatHistory[gameID]) {
    chatHistory[gameID].forEach((message) => {
      socket.emit('chatMessage', message);
    });
  }
});
socket.on('typing', () => {
    socket.broadcast.to(socket.gameID).emit('typing', socket.username);
  });
// For New Relic
require('newrelic');

// For Datadog
const tracer = require('dd-trace').init();
  