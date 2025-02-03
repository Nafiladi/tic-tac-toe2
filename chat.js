// public/js/chat.js

// Ensure socket connection is established
const socket = io();

// Elements
const chatWindow = document.getElementById('chat-window');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');

// Send message to server
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = chatInput.value.trim();
  if (message) {
    socket.emit('chatMessage', message);
    chatInput.value = '';
    chatInput.focus();
  }
});

// Receive message from server
socket.on('chatMessage', (data) => {
  displayMessage(data);
});

// Display message in chat window
function displayMessage(data) {
  const { username, message, timestamp } = data;
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');

  messageElement.innerHTML = `
    <span class="username">${username}</span>
    <span class="timestamp">${timestamp}</span>
    <div class="text">${message}</div>
  `;

  chatWindow.appendChild(messageElement);

  // Scroll to the bottom
  chatWindow.scrollTop = chatWindow.scrollHeight;
}
function displayMessage(data) {
    const { username, message, timestamp } = data;
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
  
    if (username === 'System') {
      messageElement.classList.add('system-message');
    }
  
    messageElement.innerHTML = `
      <span class="username">${username}</span>
      <span class="timestamp">${timestamp}</span>
      <div class="text">${message}</div>
    `;
  
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }
  // Include sound file in HTML
// <audio id="message-sound" src="sounds/message.mp3"></audio>

const messageSound = document.getElementById('message-sound');

function displayMessage(data) {
  // ... existing code ...

  // Play sound if message is not from the current user
  if (data.username !== socket.username) {
    messageSound.play();
  }
}
chatInput.addEventListener('input', () => {
    socket.emit('typing');
  });
  
  socket.on('typing', (username) => {
    // Display typing indicator
  });
  