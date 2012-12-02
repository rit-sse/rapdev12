var c = require(require('path').join(require('path').dirname(require.main.filename), "creature", "creature"));
var Direction = require(require('path').join(require('path').dirname(require.main.filename), "utils", "simulation-utils")).Direction;
var Creature = c.Creature;
var world = require(require('path').join(require('path').dirname(require.main.filename), "sim")).world;


var monster = new Creature("my_name", 1, world, 100, 100, 100);
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
monster.act = function() {
	console.log("Now moving \"" + monster.getName() + "\"");

    this.move(next_dir[direction]);
    direction = ( direction + 1 ) % next_dir.length;
};


console.log( "Monster: " + monster );
exports.monster = monster;