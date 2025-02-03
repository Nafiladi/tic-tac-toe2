// logger.js
const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'app.log' })
  ],
});

module.exports = logger;
const logger = require('./logger');

// Logging an info message
logger.info('Server has started.');

// Logging an error
logger.error('Database connection failed.');
window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`Page Load Time: ${pageLoadTime} ms`);
  });
  const img = new Image();
  img.onload = function() {
    console.log('Image loaded successfully.');
  };
  img.onerror = function() {
    console.error('Failed to load image.');
  };
  img.src = 'path/to/image.jpg';
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
  
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
  socket.on('makeMove', (data) => {
    logger.info(`User ${socket.username} made a move in game ${socket.gameID}`);
    // ... existing code ...
  });
    