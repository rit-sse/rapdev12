var sys;
var websocket;
var comm;

beforeEach(function() {
  sys = require('sys');
  app = require('../../.');
});

describe('socket suite', function() {
  beforeEach(function() {
    // set up app.js

    // make stuff
    // server = new websocket('ws://localhost', 'connected');
  });

  it('should derp', function() {
    app.io.sockets.emit('derp', 'asdf');

    expect(app).toNotBe(null);

    app.io.sockets.on('connect', function(socket) {
      console.log(socket);
      socket.emit('connected'); // Handshake with client

      socket.on('derp', function(data) {
        console.log(data);
        asyncSpecDone();
      });

      socket.emit('derp', 'asdf');
    });


    asyncSpecWait();
  });
});
