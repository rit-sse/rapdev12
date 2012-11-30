console.log("communication module loaded.");

exports.start = function(io) {
  io.sockets.on('connection', function (socket) {

    socket.emit('connected');

    socket.on('request-message', function() {
      socket.emit('request-message', 'hi dude');
    });
  });
}
