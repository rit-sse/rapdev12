var _unused = function(data) {
  return(data);
}

var globals = {};
var allSockets = [];

exports.push_all_updates = function() {
  for (var name = 0; name < globals.updates.length; name++) {
    for (var s = 0; s < allSockets.length; s++){
      var result = globals.updates[name]()
      allSockets[s].emit(name, result);
    }
  }
}

exports.push_update = function(name) {
  for (var k in globals.updates) {
    if (name == k) {
      for (var s = 0; s < allSockets.length; s++){
        var result = globals.updates[name]()
        allSockets[s].emit(name, result);
      }
    }
  }
}

exports.push_diff = function(diff){
  for (var k in globals.updates) {
    if ('push_diff' == k) {
      for (var s = 0; s < allSockets.length; s++){
        //console.log(allSockets[s]);
        allSockets[s].emit('push_diff', diff);
      }
    }
  }
}

exports.start = function(io, simulation) {
  io.sockets.on('connection', function (socket) {
    socket.emit('connected');
    console.log("sending world");
    socket.emit('get_map', simulation.world.toClientDump());
    console.log("for")
    // Register client hooks
    for (var name in simulation.client_hooks) {
      socket.on(name, function(data) {
        var result = simulation.client_hooks[name](data);
        socket.emit(name, result);
      });
    }
    console.log("updates")
    // Register update hooks
    simulation.updates.push_diff = function(){ return; }
    globals.updates = simulation.updates;
    console.log("save")
    // Save socket
    var id = socket.id;
    console.log(id + " connected");
    allSockets.push(socket);
  });
}
