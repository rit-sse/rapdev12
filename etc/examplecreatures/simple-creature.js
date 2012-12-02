
exports.monster = function(Creature,Direction,world) { //TODO: Merge Direction and world objects

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

    }
    
    return monster;
};

