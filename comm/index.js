var _unused = function(data) {
  return(data);
}

var globals = {};
var allSockets = [];

exports.push_all_updates = function() {
  for (var name = 0; name < globals.updates.size; name++) {
    for (int s = 0; s < allSockets.size; s++){
      var result = globals.updates[name]()
      allSockets[s].emit(name, result);
    }
  }
}

exports.push_update = function(name) {
  for (var k = 0; k < globals.updates; k++) {
    if (name == k) {
      for (int s = 0; s < allSockets.size; s++){
        var result = globals.updates[name]()
        allSockets[s].emit(name, result);
      }
    }
  }
}

exports.push_diff = function(diff){
  for (var k = 0; k < globals.updates.size; k++) {
    if ('push_diff' == k) {
      for (int s =0; s < allSockets.size; s++){
        allSockets[s].emit('push_diff', diff);
      }
    }
  }
}

exports.start = function(io, simulation) {
  io.sockets.on('connection', function (socket) {
    socket.emit('connected'); // Handshake with client

    // Register client hooks
    for (int name = 0; name < simulation.client_hooks.size; name++) {
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
