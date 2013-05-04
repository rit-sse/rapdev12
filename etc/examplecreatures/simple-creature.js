exports.monster = function(creature, Direction){ // TEMPLATE

    /* Set up your very own simple creature! */
    var SimpleCreature = function SimpleCreature(){
        this.direction = 0;
        this.name = "My Awesome Name";
        this.offense = 100;
        this.defence = 100;
        this.speed = 452;
    };

    /* Simple Creature needs to inherit from the creature class */
    SimpleCreature.prototype = creature;

    /* Very own creature logic! */
    var next_dir = [
        Direction.SOUTH,
        Direction.EAST,
        Direction.NORTH,
        Direction.WEST,

    ];

    /*
    This creature moves in each of the eight cardinal directions.
     */
    SimpleCreature.prototype.act = function()
    {
        console.log("Now moving \"" + this.getName() + "\"");

        this.move(next_dir[this.direction]);
        this.direction = ( this.direction + 1 ) % next_dir.length;
        //this.attack(Direction.NORTH);
        this.lookAround();
    };

    /* We need to return the creature we created so that we can have our own instances */
    return SimpleCreature;
} // TEMPLATE