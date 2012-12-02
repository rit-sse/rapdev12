var c = require('../../creature/creature');
var Direction = require('../../utils/simulation-utils').Direction;
var Creature = c.Creature;
var world = require('../../sim').world;

// END TEMPLATE CODE

var SimpleCreature = function SimpleCreature(){};
SimpleCreature.prototype = new Creature("my_name", 1, world, 100, 100, 100);

var next_dir = [
    Direction.SOUTH,
    Direction.EAST,
    Direction.NORTH,
    Direction.WEST,
    Direction.NORTHEAST,
    Direction.SOUTHWEST,
    Direction.SOUTHEAST,
    Direction.NORTHWEST
];
var direction = 0;


/*
This creature moves in each of the eight cardinal directions and nothing else.
 */
SimpleCreature.prototype.act = function() {
	console.log("Now moving \"" + this.getName() + "\"");

    this.move(next_dir[direction]);
    direction = ( direction + 1 ) % next_dir.length;
    this.attack(Direction.NORTH);
};

exports.monster = SimpleCreature;