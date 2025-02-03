// public/js/main.js
const socket = io();

// Registration
document.getElementById('register-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('reg-username').value;
  const password = document.getElementById('reg-password').value;
  socket.emit('register', { username, password });
});

// Login
document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;
  socket.emit('login', { username, password });
});

// Handle server responses
socket.on('registrationSuccess', (msg) => {
  alert(msg);
  // Redirect to game lobby or dashboard
});

socket.on('loginSuccess', (msg) => {
  alert(msg);
  // Redirect to game lobby or dashboard
});

socket.on('authError', (msg) => {
  alert(msg);
});
// After successful login
socket.emit('userLoggedIn', username);
