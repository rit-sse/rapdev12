exports.monster = function(creature, Direction){ // TEMPLATE

    /* Set up your very own simple creature! */
    var SimpleCreature = function SimpleCreature(){
        this.cDir = 0;
    };   

    /* Simple Creature needs to inherit from the creature class */
    SimpleCreature.prototype = creature;

    creature.name = "Captain Forward";
    creature.offense = 100;
    creature.defence = 100;
    creature.speed = 100;
    
    var next_dir = [
        Direction.SOUTH,
        Direction.NORTH,
    ];
    
    var dodge_dir = [
        Direction.EAST,
        Direction.WEST,
    ];
    
    /*
    This creature moves in each of the eight cardinal directions and nothing else.
     */
    SimpleCreature.prototype.act = function() {
        console.log("Now moving \"" + this.getName() + "\"");
        
        this.move(next_dir[this.cDir]);
        this.attack(next_dir[this.cDir]);
    };
    
    SimpleCreature.prototype.onCollision = function() {
        this.cDir = (this.cDir + 1)%2;
    };
    
    SimpleCreature.prototype.onHit = function() {
        console.log("I've been hit!");
        //this.move([Direction.EAST, Direction.WEST][this.cDir]); //BAD IDEAS
        this.move(dodge_dir[this.cDir]);
    }
    

    /* We need to return the creature we created so that we can have our own instances */
    return SimpleCreature;
} // TEMPLATE