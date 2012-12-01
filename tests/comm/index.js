// Client Hooks, functions that execute on the server and are triggered by the client
exports.client_hooks = {
  'derp': function(data) {
    return(data);
  }
}
// functions that the server uses to send data to the clients
exports.updates = {
  'echo': function() {
    console.log('ping');
  }
}

// Create the Socket Communication variable comm.
var comm;
exports.use_comm = function(c) {
  comm = c;
}

setInterval(function() {
  comm.push_diff({name:"Michael", data:{rand:Math.random()}});
  comm.push_update('echo');
  comm.push_all_updates();
}, 2000);