exports.client_hooks = {
  'derp': function(data) {
    return(data);
  }
}

var count = 0;
exports.updates = {
  'echo': function() {
    console.log('ping');
  },

  'count': function() {
    return(count++);
  }
}

var comm;
exports.use_comm = function(c) {
  comm = c;
}

setInterval(function() {
  comm.push_diff({name:"Michael", data:{x:149,y:67}});
  comm.push_all_updates();
}, 2000);

