var world_lib = require('../world/world')
  , world
  , comm
  , running = true;
var Delta = require('../sim/Delta').Delta;

exports.use_comm = function(c) {
  comm = c;
}

exports.client_hooks = {
  'get_map':function(){
    return(world);
  }
}

exports.updates = {};


exports.startSim = function(creature_file, creature_count) {
	world = new world_lib.World(world_lib.worldjson);
	exports.world = world;
	if(creature_file){
		var creature = require(creature_file);
    	console.log( creature );
    	for(var i = 0; i < creature_count; i++){
			world.addCreature(creature.monster);
		}
	}

	var turn = 0;
	var a_turn = function(){	
		turn++;
		console.log("INFO - Taking Turn: " + turn);

		var creatures = world.getActiveCreatures();
		for(var i = 0; i < creatures.length; i++){
			creatures[i].act();
		}
		if(running){
			setTimeout(a_turn, 2000);
		}
	}

	setTimeout(0,a_turn());

}
