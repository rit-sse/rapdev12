var _unused = function(data) {
  return(data);
}

var globals = {};
var allSockets = [];

exports.push_all_updates = function() {
  for (var name in globals.updates) {
    for (var s in allSockets){
      var result = globals.updates[name]()
      allSockets[s].emit(name, result);
    }
  }
}

exports.push_update = function(name) {
  for (var k in globals.updates) {
    if (name == k) {
      for (var s in allSockets){
        var result = globals.updates[name]()
        allSockets[s].emit(name, result);
      }
    }
  }
}

exports.push_diff = function(diff){
  for (var k in globals.updates) {
    if ('push_diff' == k) {
      for (var s in allSockets){
        allSockets[s].emit('push_diff', diff);
      }
    }
  }
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
    simulation.updates.push_diff = function(){ return; }
    globals.updates = simulation.updates;

    // Save socket
    var id = socket.id;
    console.log(id + " connected");
    allSockets.push(socket);

  });
}
