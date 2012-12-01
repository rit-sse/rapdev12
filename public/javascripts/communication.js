var socket;

$(document).ready(function() {
  socket = io.connect('http://129.21.207.136');

  socket.on('connected', function(data) {
    socket.emit('echo', 'echo-successful'); // Provoke test message
  });

  // Test message
  socket.on('echo', function(data) {
    console.log(data);
  });

  socket.on('count', function(data) {
    console.log(data);
  });
});

