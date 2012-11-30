var use = function(socket, name, callback) {
  socket.on(name, function(data) {
    var result = callback(data);

    socket.emit(name, result);
  });
}

var join = function(data) {

}

var base_world = function(data) {

}

var creature_list = function(data) {

}

var _unused = function(data) {
  return(data);
}

exports.start = function(io) {
  io.sockets.on('connection', function (socket) {
    socket.emit('connected'); // Handshake with client

    use(socket, 'join', join);
    use(socket, 'base-world', base_world);
    use(socket, 'creature-list', creature_list);

    use(socket, 'request-message', _unused);
  });
}
