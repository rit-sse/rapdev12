var world = require('./world');
var creature = require('./creature_class');

var my_world = new world.World();
var my_creature = new creature.CreatureClass();
my_world.addCreature(my_creature);

console.log(my_world.to_string())