var _unused = function(data) {
  return(data);
}

var globals = {};
var allSockets = [];

exports.push_all_updates = function() {
  for (var name = 0; name < globals.updates.size; name++) {
    for (var s = 0; s < allSockets.size; s++){
      var result = globals.updates[name]()
      allSockets[s].emit(name, result);
    }
  }
}

exports.push_update = function(name) {
  for (var k in globals.updates) {
    if (name == k) {
      for (var s = 0; s < allSockets.size; s++){
        var result = globals.updates[name]()
        allSockets[s].emit(name, result);
      }
    }
  }
}

exports.push_diff = function(diff){
  for (var k in globals.updates) {
    if ('push_diff' == k) {
      for (var s =0; s < allSockets.size; s++){
        allSockets[s].emit('push_diff', diff);
      }
    }
  }
}

exports.start = function(io, simulation) {
  io.sockets.on('connection', function (socket) {
    socket.emit('connected', {
      map: [
          [ "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass" ],
          [ "grass", "grass", "rock", "grass", "grass", "grass", "grass", "rock", "grass", "grass" ],
          [ "grass", "grass", "rock", "grass", "grass", "grass", "grass", "rock", "grass", "grass" ],
          [ "grass", "grass", "rock", "grass", "grass", "grass", "grass", "rock", "grass", "grass" ],
          [ "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass" ],
          [ "grass", "water", "grass", "grass", "grass", "grass", "grass", "grass", "water", "grass" ],
          [ "grass", "grass", "water", "grass", "grass", "grass", "grass", "water", "grass", "grass" ],
          [ "grass", "grass", "grass", "sand", "sand", "sand", "sand", "grass", "grass", "grass" ],
          [ "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass" ],
          [ "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass" ]
      ],
      creatureClasses: [
        {
          id: 1,
          name: "Redshirt",
          speed: 2,
          strength: 1,
          assets: {
            color: "red",
          }
        },
        {
          id: 2,
          name: "Officer",
          speed: 10,
          strength: 10,
          assets: {
            color: "gold",
          }
        }
      ],
      creatures: [
        {
          id: 1,
          class: 2,
          name: "Kirk",
          x: 5,
          y: 5
        },
        {
          id: 2,
          class: 1,
          name: "Bob",
          x: 2,
          y: 2
        },
        {
          id: 3,
          class: 1,
          name: "Joe",
          x: 7,
          y: 2
        }
      ]
    }); // Handshake with client

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
