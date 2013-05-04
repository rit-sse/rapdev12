var fs = require('fs');

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
        console.log("IT is doing something")
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

    // Register client hooks
    for (var name in simulation.client_hooks) {
      socket.on(name, function(data) {
        var result = simulation.client_hooks[name](data);
        socket.emit(name, result);
      });
    }

    // Get assets through web sockets
    /*
        socket.emit('request_animation', {fileName:'assets/images/creatures/walk-1.txt'});
        socket.on('get_animation', function(data){
          var animation = data.contents;
        });
    */

    socket.on('request_animation', function(data){
      console.log("Sending "+data.fileName+" to client");
      fs.readFile('./public/'+data.fileName, 'utf8', function(err, buff){
        if(err){
          console.log(err);
        } else {
          console.log('\n'+data.fileName+'\n'+buff+'\n\n');
          socket.emit('get_animation', {fileName:data.fileName, contents:buff});
        }
      });
    });

    // Register update hooks
    simulation.updates.push_diff = function(){ return; }
    globals.updates = simulation.updates;

    // Save socket
    var id = socket.id;
    console.log(id + " connected");
    allSockets.push(socket);
  });
}
