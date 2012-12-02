var c = require(require('path').join(require('path').dirname(require.main.filename), "creature", "creature"));
var Direction = require(require('path').join(require('path').dirname(require.main.filename), "utils", "simulation-utils")).Direction;
var Creature = c.Creature;
var world = require(require('path').join(require('path').dirname(require.main.filename), "sim")).world;


var monster = new Creature("my_name", 1, world, 100, 100, 100);

monster.act = function() {
	console.log("RAWR");
    this.move(Direction.NORTH);
};


console.log( "Monster: " + monster );
exports.monster = monster;