var c = require(require('path').join(require('path').dirname(require.main.filename), "creature", "creature"));
var Direction = require(require('path').join(require('path').dirname(require.main.filename), "utils", "simulation-utils")).Direction;
var Creature = c.Creature;


var monster = new Creature(null, 100, 100, 100);

monster.act = function() {
	console.log("RAWR");
    this.move(Direction.NORTH);
};



exports.monster = monster;