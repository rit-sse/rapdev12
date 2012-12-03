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
    "constructor": creatureClass,
  };
  nextClassId++;
}

exports.startSim = function(creature_file, creature_count) {
	world = new world_lib.World(world_lib.worldjson);
	exports.world = world;
	if(creature_file){
		var creature_class_instance = new Creature(world);
		var creature = require(creature_file).monster(creature_class_instance , Direction);

    exports.addCreatureClass(creature);

    for(var i = 0; i < creature_count; i++){
      world.addCreature(new creature());
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
