var _unused = function(data) {
  return(data);
}

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
  var result = globals.updates[name]()
  globals.socket.emit(name, result);
}

exports.push_diff = function(diff){
  globals.socket.emit('push_diff', diff);
}

exports.start = function(io, simulation) {
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
    simulation.updates.push_diff = function(){ return; };
    globals.updates = simulation.updates;

    // Save socket
    globals.socket = socket;
  });
}
