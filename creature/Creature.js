 //The Creature API

/*
Initiates the creatures health, energy, attack, defence, speed.
*/
function Creature(name, classId, world,attack,defence,speed){
	this.world = world;
	this.health = 100;
	this.energy = 100;
	this.attack = attack;
	this.defence = defence;
	this.speed = speed;
    this.classId = classId;
    this.name = name;
    this.minHitDamage = 1;
};

/*
Moves the creature in the given direction, calls onCollision it hits collision.
*/
Creature.prototype.move = function(direction){
	if(this.energy > 0 && this.health > 0 && this.timeLeftToSleep == 0){
        this.energy-=1;
        this.world.moveCreature(this.id,direction);
    }
    this.energyRemaining();
};

/*
Moves the creature in the given direction two tiles. If there is a collision on the first step onCollision will be called an the second step will not be taken.
*/
Creature.prototype.sprint = function(direction){
	if(this.energy >= 5 && this.health > 0  && this.timeLeftToSleep == 0){
        this.energy -= 5;
	    if(this.world.moveCreature(this.id,direction)){
		    this.world.moveCreature(this.id,direction);
	    }
    }
    this.energyRemaining();
};

/*
Attacks the given direction. If a creature is there the hit creature will be given a onHit event.
*/
Creature.prototype.attack = function(direction){
    if(this.energy >= 5 && this.health > 0  && this.timeLeftToSleep == 0){
        this.energy-=5;
        //TODO needs to actually attack
    }
    this.energyRemaining();
};

/*
Will return the player a mini grid representing a 2 radi around the creature. The mini grid will have methods to find the location of all the creatures and objects in the area.
*/
Creature.prototype.lookAround = function(){
    if(this.health > 0  && this.timeLeftToSleep == 0){

    }
    //TODO implement a function in world that creates a minimap and returns it.
};

/*
Sets how long the creature will sleep for. Note: The creature can wake up early if attacked or hungry.
*/
Creature.prototype.sleepFor = function(time){
    if(this.health > 0 &&this.timeLeftToSleep == 0){
        this.timeLeftToSleep = time;
    }
};

/*
Wakes the creature up from sleep and calls the onWakeUp event
*/
Creature.prototype.wakeUp = function(reason){
    this.timeLeftToSleep = 0;
    this.onWakeUp(reason);
};
/*
Main method that will be called that the maker of the creature will implement.
*/
Creature.prototype.act = function(){
};

/*
A User defined method of what there creature should do when they collide with an impassable object. The user will be given an identification of what the object is. If the object is another creature it will be the id of the creature. If it is a rock, water or the grid boarder then they will be given a string with its name. On collision is the only event that can be called any number of times.
*/
Creature.prototype.onCollision = function(object){
};

/*
A User defined method of what you creature will do when they get hit by another creature. They will also be given the direction that they need to attack for them to attack the creature. 
*/
Creature.prototype.onHit = function(direction){
};

/*
A user defined method that defines what a user's creature should do on wakeup. They are also given a reason. If the reason is attacked onHit will be called as a second event after onWakeUp.
*/
Creature.prototype.onWakeUp = function(reason){
};

/*
A user defined method that will let the user let out one last scream before they die.
*/
Creature.prototype.onDeath = function(){
};

/*
An API defined event that counts down to when your creature sould wake up or wakes you up if your creature gets hungry.
*/
Creature.prototype.onSleepTurn = function(){
    if (this.timeLeftToSleep > 0) {
        this.timeLeftToSleep--;
    } else {
        this.wakeUp('time');
    }
};

/*
Will make your creature pass out for the rest of the turn.
*/
Creature.prototype.onNoEnergy = function(){
	this.passedOut = true;
    this.timeLeftToSleep = 1;
};

/*
Allows the board to set the creatures id
*/
Creature.prototype.setId = function(id){
	this.id = id;
};

/*
Returns the given creatures id
*/
Creature.prototype.getId = function(){
	return this.id;
};

 Creature.prototype.energyRemaining = function(){
     if(this.energy <= 0){
         this.onNoEnergy();
     }
 }

/*
Removes the given amount of health from the creature and calls the onHit event
*/
Creature.prototype.hit = function(damage,direction){
    var damageTaken = damage - this.defence;
    if(damage>0){
        this.health -= damage;
    }else{
        this.health -= this.minHitDamage;
    }
    if(this.timeLeftToSleep > 0){
        this.wakeUp('hit');
    }
    if(this.health <= 0){
        this.onDeath();
    }else{
        this.onHit(direction)
    }
};

/*
Adds the given amount of health to the given creature.
*/
Creature.prototype.heal = function(healAmount){
	if(this.health > 0){
        this.health+=healAmount;
    }
};

/*
Returns the creature's name.
*/
Creature.prototype.getName = function() {
    return this.name;
}

exports.Creature = Creature;
