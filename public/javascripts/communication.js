var socket;

$(document).ready(function() {
  socket = io.connect('http://localhost');

  socket.on('connected', function(data) {
    socket.emit('request-message', 'echo-successful'); // Provoke test message
  });

  // Test message
  socket.on('request-message', function(data) {
    console.log(data);
  });
});

