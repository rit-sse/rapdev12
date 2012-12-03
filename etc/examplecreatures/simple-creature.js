exports.monster = function(creature, Direction){ // TEMPLATE

    /* Set up your very own simple creature! */
    var SimpleCreature = function SimpleCreature(){};   

    /* Simple Creature needs to inherit from the creature class */
    SimpleCreature.prototype = creature;

    creature.name = "My Awesome Name";
    creature.offense = 100;
    creature.defence = 100;
    creature.speed = 100;

    /* Very own creature logic! */
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

    /* We need to return the creature we created so that we can have our own instances */
    return SimpleCreature;
} // TEMPLATE