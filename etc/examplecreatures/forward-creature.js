exports.monster = function(creature, Direction){ // TEMPLATE

    /* Set up your very own simple creature! */
    var SimpleCreature = function SimpleCreature(){
        this.cDir = 0;
    };   

    /* Simple Creature needs to inherit from the creature class */
    SimpleCreature.prototype = creature;

    creature.name = "Captain Forward";
    creature.offense = 100;
    creature.defence = 50;
    creature.speed = 100;
    var attackDir = 0;

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
        if(attackDir < 2){
            this.attack(next_dir[attackDir])
        }else{
            this.attack(dodge_dir[attackDir-2]);
        }

        attackDir = (attackDir + 1) % 4;
    };
    
    SimpleCreature.prototype.onCollision = function() {
        this.cDir = (this.cDir + 1)%2;
    };
    
    SimpleCreature.prototype.onHit = function() {
        console.log("I've been hit! My hp is " + this.getHealth());
        //this.move([Direction.EAST, Direction.WEST][this.cDir]); //BAD IDEAS
        //this.move(dodge_dir[this.cDir]);
    }
    

    /* We need to return the creature we created so that we can have our own instances */
    return SimpleCreature;
} // TEMPLATE