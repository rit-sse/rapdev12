 //The Creature API

/*
Initiates the creatures health, energy, attack, defence, speed.
*/
function Creature(world){
	this.world = world;
	this.health = 100;
	this.energy = 100;
	this.offence = 10;
	this.defence = 10;
	this.speed = 10;
  this.classId = 1;
  this.name = "Creature";
};

/*
Moves the creature in the given direction, calls onCollision it hits collision.
*/
Creature.prototype.move = function(direction){
	this.world.moveCreature(this.id,direction);
};

/*
Moves the creature in the given direction two tiles. If there is a collision on the first step onCollision will be called an the second step will not be taken.
*/
Creature.prototype.sprint = function(direction){
	this.energy -= 5;
	if(this.world.moveCreature(this.id,direction)){
		this.world.moveCreature(this.id,direction);
	}
};

/*
Attacks the given direction. If a creature is there the hit creature will be given a onHit event.
*/
Creature.prototype.attack = function(direction){
    this.world.attackCreature(this.id, direction);
};

/*
Will return the player a mini grid representing a 2 radi around the creature. The mini grid will have methods to find the location of all the creatures and objects in the area.
*/
Creature.prototype.lookAround = function(){
};

/*
Sets how long the creature will sleep for. Note: The creature can wake up eary if attacked or hungry. 
*/
Creature.prototype.sleepFor = function(time){
	this.timeLeftToSleep = time;
};

/*
Returns the amount of time left for the creature to sleep
*/
Creature.prototype.getTimeToSleep = function(){
	return this.timeLeftToSleep;
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
  console.log( this.name + ".onCollision called." );
};

/*
A User defined method of what you creature will do when they get hit by another creature. They will also be given the direction that they need to attack for them to attack the creature. 
*/
Creature.prototype.onHit = function(direction){
  console.log( this.name + ".onHit called." );
};

/*
A user defined method that defines what a user's creature should do on wakeup. They are also given a reason. If the reason is attacked onHit will be called as a second event after onWakeUp.
*/
Creature.prototype.onWakeUp = function(reason){
  console.log( this.name + ".onWakeUp called." );
};

/*
A user defined method that will let the user let out one last scream before they die.
*/
Creature.prototype.onDeath = function(){
  console.log( this.name + ".onDeath called." );
	return 'You Died';
};

/*
An API defined event that counts down to when your creature sould wake up or wakes you up if your creature gets hungry.
*/
Creature.prototype.onSleepTurn = function(){
  console.log( this.name + ".onSleepTurn called." );
  if (this.timeLeftToSleep > 0) {
      this.timeLeftToSleep -= 1;
  } else {
      this.act();
  }
};

/*
Will make your creature pass out for the rest of the turn.
*/
Creature.prototype.onNoEnergy = function(){
  console.log( this.name + ".onNoEnergy called." );
	this.passedOut = true;
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

/*
Removes the given amount of health from the creature.
*/
Creature.prototype.removeHealth = function(damage){
	this.health-=damage;
};

/*
Adds the given amount of health to the given creature.
*/
Creature.prototype.heal = function(healAmount){
	this.health+=healAmount
};

/*
Returns the creature's name.
*/
Creature.prototype.getName = function() {
    return this.name;
}

Creature.prototype.toString = function() {
    return "to String";
}

exports.Creature = Creature;
