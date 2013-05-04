var path = require('path')
var world_lib = require('../world/world')
  , world
  , comm
  , running = true;
var c = require(path.join(path.dirname(require.main.filename), "creature", "Creature"));
var Direction = require(path.join(path.dirname(require.main.filename), "utils", "simulation-utils")).Direction;
var Creature = c.Creature;

exports.use_comm = function(c) {
  comm = c;
}

var fs = require('fs');

/**
 * Writes the Creatures program to the uploads directory
 *
 * @param name
 * @param data
 */
function writeCreatureJS(name,data) {
    fs.writeFile("./uploads/"+name, data, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log(name+" was written to disc.");
        }
    }); 
}

exports.client_hooks = {
  'get_map':function(){
    return(world);
  },
  'file_upload':function(data){
    writeCreatureJS(data.name,data.contents)
    return "File write attempted";
  },
  'add_creature':function(data){
    var creature = new exports.world.creatureClasses[data.classId].constructor;
    creature.classId = data.classId;
    var tile = exports.world.getTile(data.y, data.x);
    exports.world.addCreature(creature, tile);
  }
}

exports.updates = {};

var nextClassId = 1;

exports.addCreatureClass = function(creatureClass) {
  exports.world.creatureClasses[nextClassId] = {
    "id": nextClassId,
    "name": creatureClass.name,
    "speed": creatureClass.speed,
    "attack": creatureClass.attack,
    "constructor": creatureClass
  };
  nextClassId++;
}


/**
 * Starts the program by creating all of the creatures
 * @param creature_file
 * @param creature_count
 * @param world_file
 */
exports.startSim = function(creature_file, creature_count, world_file) {
	world = new world_lib.World(world_file);
	exports.world = world;

    var creature = creature_file[0];
    var index = 0;
    while(creature){
	    console.log("??? " + creature);
		console.log("BITCHES: " + require(creature));
		var creature_class_instance = new Creature(world);
        console.log("lo "+creature)
		var creature = require(creature).monster(creature_class_instance , Direction);
    	console.log( creature );
    	for(var i = 0; i < creature_count; i++){
		    world.addCreature(new creature());
		}
        index += 1;
        creature = creature_file[index];
    }

	var turn = 0;
	var a_turn = function(){	
		turn++;
		console.log("INFO - Taking Turn: " + turn);

		var creatures = world.getActiveCreatures();
		for(var i = 0; i < creatures.length; i++){
			creatures[i].eventChooser();
		}
		if(running){
			setTimeout(a_turn, 2000);
		}
	}

	setTimeout(0,a_turn());


}
