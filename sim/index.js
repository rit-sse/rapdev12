var world_lib = require('../world/world');

var comm;
var running = true;

exports.use_comm = function(c) {
  comm = c;
}

exports.updates = {};

exports.startSim = function() {
	var world = new world_lib.World(world_lib.worldjson);
	var turn = 0;
	var a_turn = function(){
		console.log("turn");
		if(running){
			setTimeout(a_turn, 100);
		}
	}

	setTimeout(0,a_turn());

}
