var _unused = function(data) {
  return(data);
}

exports.msg = "hi";

var globals = {};

exports.push_all_updates = function() {
  for (var name in globals.updates) {
    var result = globals.updates[name]()

    globals.socket.emit(name, result);
  }
}

exports.push_update = function(name) {
  // for (var k in globals.updates) {
  //   if (name == k) {
  //     var result = globals.updates[name]()

  //     globals.socket.emit(name, result);
  //   }
  // }
  //
  globals.io.sockets.emit('push_diff', {1: 2});
}

exports.start = function(io, simulation) {
  globals.io = io;

  io.sockets.on('connection', function (socket) {
    socket.emit('connected'); // Handshake with client

    // Register client hooks
    for (var name in simulation.client_hooks) {
      socket.on(name, function(data) {
        var result = simulation.client_hooks[name](data);

        socket.emit(name, result);
      });
    }

    // Register update hooks
    globals.updates = simulation.updates;

    // Save socket
    globals.socket = socket;
  });
}
