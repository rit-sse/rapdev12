// XXX TESTING!!!

$(document).ready(function() {
  var socket = io.connect('http://localhost');

  socket.on('connected', function(data) {
    socket.emit('request-message'); // provoke message
  });

  socket.on('request-message', function(data) {
    alert(data);
  });
});
