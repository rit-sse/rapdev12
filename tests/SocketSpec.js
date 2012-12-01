var sys;
var websocket;

beforeEach(function() {
  sys = require('sys');
  websocket = require('websocket').WebSocket;
});

describe('socket suite', function() {
  var server;

  beforeEach(function() {
    // set up app.js

    // make stuff
    server = new websocket('ws://localhost', 'connected');
  });

  it('should derp', function() {
    server.onmessage = function(data) {
      expect(data).toNotBe(null);
    };

    server.send('derp', 'derp');
  });
});
