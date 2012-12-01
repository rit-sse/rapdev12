var socket;

$(document).ready(function() {
  socket = io.connect('http://localhost:3000');

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

  socket.on('push_diff', function(data){
    console.log(data);
  });
});

