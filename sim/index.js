var world_lib = require('../world/world')
  , world
  , comm
  , running = true;

exports.use_comm = function(c) {
  comm = c;
}

exports.client_hooks = {
  'get_map':function(){
    return(world);
  }
}

exports.updates = {};

exports.startSim = function() {
	world = new world_lib.World(world_lib.worldjson);
	var turn = 0;
	var a_turn = function(){	
		turn++;
		console.log("INFO - Taking Turn: " + turn);
		var creatures = world.getActiveCreatures();
		for(var i = 0; i < creatures.size; i++){
			creatures[i].act()		
		}
		if(running){
			setTimeout(a_turn, 2000);
		}
	}

	setTimeout(0,a_turn());

}
